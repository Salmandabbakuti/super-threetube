"use client";
import { useState, useEffect } from "react";
import {
  message,
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Skeleton,
  Divider
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { subgraphClient as client, GET_VIDEOS_QUERY } from "@/app/utils";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import VideoCard from "@/app/components/VideoCard"; // Assuming VideoCard is already created and exported from the specified path

const { Title, Text, Paragraph } = Typography;
dayjs.extend(relativeTime);

export default function VideoPage({ params: { id } }) {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);

  const fetchVideo = async () => {
    setLoading(true);
    client
      .request(GET_VIDEOS_QUERY, {
        first: 1,
        skip: 0,
        where: { id }
      })
      .then((data) => {
        setVideo(data?.videos[0]);
        // duplicate first 1 video to 5 videos to simulate related videos
        data.videos = Array.from({ length: 5 }).map(() => data.videos[0]);
        setRelatedVideos(data?.videos);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch video. Please try again.");
        setLoading(false);
      });
  };

  const fetchRelatedVideos = async (idToExclude) => {
    setLoading(true);
    client
      .request(GET_VIDEOS_QUERY, {
        first: 5,
        skip: 0,
        orderBy: "createdAt",
        orderDirection: "desc",
        where: {
          id_not: idToExclude
        }
      })
      .then((data) => {
        setRelatedVideos(data?.videos);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch related videos. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideo();
    fetchRelatedVideos(id);
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Plyr
            style={{ borderRadius: "20px" }}
            autoPlay
            controls
            source={{
              type: "video",
              sources: [
                {
                  src: `https://ipfs.io/ipfs/${video?.videoHash}`,
                  type: "video/mp4"
                }
              ]
            }}
          />
          <Title level={2}>{video?.title}</Title>
          <Paragraph level={3} type="primary">
            {video?.category +
              " • " +
              new Date(video?.createdAt * 1000).toLocaleString("en-IN") +
              " • " +
              video?.location}
          </Paragraph>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px"
            }}
          >
            <Avatar
              size="large"
              src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${video?.channel?.id}`}
            />
            <div style={{ marginLeft: "10px" }}>
              <Text>{video?.channel?.id}</Text>
              <br />
              <Text type="secondary">
                {dayjs(video?.createdAt * 1000).fromNow()}
              </Text>
            </div>
          </div>
          <Text>{video?.description}</Text>
          <Divider plain />
        </Col>
        <Col xs={24} md={8}>
          <Title level={4}>Related Videos</Title>
          {relatedVideos.map((relatedVideo) => (
            <VideoCard key={relatedVideo.id} video={relatedVideo} />
          ))}
        </Col>
      </Row>
    </div>
  );
}

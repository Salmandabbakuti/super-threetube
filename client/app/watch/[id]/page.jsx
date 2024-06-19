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
  Divider,
  Popconfirm,
  Button,
  Input,
  Empty,
  List
} from "antd";
import { HeartTwoTone, CheckCircleTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import { useSigner } from "@thirdweb-dev/react";
import { parseEther } from "@ethersproject/units";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { subqueryClient as client, GET_VIDEOS_QUERY } from "@/app/utils";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import RelatedVideoCard from "@/app/components/RelatedVideoCard";
import { contract } from "@/app/utils";

const { Title, Text, Paragraph } = Typography;
dayjs.extend(relativeTime);

export default function VideoPage({ params: { id } }) {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);
  const [tipAmountInput, setTipAmountInput] = useState(null);

  const signer = useSigner();

  const fetchVideo = async () => {
    setLoading(true);
    client
      .request(GET_VIDEOS_QUERY, {
        first: 1,
        offset: 0,
        filter: {
          id: {
            equalTo: id
          }
        }
      })
      .then((data) => {
        setVideo(data?.videos?.nodes[0] || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch video:", err);
        message.error("Failed to fetch video. Please try again.");
        setLoading(false);
      });
  };

  const fetchRelatedVideos = async (idToExclude) => {
    setLoading(true);
    client
      .request(GET_VIDEOS_QUERY, {
        first: 5,
        offset: 0,
        orderBy: "CREATED_AT_DESC",
        filter: {
          id: {
            notEqualTo: idToExclude
          }
        }
      })
      .then((data) => {
        setRelatedVideos(data?.videos?.nodes || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch related videos:", err);
        message.error("Failed to fetch related videos. Please try again.");
        setLoading(false);
      });
  };

  const handleTipVideo = async () => {
    console.log("tipAmountInput", tipAmountInput);
    if (!signer) return message.error("Please connect your wallet first");
    if (!tipAmountInput) return message.error("Please enter tip amount");
    try {
      console.log("tipAmountInput", tipAmountInput);
      const tipAmountinWei = parseEther(tipAmountInput);
      console.log("tipAmountinWei", tipAmountinWei);
      const tx = await contract.connect(signer).tipVideo(id, tipAmountinWei, {
        value: tipAmountinWei
      });
      await tx.wait();
      message.success("Thank you for supporting the creator!");
    } catch (error) {
      console.error(error);
      message.error("Failed to tip video. Please try again.");
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchRelatedVideos(id);
  }, [id]);

  if (!loading && !video?.videoHash) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Empty description="Video not found" />
      </div>
    );
  }
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          {loading ? (
            <Card
              loading
              style={{ borderRadius: "20px" }}
              cover={
                <div
                  style={{
                    height: 400,
                    borderRadius: 20
                  }}
                />
              }
            />
          ) : (
            <>
              <Plyr
                style={{ borderRadius: "20px" }}
                autoPlay
                options={{
                  autoplay: true
                }}
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
              <Title level={4}>{video?.title}</Title>
              <Paragraph level={3} type="primary">
                {new Date(video?.createdAt * 1000).toLocaleString("en-IN") +
                  " • " +
                  video?.category +
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
                  <Text>{video?.channel?.id}</Text>{" "}
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                  <br />
                  <Text type="secondary">
                    {dayjs(video?.createdAt * 1000).fromNow()}
                  </Text>
                  <Popconfirm
                    title={
                      <>
                        <label>Tip Amount</label>
                        <Input
                          type="number"
                          size="large"
                          addonAfter="ETH"
                          value={tipAmountInput}
                          placeholder="Enter tip amount"
                          onChange={(e) => setTipAmountInput(e.target.value)}
                        />
                        <p>*100% of the tip goes to the video owner.</p>
                      </>
                    }
                    onConfirm={handleTipVideo}
                  >
                    <Button
                      icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                      style={{ marginTop: "10px", marginLeft: "10px" }}
                      type="primary"
                      shape="round"
                      size="small"
                    >
                      Support
                    </Button>
                  </Popconfirm>
                </div>
              </div>
              <Text>{video?.description}</Text>
            </>
          )}
          <Divider plain />
        </Col>
        <Col xs={24} md={8}>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                loading
                style={{ borderRadius: 20 }}
                cover={
                  <div
                    style={{
                      height: 150,
                      borderRadius: 20
                    }}
                  />
                }
              >
                <Card.Meta avatar={<Skeleton.Avatar />} />
              </Card>
            ))
          ) : (
            <List
              header={<Title level={5}>Related Videos</Title>}
              itemLayout="vertical"
              loading={loading}
              size="small"
              dataSource={relatedVideos}
              renderItem={(video) => (
                <List.Item>
                  <RelatedVideoCard video={video} />
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

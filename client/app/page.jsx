"use client";
import { useState, useEffect } from "react";
import { message, Row, Col, Card, Avatar } from "antd";
import styles from "./page.module.css";
import { subgraphClient as client, GET_VIDEOS_QUERY } from "./utils";
import VideoCard from "./components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleSearchInput, setTitleSearchInput] = useState("");
  const [categorySearchInput, setCategorySearchInput] = useState("");

  const fetchVideos = async () => {
    setLoading(true);
    client
      .request(GET_VIDEOS_QUERY, {
        first: 200,
        skip: 0,
        orderBy: "createdAt",
        orderDirection: "desc",
        where: {
          ...(titleSearchInput && { title_contains_nocase: titleSearchInput }),
          ...(categorySearchInput && {
            category_contains_nocase: categorySearchInput
          })
        }
      })
      .then((data) => {
        // duplicate first 1 video to 12 videos to simulate pagination
        data.videos = Array.from({ length: 2 }).map(() => data.videos[0]);
        setVideos(data.videos);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch videos. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, [titleSearchInput, categorySearchInput]);

  return (
    <>
      <Row gutter={[16, 16]} justify="center" className={styles.grid}>
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
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
                  <Card.Meta avatar={<Avatar />} />
                </Card>
              </Col>
            ))
          : videos.map((video) => (
              <Col key={video.id} xs={24} sm={12} md={8} lg={6}>
                <VideoCard video={video} />
              </Col>
            ))}
      </Row>
    </>
  );
}

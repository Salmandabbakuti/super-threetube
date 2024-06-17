"use client";
import { useState, useEffect } from "react";
import { message, Row, Col, Card, Empty } from "antd";
import Link from "next/link";
import { subqueryClient as client, GET_VIDEOS_QUERY } from "./utils";
import VideoCard from "./components/VideoCard";
import styles from "./page.module.css";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("grace");
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchVideos = async () => {
    setLoading(true);
    client
      .request(GET_VIDEOS_QUERY, {
        first: 200,
        offset: 0,
        orderBy: "CREATED_AT_DESC",
        ...(searchQuery && {
          filter: {
            or: {
              title: { likeInsensitive: searchQuery },
              description: {
                likeInsensitive: searchQuery
              },
              category: {
                likeInsensitive: searchQuery
              }
            }
          }
        })
      })
      .then((data) => {
        setVideos(data?.videos?.nodes || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch videos:", error);
        message.error("Failed to fetch videos. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, [searchQuery, categoryFilter]);

  return (
    <>
      <Row gutter={[16, 16]} justify="start" className={styles.grid}>
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
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
              />
            </Col>
          ))
        ) : videos.length === 0 ? (
          <Empty description="No videos found" />
        ) : (
          videos.map((video, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Link href={`/watch/${video?.id}`}>
                <VideoCard video={video} />
              </Link>
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

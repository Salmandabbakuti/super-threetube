"use client";
import { useState, useEffect, useContext } from "react";
import { message, Row, Col, Card, Empty } from "antd";
import Link from "next/link";
import { subgraphClient as client, GET_VIDEOS_QUERY } from "./utils";
import VideoCard from "./components/VideoCard";
import { SearchContext } from "./contexts/SearchContext";
import styles from "./page.module.css";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, category } = useContext(SearchContext);

  const fetchVideos = async () => {
    console.log("Fetching videos...");
    console.log("searchQuery:", searchQuery);
    console.log("categoryFilter:", category);

    setLoading(true);
    client
      .request(GET_VIDEOS_QUERY, {
        first: 200,
        skip: 0,
        orderBy: "createdAt",
        orderDirection: "desc",
        where: {
          ...(category && {
            category
          }),
          ...(searchQuery && {
            or: [
              { title_contains_nocase: searchQuery },
              {
                description_contains_nocase: searchQuery
              },
              { category_contains_nocase: searchQuery }
            ]
          })
        }
      })
      .then((data) => {
        setVideos(data?.videos);
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
  }, [searchQuery, category]);

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

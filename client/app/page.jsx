"use client";
import { useState, useEffect } from "react";
import { message } from "antd";
import styles from "./page.module.css";
import { subgraphClient as client, GET_VIDEOS_QUERY } from "./utils";

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
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js!</h1>
      </main>
    </>
  );
}

import React from "react";
import { Card, Avatar, Typography, Image } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import styles from "./VideoCard.module.css";

dayjs.extend(relativeTime);

const { Title, Text } = Typography;

export default function VideoCard({ video }) {
  return (
    <Link href={`/watch/${video.id}`}>
      <Card
        hoverable
        cover={
          <Image
            preview={false}
            alt={video.title}
            src={`https://ipfs.io/ipfs/${video.thumbnailHash}`}
            className={styles.thumbnail}
          />
        }
        className={styles.card}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${video.channel.id}`}
            />
          }
          title={
            <div className={styles.metaTitle}>
              <Title level={5} className={styles.title}>
                {video.title}
              </Title>
            </div>
          }
          description={
            <div>
              <Text className={styles.text}>
                {video.channel.id.slice(0, 9) +
                  "..." +
                  video.channel.id.slice(-5) +
                  " "}
                <CheckCircleOutlined className={styles.checkIcon} />
              </Text>
              <Text className={styles.text}>
                {video.category +
                  " • " +
                  dayjs(video.createdAt * 1000).fromNow()}
              </Text>
            </div>
          }
        />
      </Card>
    </Link>
  );
}

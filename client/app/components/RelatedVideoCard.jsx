import React from "react";
import { Typography, Image, List, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./RelatedVideoCard.module.css";

dayjs.extend(relativeTime);

const { Title, Text } = Typography;

export default function RelatedVideoCard({ video }) {
  return (
    <List.Item className={styles.card}>
      <List.Item.Meta
        avatar={
          <Image
            preview={false}
            alt={video?.title}
            src={`https://ipfs.io/ipfs/${video?.thumbnailHash}`}
            className={styles.thumbnail}
            width={180}
            height={100}
          />
        }
        title={video?.title}
        description={
          // should show the channel name and the time since the video was uploaded, category
          <Space direction="vertical">
            <Text className={styles.text}>
              {video?.channel?.id?.slice(0, 9) +
                "..." +
                video?.channel?.id?.slice(-5) +
                " "}
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </Text>
            <Text className={styles.text}>
              {video?.category +
                " • " +
                dayjs(video?.createdAt * 1000).fromNow()}
            </Text>
          </Space>
        }
      />
    </List.Item>
  );
}

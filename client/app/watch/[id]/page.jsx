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
  Space,
  Select,
  Image
} from "antd";
import { HeartTwoTone, CheckCircleTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import { useSigner, useAddress } from "@thirdweb-dev/react";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { subgraphClient as client, GET_VIDEOS_QUERY } from "@/app/utils";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import VideoCard from "@/app/components/VideoCard";
import {
  supportedSuperTokens,
  calculateFlowRateInWeiPerSecond,
  cfav1ForwarderContract
} from "@/app/utils";

const { Title, Text, Paragraph } = Typography;
dayjs.extend(relativeTime);

export default function VideoPage({ params: { id } }) {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);
  const [tipAmountInput, setTipAmountInput] = useState(null);
  const [streamInput, setStreamInput] = useState({
    token: supportedSuperTokens[0].address
  });

  const signer = useSigner();
  const account = useAddress();

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
      .catch((err) => {
        console.error("Failed to fetch related videos:", err);
        message.error("Failed to fetch related videos. Please try again.");
        setLoading(false);
      });
  };

  const handleTipCreatorWithStream = async () => {
    if (!signer || !account)
      return message.error("Please connect your wallet first");
    if (!streamInput.flowRate || !streamInput.token)
      return message.error("Please select a token and enter valid flowrate");
    const sender = account;
    const receiver = video?.channel?.id;
    console.log("create inputs: ", {
      ...streamInput,
      sender,
      receiver
    });
    try {
      const flowRateInWeiPerSecond = calculateFlowRateInWeiPerSecond(
        streamInput?.flowRate
      );
      console.log("flowRateInWeiPerSecond: ", flowRateInWeiPerSecond);
      const tx = await cfav1ForwarderContract
        .connect(signer)
        .createFlow(
          streamInput?.token,
          sender,
          receiver,
          flowRateInWeiPerSecond,
          "0x"
        );
      await tx.wait();
      message.success("Stream created successfully");
      message.success("Thank you for supporting the creator");
    } catch (error) {
      console.error("Failed to tip creator with stream:", error);
      message.error(
        "Failed to tip creator with stream. Make sure you have sufficient super token balance and try again."
      );
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
                    position="bottom"
                    title={
                      <label>
                        Support the creator by tipping them with a monthly
                        stream of tokens
                      </label>
                    }
                    description={
                      <>
                        <Space>
                          <Select
                            defaultValue={supportedSuperTokens[0].symbol}
                            name="token"
                            id="token"
                            value={
                              streamInput?.token ||
                              supportedSuperTokens[0].address
                            }
                            style={{
                              borderRadius: 10,
                              marginBottom: 10
                              // width: 120
                            }}
                            onChange={(val) =>
                              setStreamInput({ ...streamInput, token: val })
                            }
                          >
                            {supportedSuperTokens.map((token, i) => (
                              <Select.Option value={token.address} key={i}>
                                <Avatar
                                  shape="circle"
                                  size="small"
                                  src={token.icon}
                                />{" "}
                                {token.symbol}
                              </Select.Option>
                            ))}
                          </Select>
                          {/*  add flowrate input */}
                          <Input
                            type="number"
                            name="flowRate"
                            addonAfter="/month"
                            placeholder="Flowrate in no. of tokens"
                            value={streamInput?.flowRate}
                            onChange={(e) =>
                              setStreamInput({
                                ...streamInput,
                                flowRate: e.target.value
                              })
                            }
                            style={{
                              borderRadius: 10,
                              marginBottom: 10
                              // width: 120
                            }}
                          />
                        </Space>
                        <p>
                          *You are Streaming {streamInput?.flowRate || 0}{" "}
                          {
                            supportedSuperTokens.find(
                              (token) => token.address === streamInput?.token
                            ).symbol
                          }
                          /mo to the video creator:{" "}
                          {video?.channel?.id?.slice(0, 6) +
                            "..." +
                            video?.channel?.id?.slice(-4)}
                        </p>
                        <span style={{ marginLeft: "8px" }}>
                          Powered by{" "}
                          <a href="https://superfluid.finance/" target="_blank">
                            <Image
                              alt="sf_logo.svg"
                              src="/superfluid_logo.svg"
                              preview={false}
                              width={100}
                              height={50}
                            />
                          </a>
                        </span>
                      </>
                    }
                    onConfirm={handleTipCreatorWithStream}
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
          <Title level={4}>Related Videos</Title>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
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
            : relatedVideos.map((relatedVideo) => (
                <Link
                  key={relatedVideo?.id}
                  href={`/watch/${relatedVideo?.id}`}
                >
                  <VideoCard video={relatedVideo} />
                </Link>
              ))}
        </Col>
      </Row>
    </div>
  );
}

"use client";
import React, { useState, useRef } from "react";
import {
  Layout,
  Input,
  Button,
  Avatar,
  Drawer,
  Form,
  Select,
  Upload,
  Space,
  Tooltip,
  message,
  Menu
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  CopyOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  PlayCircleOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import "antd/dist/reset.css";

const { Header, Footer, Content } = Layout;

export default function SiteLayout({ children }) {
  const [uploadDrawerVisible, setUploadDrawerVisible] = useState(false);
  const [userDrawerVisible, setUserDrawerVisible] = useState(false);
  const [thumbnailInput, setThumbnailInput] = useState(null);
  const [videoInput, setVideoInput] = useState(null);

  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const showUploadDrawer = () => {
    setUploadDrawerVisible(true);
  };

  const closeUploadDrawer = () => {
    setUploadDrawerVisible(false);
  };

  const showUserDrawer = () => {
    setUserDrawerVisible(true);
  };

  const closeUserDrawer = () => {
    setUserDrawerVisible(false);
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      const isThumbnail =
        info.file.name.endsWith(".jpg") || info.file.name.endsWith(".png");
      const reader = new FileReader();
      reader.onload = () => {
        if (isThumbnail) {
          setThumbnailUrl(reader.result);
        } else {
          setVideoUrl(reader.result);
        }
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const account = useAddress();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
          padding: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 20px"
          }}
        >
          {/* Logo */}
          <img src="/path/to/logo.png" alt="Logo" style={{ height: 40 }} />
          {/* Title */}
          <h3 style={{ margin: 0, fontWeight: "bold" }}>ThreeTube</h3>
        </div>
        {/* Search Box */}
        <Input
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Search"
          style={{
            width: "40%",
            margin: "0 20px",
            borderRadius: "20px"
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 20px"
          }}
        >
          {/* Upload Button */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            shape="circle"
            onClick={showUploadDrawer}
          />
          {/* Avatar */}
          <Avatar
            size={"large"}
            src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${account}`}
            onClick={showUserDrawer}
            style={{ cursor: "pointer" }}
          />
        </div>
      </Header>
      <Content
        style={{
          margin: "12px 8px",
          padding: 12,
          minHeight: "100%",
          color: "black",
          maxHeight: "100%"
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <a
          href="https://github.com/Salmandabbakuti"
          target="_blank"
          rel="noopener noreferrer"
        >
          ©{new Date().getFullYear()} Salman Dabbakuti. Powered by ZKSync &
          TheGraph
        </a>
        <p style={{ fontSize: "12px" }}>v0.0.1</p>
      </Footer>

      {/* Upload Drawer */}
      <Drawer
        title="Upload Video"
        width={620}
        onClose={closeUploadDrawer}
        open={uploadDrawerVisible}
      >
        <Form layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Enter video title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" }
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter video description" />
          </Form.Item>
          <Space size={12}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter the location" }]}
            >
              <Input placeholder="Enter video location" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select a category">
                <Select.Option value="music">Music</Select.Option>
                <Select.Option value="gaming">Gaming</Select.Option>
                <Select.Option value="education">Education</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Form.Item
            name="video"
            label="Video"
            rules={[{ required: true, message: "Please upload a video" }]}
          >
            <Input
              type="file"
              ref={videoInputRef}
              accept="video/*"
              onChange={(e) => {
                console.log("video", e.target.files[0]);
                setVideoInput(e.target.files[0]);
              }}
            />
            {videoInput && (
              <video
                width={450}
                height={200}
                controls
                src={URL.createObjectURL(videoInput)}
              />
            )}
          </Form.Item>
          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            rules={[{ required: true, message: "Please upload a thumbnail" }]}
          >
            <Input
              type="file"
              ref={thumbnailInputRef}
              accept="image/*"
              onChange={(e) => {
                console.log("thumbnail", e.target.files[0]);
                setThumbnailInput(e.target.files[0]);
              }}
            />
            {thumbnailInput && (
              <Image
                src={URL.createObjectURL(thumbnailInput)}
                alt="Thumbnail"
                width={450}
                height={200}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      {/* User Drawer */}
      <Drawer
        title={
          <ConnectWallet
            theme={"light"} // light | dark
            switchToActiveChain={true}
            hideTestnetFaucet={false}
            modalSize={"wide"} // compact | wide
            termsOfServiceUrl="https://example.com/terms"
            privacyPolicyUrl="https://example.com/privacy"
          />
        }
        width={320}
        onClose={closeUserDrawer}
        open={userDrawerVisible}
        style={{ paddingBottom: 80 }}
      >
        <Menu
          items={[
            {
              label: "My Videos",
              icon: <PlayCircleOutlined />,
              onClick: () => message.info("My Videos clicked")
            },
            {
              label: "Settings",
              icon: <SettingOutlined />,
              onClick: () => message.info("Settings clicked")
            },
            {
              label: "Help & FAQ",
              icon: <QuestionCircleOutlined />,
              onClick: () => message.info("Help clicked")
            }
          ]}
        />
      </Drawer>
    </Layout>
  );
}

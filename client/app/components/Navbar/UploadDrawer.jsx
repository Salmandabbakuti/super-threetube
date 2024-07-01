import { useState } from "react";
import { Drawer, Form, Input, Select, Space, Button, message } from "antd";
import { PlusOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { useSigner } from "@thirdweb-dev/react";
import { contract } from "@/app/utils";
import Image from "next/image";
import { useStorageUpload } from "@thirdweb-dev/react";

export default function UploadDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [thumbnailFileInput, setThumbnailFileInput] = useState(null);
  const [videoFileInput, setVideoFileInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const signer = useSigner();
  const { mutateAsync: upload } = useStorageUpload();

  const handleSubmit = async (values) => {
    console.log("values", values);
    console.log("thumbnail", thumbnailFileInput);
    console.log("video", videoFileInput);
    if (!signer) return message.error("Please connect your wallet first");
    if (!thumbnailFileInput || !videoFileInput) {
      message.error("Please upload a video and thumbnail");
      return;
    }
    setLoading(true);
    message.info("Uploading video and thumbnail to IPFS");
    const [videoHash, thumbnailHash] = await upload({
      data: [videoFileInput, thumbnailFileInput]
    });
    console.log("uploadRes ->v,t", videoHash, thumbnailHash);
    const thumbnailCID = thumbnailHash.split("://")[1];
    const videoCID = videoHash.split("://")[1];
    console.log("thumbnailCID", thumbnailCID);
    console.log("videoCID", videoCID);
    message.success("Thumbnail and video are uploaded to IPFS");
    message.info("Adding video info to the contract");
    try {
      const tx = await contract
        .connect(signer)
        .addVideo(
          values.title,
          values.description,
          values.category,
          values.location,
          thumbnailCID,
          videoCID
        );
      await tx.wait();
      message.success("Video uploaded successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to upload video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<VideoCameraAddOutlined />}
        size="large"
        shape="circle"
        onClick={() => setDrawerOpen(true)}
      />
      <Drawer
        title="Upload Video"
        width={620}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="video"
            label="Video"
            rules={[{ required: true, message: "Please upload a video" }]}
          >
            <Input
              type="file"
              accept="video/*, audio/*"
              onChange={(e) => {
                console.log("video", e.target.files[0]);
                setVideoFileInput(e.target.files[0]);
              }}
            />
            {videoFileInput && (
              <video
                width={450}
                height={200}
                controls
                src={URL.createObjectURL(videoFileInput)}
              />
            )}
          </Form.Item>
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
              <Select placeholder="Select a category" style={{ width: 180 }}>
                <Select.Option value="Music">Music</Select.Option>
                <Select.Option value="Gaming">Gaming</Select.Option>
                <Select.Option value="Education">Education</Select.Option>
                <Select.Option value="News">News</Select.Option>
                <Select.Option value="Entertainment">
                  Entertainment
                </Select.Option>
                <Select.Option value="Technology">Technology</Select.Option>
                <Select.Option value="Lifestyle">Lifestyle</Select.Option>
                <Select.Option value="Travel">Travel</Select.Option>
                <Select.Option value="Food">Food</Select.Option>
                <Select.Option value="Health">Health</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            rules={[{ required: true, message: "Please upload a thumbnail" }]}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                console.log("thumbnail", e.target.files[0]);
                setThumbnailFileInput(e.target.files[0]);
              }}
            />
            {thumbnailFileInput && (
              <Image
                src={URL.createObjectURL(thumbnailFileInput)}
                alt="Thumbnail"
                width={450}
                height={200}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

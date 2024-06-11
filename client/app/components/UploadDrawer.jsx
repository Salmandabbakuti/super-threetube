"use client";
import { useState, useRef } from "react";
import { Drawer, Form, Input, Select, Space, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSigner } from "@thirdweb-dev/react";
import { contract, getIrys } from "@/app/utils";
import Image from "next/image";
import { useStorageUpload } from "@thirdweb-dev/react";

export default function UploadDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [thumbnailInput, setThumbnailInput] = useState(null);
  const [videoInput, setVideoInput] = useState(null);

  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const signer = useSigner();
  const { mutateAsync: upload } = useStorageUpload();

  const handleSubmit = async (values) => {
    console.log("values", values);
    console.log("thumbnail", thumbnailInput);
    console.log("video", videoInput);

    if (!thumbnailInput || !videoInput) {
      message.error("Please upload a video and thumbnail");
      return;
    }
    // const irys = await getIrys(signer.provider);

    // const { id: thumbnailHash } = await irys.uploadFile(thumbnailInput, {});
    // const { id: videoHash } = await irys.uploadFile(videoInput, {});
    // console.log("thumbnailHash", thumbnailHash);
    // console.log("videoHash", videoHash);

    const [videoHash, thumbnailHash] = await upload({
      data: [videoInput, thumbnailInput]
    });
    console.log("uploadRes ->v,t", videoHash, thumbnailHash);
    // const videoHash = await upload(videoInput);
    // Upload video and thumbnail to IPFS
    // Add video to the contract
    const thumbnailCID = thumbnailHash.split("://")[1];
    const videoCID = videoHash.split("://")[1];
    console.log("thumbnailCID", thumbnailCID);
    console.log("videoCID", videoCID);
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
      message.error("Failed to upload video");
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
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
    </>
  );
}

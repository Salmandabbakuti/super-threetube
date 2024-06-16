"use client";
import { Input, Button } from "antd";
import Link from "next/link";
import { SearchOutlined, PlayCircleTwoTone } from "@ant-design/icons";
import UserDrawer from "./UserDrawer";
import UploadDrawer from "./UploadDrawer";
import "antd/dist/reset.css";

export default function NavBar({ searchInput }) {
  return (
    <>
      <Link href="/">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            padding: "0 10px"
          }}
        >
          {/* Logo */}
          <Button
            size="large"
            icon={<PlayCircleTwoTone twoToneColor="blue" />}
            type="text"
            shape="circle"
            style={{
              padding: 0,
              fontWeight: "bold"
            }}
          />
          {/* Title */}
          <h3 style={{ margin: 0, fontWeight: "bold" }}>ThirdTube</h3>
        </div>
      </Link>
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
        onChange={(e) => searchInput(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "0 20px"
        }}
      >
        <UploadDrawer />
        <UserDrawer />
      </div>
    </>
  );
}

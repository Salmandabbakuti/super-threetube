"use client";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import UserDrawer from "./UserDrawer";
import UploadDrawer from "./UploadDrawer";
import "antd/dist/reset.css";

export default function NavBar({ searchInput }) {
  return (
    <>
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

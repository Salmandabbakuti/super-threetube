"use client";
import { useContext, useState } from "react";
import { Input, Button } from "antd";
import Link from "next/link";
import { SearchOutlined, PlayCircleTwoTone } from "@ant-design/icons";
import UserDrawer from "./UserDrawer";
import UploadDrawer from "./UploadDrawer";
import { SearchContext } from "@/app/contexts/SearchContext";
import "antd/dist/reset.css";

export default function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
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
          <h3 style={{ margin: 0, fontWeight: "bold" }}>ThreeTube</h3>
        </div>
      </Link>
      {/* Search Box */}
      <Input
        size="large"
        prefix={<SearchOutlined />}
        value={searchQuery}
        placeholder="Search"
        style={{
          width: "40%",
          margin: "0 20px",
          borderRadius: "20px"
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
        // uncomment this code to enable search on pressing enter
        // and set onchange to setSearchInput
        // onPressEnter={() => {
        //   console.log("Search for:", searchQuery);
        //   setSearchQuery(searchInput);
        // }}
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

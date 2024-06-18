import { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import Link from "next/link";
import {
  MenuOutlined,
  AppstoreOutlined,
  VideoCameraOutlined,
  BookOutlined,
  GlobalOutlined,
  SmileOutlined,
  LaptopOutlined,
  HomeOutlined,
  CarOutlined,
  CoffeeOutlined,
  HeartOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";

const categories = [
  { key: "0", label: "All", icon: <AppstoreOutlined /> },
  { key: "1", label: "Music", icon: <AppstoreOutlined /> },
  { key: "2", label: "Gaming", icon: <VideoCameraOutlined /> },
  { key: "3", label: "Education", icon: <BookOutlined /> },
  { key: "4", label: "News", icon: <GlobalOutlined /> },
  { key: "5", label: "Entertainment", icon: <SmileOutlined /> },
  { key: "6", label: "Technology", icon: <LaptopOutlined /> },
  { key: "7", label: "Lifestyle", icon: <HomeOutlined /> },
  { key: "8", label: "Travel", icon: <CarOutlined /> },
  { key: "9", label: "Food", icon: <CoffeeOutlined /> },
  { key: "10", label: "Health", icon: <HeartOutlined /> },
  { key: "11", label: "Other", icon: <QuestionCircleOutlined /> }
];

export default function SiderDrawer() {
  const [siderOpen, setSiderOpen] = useState(false);

  return (
    <>
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setSiderOpen(true)}
      />
      <Drawer
        title="Search by Category"
        placement="left"
        open={siderOpen}
        onClose={() => setSiderOpen(false)}
        key="left"
        width={300}
      >
        <Menu
          mode="inline"
          selectable
          defaultSelectedKeys={["0"]}
          items={categories}
        />
      </Drawer>
    </>
  );
}

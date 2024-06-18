import { useContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tag, Button } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  CustomerServiceOutlined,
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
import { SearchContext } from "../contexts/SearchContext";

const categories = [
  { key: "0", label: "All", value: "All", icon: <AppstoreOutlined /> },
  {
    key: "1",
    label: "Music",
    value: "Music",
    icon: <CustomerServiceOutlined />
  },
  { key: "2", label: "Gaming", value: "Gaming", icon: <VideoCameraOutlined /> },
  { key: "3", label: "Education", value: "Education", icon: <BookOutlined /> },
  { key: "4", label: "News", value: "News", icon: <GlobalOutlined /> },
  {
    key: "5",
    label: "Entertainment",
    value: "Entertainment",
    icon: <SmileOutlined />
  },
  {
    key: "6",
    label: "Technology",
    value: "Technology",
    icon: <LaptopOutlined />
  },
  { key: "7", label: "Lifestyle", value: "Lifestyle", icon: <HomeOutlined /> },
  { key: "8", label: "Travel", value: "Travel", icon: <CarOutlined /> },
  { key: "9", label: "Food", value: "Food", icon: <CoffeeOutlined /> },
  { key: "10", label: "Health", value: "Health", icon: <HeartOutlined /> },
  {
    key: "11",
    label: "Other",
    value: "Other",
    icon: <QuestionCircleOutlined />
  }
];

export default function CategoryBar() {
  const { category, setCategory } = useContext(SearchContext);

  const containerRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const scroll = (direction) => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
      const scrollAmount = clientWidth / 2; // Scroll by half of the container's visible width
      let newScrollLeft =
        scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);

      // Ensure the new scroll position is within bounds
      newScrollLeft = Math.max(
        0,
        Math.min(newScrollLeft, scrollWidth - clientWidth)
      );

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px"
      }}
    >
      <Button
        type="text"
        icon={<LeftOutlined />}
        onClick={() => scroll("left")}
      />
      <div
        ref={containerRef}
        style={{
          overflowX: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          flex: 1,
          margin: "0 10px"
        }}
      >
        {categories.map((categoryItem) => (
          <Tag
            key={categoryItem.key}
            onClick={() => {
              setCategory(categoryItem.value);
              // if pathname is not the home page, navigate to home page
              if (pathname !== "/") router.push("/");
            }}
            style={{
              cursor: "pointer",
              padding: "3px 15px",
              margin: "0 10px",
              borderRadius: "20px",
              border: "none",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              backgroundColor:
                category === categoryItem.label ? "#1890ff" : "#f0f0f0",
              color: category === categoryItem.label ? "#fff" : "#000"
            }}
          >
            {categoryItem.icon}
            <span style={{ marginLeft: 5 }}>{categoryItem.label}</span>
          </Tag>
        ))}
      </div>
      <Button
        type="text"
        icon={<RightOutlined />}
        onClick={() => scroll("right")}
      />
    </div>
  );
}

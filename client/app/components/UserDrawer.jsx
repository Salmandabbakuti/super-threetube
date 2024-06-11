import { useState } from "react";
import { Drawer, Menu, Avatar } from "antd";
import {
  PlayCircleOutlined,
  SettingOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function UserDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const account = useAddress();

  return (
    <>
      <Avatar
        size={"large"}
        src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${account}`}
        onClick={() => setDrawerOpen(true)}
        style={{ cursor: "pointer" }}
      />
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
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        style={{ paddingBottom: 80 }}
      >
        <Menu
          items={[
            {
              label: "My Videos",
              icon: <PlayCircleOutlined />
            },
            {
              label: "Settings",
              icon: <SettingOutlined />
            },
            {
              label: "Help & FAQ",
              icon: <QuestionCircleOutlined />
            }
          ]}
        />
      </Drawer>
    </>
  );
}

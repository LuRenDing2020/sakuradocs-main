import React, { useEffect, useState } from "react";
import { Group, Text, ScrollArea, ActionIcon, rem } from "@mantine/core";
import {
  IconUser,
  IconSettings,
  IconUsers,
  IconArrowLeft,
  IconUsersGroup,
  IconSpaces,
  IconBrush,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./settings.module.css";

interface DataItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface DataGroup {
  heading: string;
  items: DataItem[];
}

const groupedData: DataGroup[] = [
  {
    heading: "账户",
    items: [
      { label: "个人资料", icon: IconUser, path: "/settings/account/profile" },
      {
        label: "偏好设置",
        icon: IconBrush,
        path: "/settings/account/preferences",
      },
    ],
  },
  {
    heading: "空间",
    items: [
      { label: "通用", icon: IconSettings, path: "/settings/workspace" },
      {
        label: "成员",
        icon: IconUsers,
        path: "/settings/members",
      },
      { label: "用户组", icon: IconUsersGroup, path: "/settings/groups" },
      { label: "空间", icon: IconSpaces, path: "/settings/spaces" },
    ],
  },
];

export default function SettingsSidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const menuItems = groupedData.map((group) => (
    <div key={group.heading}>
      <Text c="dimmed" className={classes.linkHeader}>
        {group.heading}
      </Text>
      {group.items.map((item) => (
        <Link
          className={classes.link}
          data-active={active.startsWith(item.path) || undefined}
          key={item.label}
          to={item.path}
        >
          <item.icon className={classes.linkIcon} stroke={2} />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  ));

  return (
    <div className={classes.navbar}>
      <Group className={classes.title} justify="flex-start">
        <ActionIcon
          onClick={() => navigate(-1)}
          variant="transparent"
          c="gray"
          aria-label="Back"
        >
          <IconArrowLeft stroke={2} />
        </ActionIcon>
        <Text fw={500}>Settings</Text>
      </Group>

      <ScrollArea w="100%">{menuItems}</ScrollArea>
      <div className={classes.version}>
        <Text
          className={classes.version}
          size="sm"
          c="dimmed"
          component="a"
          href="https://github.com/docmost/docmost/releases"
          target="_blank"
        >
          v{APP_VERSION}
        </Text>
      </div>
    </div>
  );
}

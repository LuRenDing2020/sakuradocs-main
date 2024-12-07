import { Group, Menu, UnstyledButton, Text } from "@mantine/core";
import {
  IconBrush,
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/features/user/atoms/current-user-atom.ts";
import { Link } from "react-router-dom";
import APP_ROUTE from "@/lib/app-route.ts";
import useAuth from "@/features/auth/hooks/use-auth.ts";
import { CustomAvatar } from "@/components/ui/custom-avatar.tsx";

export default function TopMenu() {
  const [currentUser] = useAtom(currentUserAtom);
  const { logout } = useAuth();

  const user = currentUser?.user;
  const workspace = currentUser?.workspace;

  if (!user || !workspace) {
    return <></>;
  }

  return (
    <Menu width={250} position="bottom-end" withArrow shadow={"lg"}>
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7} wrap={"nowrap"}>
            <CustomAvatar
              avatarUrl={workspace.logo}
              name={workspace.name}
              variant="filled"
              size="sm"
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {workspace.name}
            </Text>
            <IconChevronDown size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>空间</Menu.Label>

        <Menu.Item
          component={Link}
          to={APP_ROUTE.SETTINGS.WORKSPACE.GENERAL}
          leftSection={<IconSettings size={16} />}
        >
          空间设置
        </Menu.Item>

        <Menu.Item
          component={Link}
          to={APP_ROUTE.SETTINGS.WORKSPACE.MEMBERS}
          leftSection={<IconUsers size={16} />}
        >
          管理成员
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>账户</Menu.Label>
        <Menu.Item component={Link} to={APP_ROUTE.SETTINGS.ACCOUNT.PROFILE}>
          <Group wrap={"nowrap"}>
            <CustomAvatar
              size={"sm"}
              avatarUrl={user.avatarUrl}
              name={user.name}
            />

            <div style={{width: 190}}>
              <Text size="sm" fw={500} lineClamp={1}>
                {user.name}
              </Text>
              <Text size="xs" c="dimmed" truncate="end">
                {user.email}
              </Text>
            </div>
          </Group>
        </Menu.Item>
        <Menu.Item
          component={Link}
          to={APP_ROUTE.SETTINGS.ACCOUNT.PROFILE}
          leftSection={<IconUserCircle size={16} />}
        >
          个人资料
        </Menu.Item>

        <Menu.Item
          component={Link}
          to={APP_ROUTE.SETTINGS.ACCOUNT.PREFERENCES}
          leftSection={<IconBrush size={16} />}
        >
          偏好设置
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item onClick={logout} leftSection={<IconLogout size={16} />}>
          登出
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

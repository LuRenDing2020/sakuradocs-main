import GroupList from "@/features/group/components/group-list";
import SettingsTitle from "@/components/settings/settings-title.tsx";
import { Group } from "@mantine/core";
import CreateGroupModal from "@/features/group/components/create-group-modal";
import useUserRole from "@/hooks/use-user-role.tsx";
import {getAppName} from "@/lib/config.ts";
import {Helmet} from "react-helmet-async";

export default function Groups() {
  const { isAdmin } = useUserRole();

  return (
    <>
        <Helmet>
            <title>管理用户组 - {getAppName()}</title>
        </Helmet>
      <SettingsTitle title="用户组" />

      <Group my="md" justify="flex-end">
        {isAdmin && <CreateGroupModal />}
      </Group>

      <GroupList />
    </>
  );
}

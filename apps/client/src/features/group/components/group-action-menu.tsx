import {
  useDeleteGroupMutation,
  useGroupQuery,
} from "@/features/group/queries/group-query";
import { useNavigate, useParams } from "react-router-dom";
import { Menu, ActionIcon, Text } from "@mantine/core";
import React from "react";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import EditGroupModal from "@/features/group/components/edit-group-modal.tsx";
import { modals } from "@mantine/modals";

export default function GroupActionMenu() {
  const { groupId } = useParams();
  const { data: group, isLoading } = useGroupQuery(groupId);
  const deleteGroupMutation = useDeleteGroupMutation();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const onDelete = async () => {
    await deleteGroupMutation.mutateAsync(groupId);
    navigate("/settings/groups");
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "删除组",
      children: (
        <Text size="sm">
          您确定要删除此组吗？成员将失去访问权限与该组可以访问的资源。
        </Text>
      ),
      centered: true,
      labels: { confirm: "删除", cancel: "取消" },
      confirmProps: { color: "red" },
      onConfirm: onDelete,
    });

  return (
    <>
      {group && (
        <>
          <Menu
            shadow="xl"
            position="bottom-end"
            offset={20}
            width={200}
            withArrow
            arrowPosition="center"
          >
            <Menu.Target>
              <ActionIcon variant="light">
                <IconDots size={20} stroke={2} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={open} disabled={group.isDefault}>
                编辑
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                c="red"
                onClick={openDeleteModal}
                disabled={group.isDefault}
                leftSection={<IconTrash size={16} stroke={2} />}
              >
                删除
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </>
      )}

      <EditGroupModal opened={opened} onClose={close} />
    </>
  );
}

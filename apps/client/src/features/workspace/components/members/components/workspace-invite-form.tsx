import { Group, Box, Button, TagsInput, Select } from "@mantine/core";
import React, { useState } from "react";
import { MultiGroupSelect } from "@/features/group/components/multi-group-select.tsx";
import { UserRole } from "@/lib/types.ts";
import { userRoleData } from "@/features/workspace/types/user-role-data.ts";
import { useCreateInvitationMutation } from "@/features/workspace/queries/workspace-query.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}
export function WorkspaceInviteForm({ onClose }: Props) {
  const [emails, setEmails] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(UserRole.MEMBER);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const createInvitationMutation = useCreateInvitationMutation();
  const navigate = useNavigate();

  async function handleSubmit() {
    const validEmails = emails.filter((email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    });

    await createInvitationMutation.mutateAsync({
      role: role.toLowerCase(),
      emails: validEmails,
      groupIds: groupIds,
    });

    onClose();

    navigate("?tab=invites");
  }

  const handleGroupSelect = (value: string[]) => {
    setGroupIds(value);
  };

  return (
    <>
      <Box maw="500" mx="auto">
        {/*<WorkspaceInviteSection /> */}

        <TagsInput
          mt="sm"
          description="输入有效的电子邮件地址，用逗号或空格分隔[最长50位]"
          label="通过电子邮件邀请"
          placeholder="输入有效的电子邮件地址"
          variant="filled"
          splitChars={[",", " "]}
          maxDropdownHeight={200}
          maxTags={50}
          onChange={setEmails}
        />

        <Select
          mt="sm"
          description="选择要分配给所有受邀成员的角色"
          label="选择角色"
          placeholder="请选择角色"
          variant="filled"
          data={userRoleData.filter((role) => role.value !== UserRole.OWNER)}
          defaultValue={UserRole.MEMBER}
          allowDeselect={false}
          checkIconPosition="right"
          onChange={setRole}
        />

        <MultiGroupSelect
          mt="sm"
          description="受邀成员将被授予用户组可以访问的空间的权限"
          label={"加入用户组"}
          onChange={handleGroupSelect}
        />

        <Group justify="flex-end" mt="md">
          <Button
            onClick={handleSubmit}
            loading={createInvitationMutation.isPending}
          >
            发送邀请
          </Button>
        </Group>
      </Box>
    </>
  );
}

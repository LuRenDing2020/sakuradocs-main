import {Group, Table, Avatar, Text, Alert} from "@mantine/core";
import {useWorkspaceInvitationsQuery} from "@/features/workspace/queries/workspace-query.ts";
import React from "react";
import {getUserRoleLabel} from "@/features/workspace/types/user-role-data.ts";
import InviteActionMenu from "@/features/workspace/components/members/components/invite-action-menu.tsx";
import {IconInfoCircle} from "@tabler/icons-react";
import {formattedDate, timeAgo} from "@/lib/time.ts";
import useUserRole from "@/hooks/use-user-role.tsx";

export default function WorkspaceInvitesTable() {
  const {data, isLoading} = useWorkspaceInvitationsQuery({
    limit: 100,
  });
  const {isAdmin} = useUserRole();

  return (
    <>
      {data && (
        <>
          <Table.ScrollContainer minWidth={500}>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>邮箱</Table.Th>
                  <Table.Th>角色</Table.Th>
                  <Table.Th>时间</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data?.items.map((invitation, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar name={invitation.email} color="initials"/>
                        <div>
                          <Text fz="sm" fw={500}>
                            {invitation.email}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>

                    <Table.Td>{getUserRoleLabel(invitation.role)}</Table.Td>

                    <Table.Td>{timeAgo(invitation.createdAt)}</Table.Td>

                    <Table.Td>
                      {isAdmin && (
                        <InviteActionMenu invitationId={invitation.id}/>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </>
      )}
    </>
  );
}

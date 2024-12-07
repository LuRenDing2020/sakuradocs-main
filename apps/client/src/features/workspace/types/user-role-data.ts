import { IRoleData, UserRole } from "@/lib/types.ts";

export const userRoleData: IRoleData[] = [
  {
    label: "Owner",
    value: UserRole.OWNER,
    description: "管理工作空间",
  },
  {
    label: "Admin",
    value: UserRole.ADMIN,
    description: "管理工作空间，但无权限删除",
  },
  {
    label: "Member",
    value: UserRole.MEMBER,
    description: "可对文档进行编辑",
  },
];

export function getUserRoleLabel(value: string) {
  const role = userRoleData.find((item) => item.value === value);
  return role ? role.label : undefined;
}

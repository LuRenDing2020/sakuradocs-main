import SettingsTitle from "@/components/settings/settings-title.tsx";
import GroupMembersList from "@/features/group/components/group-members";
import GroupDetails from "@/features/group/components/group-details";
import {getAppName} from "@/lib/config.ts";
import {Helmet} from "react-helmet-async";

export default function GroupInfo() {
    return (
        <>
            <Helmet>
                <title>管理用户组 - {getAppName()}</title>
            </Helmet>
            <SettingsTitle title="Manage Group"/>
            <GroupDetails/>
            <GroupMembersList/>
        </>
    );
}

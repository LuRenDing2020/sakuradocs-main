import SettingsTitle from "@/components/settings/settings-title.tsx";
import AccountTheme from "@/features/user/components/account-theme.tsx";
import PageWidthPref from "@/features/user/components/page-width-pref.tsx";
import {Divider} from "@mantine/core";
import {getAppName} from "@/lib/config.ts";
import {Helmet} from "react-helmet-async";

export default function AccountPreferences() {
    return (
        <>
            <Helmet>
                <title>偏好设置 - {getAppName()}</title>
            </Helmet>
            <SettingsTitle title="偏好设置"/>
            <AccountTheme/>
            <Divider my={"md"}/>
            <PageWidthPref/>
        </>
    );
}

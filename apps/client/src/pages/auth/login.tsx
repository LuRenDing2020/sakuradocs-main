import { LoginForm } from "@/features/auth/components/login-form";
import { Helmet } from "react-helmet-async";
import {getAppName} from "@/lib/config.ts";

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>登录 - {getAppName()}</title>
      </Helmet>
      <LoginForm />
    </>
  );
}

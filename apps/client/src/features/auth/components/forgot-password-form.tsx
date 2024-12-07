import { useState } from "react";
import * as z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import useAuth from "@/features/auth/hooks/use-auth";
import { IForgotPassword } from "@/features/auth/types/auth.types";
import { Box, Button, Container, Text, TextInput, Title } from "@mantine/core";
import classes from "./auth.module.css";
import { useRedirectIfAuthenticated } from "@/features/auth/hooks/use-redirect-if-authenticated.ts";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "请输入邮箱" })
    .email({ message: "邮箱无效" }),
});

export function ForgotPasswordForm() {
  const { forgotPassword, isLoading } = useAuth();
  const [isTokenSent, setIsTokenSent] = useState<boolean>(false);
  useRedirectIfAuthenticated();

  const form = useForm<IForgotPassword>({
    validate: zodResolver(formSchema),
    initialValues: {
      email: "",
    },
  });

  async function onSubmit(data: IForgotPassword) {
    if (await forgotPassword(data)) {
      setIsTokenSent(true);
    }
  }

  return (
    <Container size={420} my={40} className={classes.container}>
      <Box p="xl" mt={200}>
        <Title order={2} ta="center" fw={500} mb="md">
          重设密码
        </Title>

        <form onSubmit={form.onSubmit(onSubmit)}>
          {!isTokenSent && (
            <TextInput
              id="email"
              type="email"
              label="邮箱"
              placeholder="example@sakuraws.cn"
              variant="filled"
              {...form.getInputProps("email")}
            />
          )}

          {isTokenSent && (
            <Text>
              链接已发送至您的邮箱！请检查收件箱！
            </Text>
          )}

          {!isTokenSent && (
            <Button type="submit" fullWidth mt="xl" loading={isLoading}>
              发送链接
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
}

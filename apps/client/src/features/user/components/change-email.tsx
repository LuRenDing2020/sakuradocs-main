import {
  Modal,
  TextInput,
  Button,
  Text,
  Group,
  PasswordInput,
} from "@mantine/core";
import * as z from "zod";
import { useState } from "react";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/features/user/atoms/current-user-atom.ts";
import { useDisclosure } from "@mantine/hooks";
import * as React from "react";
import { useForm, zodResolver } from "@mantine/form";

export default function ChangeEmail() {
  const [currentUser] = useAtom(currentUserAtom);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <div>
        <Text size="md">邮箱</Text>
        <Text size="sm" c="dimmed">
          {currentUser?.user.email}
        </Text>
      </div>

      {/*
      <Button onClick={open} variant="default">
        Change email
      </Button>
      */}

      <Modal opened={opened} onClose={close} title="Change email" centered>
        <Text mb="md">
          请输入密码以更改邮箱地址
        </Text>
        <ChangeEmailForm />
      </Modal>
    </Group>
  );
}

const formSchema = z.object({
  email: z.string({ required_error: "请输入邮箱地址" }).email(),
  password: z
    .string({ required_error: "请输入密码" })
    .min(8),
});

type FormValues = z.infer<typeof formSchema>;

function ChangeEmailForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    validate: zodResolver(formSchema),
    initialValues: {
      password: "",
      email: "",
    },
  });

  function handleSubmit(data: FormValues) {
    setIsLoading(true);
    console.log(data);
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <PasswordInput
        label="密码"
        placeholder="请输入密码"
        variant="filled"
        mb="md"
        {...form.getInputProps("password")}
      />

      <TextInput
        id="email"
        label="邮箱"
        description="请输入新的邮箱地址"
        placeholder="新的邮箱地址"
        variant="filled"
        mb="md"
        {...form.getInputProps("email")}
      />

      <Button type="submit" disabled={isLoading} loading={isLoading}>
        更换邮箱
      </Button>
    </form>
  );
}

import { Button, Group, Text, Modal, PasswordInput } from "@mantine/core";
import * as z from "zod";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import * as React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { changePassword } from "@/features/auth/services/auth-service.ts";
import { notifications } from "@mantine/notifications";

export default function ChangePassword() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <div>
        <Text size="md">密码</Text>
        <Text size="sm" c="dimmed">
          此处可以更改密码哦！
        </Text>
      </div>

      <Button onClick={open} variant="default">
        更改密码
      </Button>

      <Modal opened={opened} onClose={close} title="Change password" centered>
        <Text mb="md">至少在8位以上</Text>
        <ChangePasswordForm onClose={close} />
      </Modal>
    </Group>
  );
}

const formSchema = z.object({
  oldPassword: z
    .string({ required_error: "your current password is required" })
    .min(8),
  newPassword: z.string({ required_error: "New password is required" }).min(8),
});

type FormValues = z.infer<typeof formSchema>;

interface ChangePasswordFormProps {
  onClose?: () => void;
}
function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    validate: zodResolver(formSchema),
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  async function handleSubmit(data: FormValues) {
    setIsLoading(true);
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      notifications.show({
        message: "Password changed successfully",
      });

      onClose();
    } catch (err) {
      notifications.show({
        message: `Error: ${err.response.data.message}`,
        color: "red",
      });
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <PasswordInput
        label="Current password"
        name="oldPassword"
        placeholder="Enter your current password"
        variant="filled"
        mb="md"
        data-autofocus
        {...form.getInputProps("oldPassword")}
      />

      <PasswordInput
        label="New password"
        placeholder="Enter your new password"
        variant="filled"
        mb="md"
        {...form.getInputProps("newPassword")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={isLoading} loading={isLoading}>
          Change password
        </Button>
      </Group>
    </form>
  );
}

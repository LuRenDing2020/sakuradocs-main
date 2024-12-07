import { Group, Box, Button, TextInput, Stack, Textarea } from "@mantine/core";
import React, { useState } from "react";
import { useCreateGroupMutation } from "@/features/group/queries/group-query.ts";
import { useForm, zodResolver } from "@mantine/form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { MultiUserSelect } from "@/features/group/components/multi-user-select.tsx";

const formSchema = z.object({
  name: z.string().trim().min(2).max(50),
  description: z.string().max(500),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateGroupForm() {
  const createGroupMutation = useCreateGroupMutation();
  const [userIds, setUserIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    validate: zodResolver(formSchema),
    initialValues: {
      name: "",
      description: "",
    },
  });

  const handleMultiSelectChange = (value: string[]) => {
    setUserIds(value);
  };

  const handleSubmit = async (data: {
    name?: string;
    description?: string;
  }) => {
    const groupData = {
      name: data.name,
      description: data.description,
      userIds: userIds,
    };

    const createdGroup = await createGroupMutation.mutateAsync(groupData);
    navigate(`/settings/groups/${createdGroup.id}`);
  };

  return (
    <>
      <Box maw="500" mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack>
            <TextInput
              withAsterisk
              id="name"
              label="用户组名称"
              placeholder=""
              variant="filled"
              {...form.getInputProps("name")}
            />

            <Textarea
              id="description"
              label="描述"
              placeholder=""
              variant="filled"
              autosize
              minRows={2}
              maxRows={8}
              {...form.getInputProps("description")}
            />

            <MultiUserSelect
              label={"添加成员"}
              onChange={handleMultiSelectChange}
            />
          </Stack>

          <Group justify="flex-end" mt="md">
            <Button type="submit">创建</Button>
          </Group>
        </form>
      </Box>
    </>
  );
}

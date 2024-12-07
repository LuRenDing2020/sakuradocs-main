import {
  Group,
  Text,
  useMantineColorScheme,
  Select,
  MantineColorScheme,
} from "@mantine/core";

export default function AccountTheme() {
  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <div>
        <Text size="md">主题</Text>
        <Text size="sm" c="dimmed">
          选择颜色模式
        </Text>
      </div>

      <ThemeSwitcher />
    </Group>
  );
}

function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleChange = (value: MantineColorScheme) => {
    setColorScheme(value);
  };

  return (
    <Select
      label="选择"
      data={[
        { value: "light", label: "浅色" },
        { value: "dark", label: "深色" },
        { value: "auto", label: "跟随系统设置" },
      ]}
      value={colorScheme}
      onChange={handleChange}
      allowDeselect={false}
      checkIconPosition="right"
    />
  );
}

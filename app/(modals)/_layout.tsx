import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme";

import { Stack } from "expo-router";
export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="gallery"
          options={{
            presentation: "modal",
            title: "zzz",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

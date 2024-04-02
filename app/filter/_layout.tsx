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
          name="[slug]"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="upload"
          options={{
            // Set the presentation mode to modal for our modal route.
            presentation: "modal",
            title: "filer",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

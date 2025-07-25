import React from "react";
import { Tabs } from "expo-router";
import { ThemeProvider, useTheme } from "styled-components/native";
import { lightTheme } from "../../theme/theme";
import { IconContext } from "phosphor-react-native";
import { BottomNavigationBar } from "@/components/BottomNavigationTab";
import { CustomTabScreenOptions } from "@/components/BottomNavigationTab";

type routeData = {
  routeName: string;
} & CustomTabScreenOptions;

const ROUTES_DATA: routeData[] = [
  {
    routeName: "index",
    nonFocusedIcon: { iconName: "House", weight: "regular" },
    focusedIcon: { iconName: "House", weight: "fill" },
  },
  {
    routeName: "Search",
    nonFocusedIcon: { iconName: "MagnifyingGlass", weight: "regular" },
    focusedIcon: { iconName: "MagnifyingGlass", weight: "fill" },
  },
  {
    routeName: "Discover",
    nonFocusedIcon: { iconName: "Compass", weight: "regular" },
    focusedIcon: { iconName: "Compass", weight: "fill" },
  },
  {
    routeName: "Saved",
    nonFocusedIcon: { iconName: "BookmarkSimple", weight: "regular" },
    focusedIcon: { iconName: "BookmarkSimple", weight: "fill" },
  },
  {
    routeName: "Profile",
    nonFocusedIcon: { iconName: "User", weight: "regular" },
    focusedIcon: { iconName: "User", weight: "fill" },
  },
];

function ThemedTabs() {
  const theme = useTheme();

  return (
    <IconContext.Provider
      value={{
        size: theme.iconSizes.large,
        color: theme.palette.neutral[900],
        weight: "regular",
      }}
    >
      <Tabs
        tabBar={(props) => <BottomNavigationBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        {ROUTES_DATA.map(
          ({ routeName, nonFocusedIcon, focusedIcon }: routeData) => {
            const tabOption: CustomTabScreenOptions = {
              nonFocusedIcon,
              focusedIcon,
            };

            return (
              <Tabs.Screen
                key={routeName}
                name={routeName}
                options={tabOption}
              />
            );
          }
        )}
      </Tabs>
    </IconContext.Provider>
  );
}

export default function TabLayout() {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThemedTabs />
    </ThemeProvider>
  );
}

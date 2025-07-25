import React from "react";
import { BottomNavigationContainer } from "./BottomNavigationContainer";
import { BottomNavItem } from "./BottomNavItem/BottomNavItem";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { IconProps } from "@/components/Icon";
import { Tabs } from "expo-router";

export type bottomTabBarIconsData = {
  nonFocusedIcon: IconProps;
  focusedIcon: IconProps;
};

export type CustomTabScreenOptions = bottomTabBarIconsData &
  React.ComponentProps<typeof Tabs.Screen>["options"];

export const BottomNavigationBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <BottomNavigationContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const customOptions = options as CustomTabScreenOptions; // cast the options to accomodate bottomTabBarIconsData props
        const { focusedIcon, nonFocusedIcon } = customOptions;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const iconData = isFocused ? focusedIcon : nonFocusedIcon;

        return <BottomNavItem key={index} {...iconData} onPress={onPress} />;
      })}
    </BottomNavigationContainer>
  );
};

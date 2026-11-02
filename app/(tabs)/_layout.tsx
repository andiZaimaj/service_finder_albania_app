import React from "react";
import { Tabs } from "expo-router";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Colors } from "@/constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" } as const,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
      <Tabs.Screen name="inbox" options={{ title: "Inbox" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { HomeIcon, HeartIcon, MessageCircleIcon, UserIcon } from "./SvgIcons";
import i18n from "@/lib/i18n";

// Derive the tab-bar props from expo-router's Tabs so the type always matches
// what `<Tabs tabBar={...}>` passes (avoids @react-navigation version skew).
type BottomTabBarProps = Parameters<
  NonNullable<React.ComponentProps<typeof Tabs>["tabBar"]>
>[0];

const TAB_ICONS = [HomeIcon, HeartIcon, MessageCircleIcon, UserIcon];

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabLabels = [
    i18n.t("tabs.home"),
    i18n.t("tabs.saved"),
    i18n.t("tabs.inbox"),
    i18n.t("tabs.profile"),
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route: { key: string; name: string }, index: number) => {
          const isFocused = state.index === index;
          const Icon = TAB_ICONS[index];
          const label = tabLabels[index];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              {Icon && (
                <Icon
                  size={22}
                  color={isFocused ? Colors.sage : Colors.inkMute}
                />
              )}
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? Colors.sage : Colors.inkMute },
                ]}
              >
                {label}
              </Text>
              {isFocused && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    borderRadius: 28,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.sand,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontFamily: Fonts.bodyMedium,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.sage,
    marginTop: 2,
  },
});

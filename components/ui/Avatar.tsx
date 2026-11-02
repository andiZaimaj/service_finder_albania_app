import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";

const AVATAR_COLORS = [Colors.sage, Colors.sand, Colors.sageMint, Colors.sageSoft, Colors.sageDeep];

interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 44 }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colorIndex = name.length % AVATAR_COLORS.length;
  const bgColor = AVATAR_COLORS[colorIndex];
  const textColor = bgColor === Colors.sage || bgColor === Colors.sageDeep ? Colors.white : Colors.ink;

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
        },
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            fontSize: size * 0.38,
            color: textColor,
            fontFamily: Fonts.bodySemibold,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {},
});

import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { Colors } from "@/constants/colors";
import type { CategoryKey } from "@/constants/categories";

interface CategoryIconProps {
  category: CategoryKey;
  size?: number;
  color?: string;
}

export function CategoryIcon({ category, size = 24, color = Colors.sage }: CategoryIconProps) {
  switch (category) {
    case "electrician":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </Svg>
      );
    case "plumber":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </Svg>
      );
    case "cleaner":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
          <Path d="M5 16l1 2.5L8.5 20l-2.5 1L5 23.5 3.5 21 1 20l2.5-1L5 16z" />
          <Path d="M18 14l1 2 2.5 1-2.5 1-1 2-1-2-2.5-1 2.5-1 1-2z" />
        </Svg>
      );
    case "mechanic":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </Svg>
      );
    case "painter":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z" />
          <Path d="M9 8c-2 3-4 3.5-7 4l8 10c2.5-1 4.5-5 4-8" />
          <Circle cx="7.5" cy="15.5" r="0.5" fill={color} />
        </Svg>
      );
    default:
      return null;
  }
}

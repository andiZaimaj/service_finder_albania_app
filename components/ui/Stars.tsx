import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/colors";

interface StarsProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

function StarIcon({ filled, size, color }: { filled: boolean; size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth={1.5}>
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
  );
}

export function Stars({ rating, size = 16, interactive = false, onRate }: StarsProps) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <View
          key={star}
          onTouchEnd={interactive && onRate ? () => onRate(star) : undefined}
        >
          <StarIcon
            filled={star <= Math.round(rating)}
            size={size}
            color={Colors.sage}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
  },
});

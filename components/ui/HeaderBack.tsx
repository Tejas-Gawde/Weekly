import { router } from "expo-router";
import { forwardRef } from "react";
import { Pressable } from "react-native";

import { BackIcon } from "../Icons/BackIcon";

export const HeaderBack = forwardRef<typeof Pressable, { onPress?: () => void }>(
  ({ onPress }, ref) => {
    const handlePress = () => {
      if (onPress) {
        onPress();
      } else {
        router.back();
      }
    };
    return (
      <Pressable onPress={handlePress}>
        {({ pressed }) => <BackIcon pressed={pressed} name="caret-back-outline" color="gray" />}
      </Pressable>
    );
  }
);

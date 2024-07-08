import { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

const BouncyProgressBar = ({
  value,
  height = 10,
  fillColor = "white",
}: {
  value: number;
  height?: number;
  fillColor?: string;
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const animateProgress = (toValue: number) => {
    Animated.spring(animatedWidth, {
      toValue,
      friction: 3,
      tension: 40,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animateProgress(value);
  }, [value]);

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: fillColor,
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  fill: {
    height: "100%",
  },
});

export default BouncyProgressBar;

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import React, { useState, Dispatch, SetStateAction } from "react";
import { View, Pressable, Animated, StyleSheet } from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";
import PoppinsSemiBold from "./Text/PoppinsSemibold";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

dayjs.extend(isoWeek);

export default function WeekBoard({
  color,
  setSelectedDate,
  selectedDate,
  disabled,
}: {
  color: string;
  setSelectedDate: Dispatcher<string>;
  selectedDate?: string;
  disabled?: boolean;
}) {
  const today = new Date();
  const weekStart = dayjs(today).startOf("isoWeek");
  const weekDates = Array(7)
    .fill(0)
    .map((_, index) => weekStart.add(index, "day"));

  return (
    <View style={styles.container}>
      {weekDates.map((date) => (
        <AnimatedPressable
          key={date.format("ddd DD")}
          date={date}
          color={color}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          disabled={disabled && date.isBefore(dayjs(), "day")}
        />
      ))}
    </View>
  );
}

function AnimatedPressable({
  date,
  color,
  selectedDate,
  setSelectedDate,
  disabled,
}: {
  date: dayjs.Dayjs;
  color: string;
  selectedDate?: string;
  setSelectedDate: Dispatcher<string>;
  disabled?: boolean;
}) {
  const scaleValue = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleValue, {
        toValue: 0.7,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePress = () => {
    if (!disabled) {
      setSelectedDate(date.format("ddd DD"));
    }
  };

  const isSelected = selectedDate === date.format("ddd DD");

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          transform: [{ scale: scaleValue }],
          backgroundColor: isSelected ? "hsl(163, 76%, 44%)" : "transparent",
          opacity: disabled ? 0.5 : 1,
        },
      ]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.pressable}
        disabled={disabled}>
        <PoppinsRegular style={{ color: isSelected ? "black" : "gray" }}>
          {date.format("ddd")[0]}
        </PoppinsRegular>
        <PoppinsSemiBold style={{ color: isSelected ? "black" : color }}>
          {date.format("DD")}
        </PoppinsSemiBold>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  animatedView: {
    alignItems: "center",
    borderRadius: 12,
  },
  pressable: {
    alignItems: "center",
    padding: 15,
  },
});

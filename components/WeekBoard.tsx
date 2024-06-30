import dayjs from 'dayjs';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, Pressable, Animated, StyleSheet } from 'react-native';

import PoppinsRegular from './Text/PoppinsRegular';
import PoppinsSemiBold from './Text/PoppinsSemibold';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

export default function WeekBoard({
  color,
  setSelectedDate,
  selectedDate,
}: {
  color: string;
  setSelectedDate: Dispatcher<string>;
  selectedDate?: string;
}) {
  const currentDate = dayjs().format('ddd DD');
  selectedDate = selectedDate || currentDate;
  const today = new Date();
  const weekStart = dayjs(today).startOf('week');
  const weekDates = Array(7)
    .fill(0)
    .map((_, index) => weekStart.add(index, 'day').format('ddd DD'));

  return (
    <View style={styles.container}>
      {weekDates.map((date) => (
        <AnimatedPressable
          key={date}
          date={date}
          color={color}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
}: {
  date: string;
  color: string;
  selectedDate?: string;
  setSelectedDate: Dispatcher<string>;
}) {
  const scaleValue = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    setSelectedDate(date);
  };

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          transform: [{ scale: scaleValue }],
          backgroundColor: selectedDate === date ? 'hsl(163, 76%, 44%)' : 'transparent',
        },
      ]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.pressable}>
        <PoppinsRegular style={{ color: selectedDate === date ? 'black' : 'gray' }}>
          {date[0]}
        </PoppinsRegular>
        <PoppinsSemiBold style={{ color: selectedDate === date ? 'black' : color }}>
          {date.split(' ')[1]}
        </PoppinsSemiBold>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  animatedView: {
    alignItems: 'center',
    borderRadius: 12,
  },
  pressable: {
    alignItems: 'center',
    padding: 15,
  },
});

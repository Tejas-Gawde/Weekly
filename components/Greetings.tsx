import dayjs from "dayjs";
import { View, StyleSheet } from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";

export default function Greetings() {
  const getGreeting = () => {
    const now = dayjs();
    const dayOfWeek = now.day();
    const hour = now.hour();

    if (dayOfWeek === 1) {
      return "It's a fresh start of the week";
    } else if (dayOfWeek === 0) {
      return "The week ends today";
    } else {
      if (hour >= 4 && hour < 12) {
        return "Good morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good afternoon";
      } else if (hour >= 18 && hour < 21) {
        return "Good evening";
      } else {
        return "Good night";
      }
    }
  };

  return (
    <View style={styles.greetingContainer}>
      <PoppinsRegular style={styles.greetingText}>{getGreeting()}</PoppinsRegular>
    </View>
  );
}

export const styles = StyleSheet.create({
  greetingContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  greetingText: {
    fontSize: 40,
    color: "white",
  },
});

import dayjs from "dayjs";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

import TaskTimeline from "~/components/TaskTimeline";
import PoppinsRegular from "~/components/Text/PoppinsRegular";
import WeekBoard from "~/components/WeekBoard";
const currentDate = dayjs().format("ddd DD");

export default function Calender() {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  return (
    <View style={styles.container}>
      <WeekBoard setSelectedDate={setSelectedDate} selectedDate={selectedDate} color="black" />
      <View style={styles.taskContainer}>
        <PoppinsRegular style={styles.text}>Planned for today</PoppinsRegular>
        <TaskTimeline selectedDay={selectedDate.split(" ")[0]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  taskContainer: {
    flex: 1,
    backgroundColor: "hsl(0, 0%, 11%)",
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginLeft: 12,
    paddingVertical: 10,
  },
});

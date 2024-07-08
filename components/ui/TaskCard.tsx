import { format } from "date-fns";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Deadline from "./Deadline";
import Priority from "./Priority";
import PoppinsRegular from "../Text/PoppinsRegular";
import PoppinsSemiBold from "../Text/PoppinsSemibold";

import Task from "~/models/Tasks";

export default function TaskCard({ task }: { task: Task }) {
  const formattedDate = format(new Date(task.iso), "MMM, dd hh:mm a");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <View style={styles.cardHeader}>
          <PoppinsSemiBold style={styles.taskTitle}>{task.title}</PoppinsSemiBold>
          <Priority>{task.priority}</Priority>
        </View>
        <View style={styles.cardFooter}>
          <PoppinsRegular style={styles.taskDescription}>{task.description}</PoppinsRegular>
          <Deadline>{formattedDate}</Deadline>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    width: "96%",

    backgroundColor: "hsl(0, 0%, 11%)",
    gap: 15,
    borderRadius: 15,
    marginTop: 12,
    padding: 16,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskTitle: {
    color: "white",
    fontSize: 18,
    width: "63%",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskDescription: {
    color: "white",
    width: "63%",
    fontSize: 16,
  },
});

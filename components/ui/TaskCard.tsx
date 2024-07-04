import { format } from "date-fns";
import { View, StyleSheet } from "react-native";
import { Card } from "tamagui";

import Deadline from "./Deadline";
import Priority from "./Priority";
import PoppinsRegular from "../Text/PoppinsRegular";
import PoppinsSemiBold from "../Text/PoppinsSemibold";

import Task from "~/models/Tasks";

export default function TaskCard({ task }: { task: Task }) {
  const formattedDate = format(new Date(task.iso), "MMM, dd hh:mm a");
  return (
    <View style={styles.container}>
      <Card
        pressStyle={styles.cardPressStyle}
        width="96%"
        height={140}
        backgroundColor="hsl(0, 0%, 11%)"
        borderRadius="$8"
        marginTop="$3">
        <Card.Header style={styles.cardHeader}>
          <PoppinsSemiBold style={styles.taskTitle}>{task.title}</PoppinsSemiBold>
          <Priority>{task.priority}</Priority>
        </Card.Header>
        <Card.Footer style={styles.cardFooter} padded>
          <PoppinsRegular style={styles.taskDescription}>{task.description}</PoppinsRegular>
          <Deadline>{formattedDate}</Deadline>
        </Card.Footer>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  cardPressStyle: {
    backgroundColor: "hsl(0, 0%, 11%)",
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

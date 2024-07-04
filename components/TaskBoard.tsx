import { withObservables } from "@nozbe/watermelondb/react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Observable } from "rxjs/internal/Observable";
import { Button, Card } from "tamagui";

import PoppinsRegular from "./Text/PoppinsRegular";
import PoppinsSemiBold from "./Text/PoppinsSemibold";

import { taskCollection, statisticsCollection } from "~/database";
import Statistics from "~/models/Statistics";

const TaskBoard = ({
  taskStatistics,
  inProcess,
}: {
  taskStatistics: Statistics[];
  inProcess: number;
}) => {
  // Check if taskStatistics is defined and has at least one item
  const tasksTotal = taskStatistics?.[0]?.tasksTotal ?? 0;
  const tasksCompleted = taskStatistics?.[0]?.tasksCompleted ?? 0;
  const tasksMissed = taskStatistics?.[0]?.tasksMissed ?? 0;

  return (
    <>
      <View style={styles.buttonContainer}>
        <Button
          borderRadius="$8"
          width="25%"
          height="$3"
          disabled
          backgroundColor="hsl(0, 0%, 16%)">
          Tasks
        </Button>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.cardRow}>
          <Card width="48.5%" height={110} borderRadius="$8" backgroundColor="hsl(163, 76%, 44%)">
            <Card.Header padding="$3" paddingHorizontal="$4">
              <PoppinsRegular>All tasks</PoppinsRegular>
            </Card.Header>
            <Card.Footer paddingHorizontal="$3.5">
              <PoppinsSemiBold style={styles.cardNumber}>{tasksTotal}</PoppinsSemiBold>
            </Card.Footer>
          </Card>
          <Card width="48.5%" height={110} borderRadius="$8" backgroundColor="hsl(0, 0%, 100%)">
            <Card.Header padding="$3" paddingHorizontal="$4">
              <PoppinsRegular>In Process</PoppinsRegular>
            </Card.Header>
            <Card.Footer paddingHorizontal="$3.5">
              <PoppinsSemiBold style={styles.cardNumber}>{inProcess}</PoppinsSemiBold>
            </Card.Footer>
          </Card>
        </View>
        <View style={styles.cardRow}>
          <Card width="48.5%" height={110} borderRadius="$8" backgroundColor="hsl(0, 0%, 100%)">
            <Card.Header padding="$3" paddingHorizontal="$4">
              <PoppinsRegular>Completed</PoppinsRegular>
            </Card.Header>
            <Card.Footer paddingHorizontal="$3.5">
              <PoppinsSemiBold style={styles.cardNumber}>{tasksCompleted}</PoppinsSemiBold>
            </Card.Footer>
          </Card>
          <Card width="48.5%" height={110} borderRadius="$8" backgroundColor="hsl(1, 70%, 56%)">
            <Card.Header padding="$3" paddingHorizontal="$4">
              <PoppinsRegular>Missed</PoppinsRegular>
            </Card.Header>
            <Card.Footer paddingHorizontal="$3.5">
              <PoppinsSemiBold style={styles.cardNumber}>{tasksMissed}</PoppinsSemiBold>
            </Card.Footer>
          </Card>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 24,
  },
  cardsContainer: {
    paddingTop: 20,
    paddingHorizontal: "2%",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  cardNumber: {
    fontSize: 34,
  },
});

const enhance = withObservables([], () => ({
  inProcess: taskCollection.query().observeCount(),
  taskStatistics: statisticsCollection
    .query()
    .observeWithColumns(["tasksTotal", "tasksCompleted", "tasksMissed"]) as Observable<
    Statistics[]
  >,
}));

export default enhance(TaskBoard);

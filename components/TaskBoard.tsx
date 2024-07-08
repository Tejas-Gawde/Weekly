import { withObservables } from "@nozbe/watermelondb/react";
import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { Observable } from "rxjs/internal/Observable";

import PoppinsRegular from "./Text/PoppinsRegular";
import PoppinsSemiBold from "./Text/PoppinsSemibold";

import { taskCollection, statisticsCollection } from "~/database";
import Statistics from "~/models/Statistics";

interface CardProps extends ViewProps {
  title: string;
  value: number;
}

const Card: React.FC<CardProps> = ({ style, title, value }) => (
  <View style={[styles.card, style]}>
    <View style={styles.cardHeader}>
      <PoppinsRegular>{title}</PoppinsRegular>
    </View>
    <View style={styles.cardFooter}>
      <PoppinsSemiBold style={styles.cardNumber}>{value}</PoppinsSemiBold>
    </View>
  </View>
);

const TaskBoard = ({
  taskStatistics,
  inProcess,
}: {
  taskStatistics: Statistics[];
  inProcess: number;
}) => {
  const tasksTotal = taskStatistics?.[0]?.tasksTotal ?? 0;
  const tasksCompleted = taskStatistics?.[0]?.tasksCompleted ?? 0;
  const tasksMissed = taskStatistics?.[0]?.tasksMissed ?? 0;

  return (
    <>
      <View style={styles.titleContainer}>
        <PoppinsRegular style={styles.title}>Tasks</PoppinsRegular>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.cardRow}>
          <Card
            style={{ width: "48.5%", height: 110, backgroundColor: "hsl(163, 76%, 44%)" }}
            title="All tasks"
            value={tasksTotal}
          />
          <Card
            style={{ width: "48.5%", height: 110, backgroundColor: "hsl(0, 0%, 100%)" }}
            title="In Process"
            value={inProcess}
          />
        </View>
        <View style={styles.cardRow}>
          <Card
            style={{ width: "48.5%", height: 110, backgroundColor: "hsl(0, 0%, 100%)" }}
            title="Completed"
            value={tasksCompleted}
          />
          <Card
            style={{ width: "48.5%", height: 110, backgroundColor: "hsl(1, 70%, 56%)" }}
            title="Missed"
            value={tasksMissed}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 24,
  },
  title: {
    paddingTop: 2,
    fontSize: 17,
    borderRadius: 15,
    color: "white",
    backgroundColor: "hsl(0,0%,16%)",
    width: 80,
    textAlign: "center",
    alignItems: "center",
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
  card: {
    borderRadius: 15,
    padding: 12,
    justifyContent: "space-between",
  } as ViewStyle,
  cardHeader: {
    paddingBottom: 8,
  },
  cardFooter: {
    paddingTop: 8,
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

import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";
import TaskCard from "./ui/TaskCard";

import { taskCollection } from "~/database";
import Task from "~/models/Tasks";

function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <>
        <View style={styles.titleContainer}>
          <PoppinsRegular style={styles.title}>Task list</PoppinsRegular>
        </View>
        <View style={styles.noTasksContainer}>
          <PoppinsRegular style={styles.noTasksText}>No tasks to display!</PoppinsRegular>
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.titleContainer}>
        <PoppinsRegular style={styles.title}>Task list</PoppinsRegular>
      </View>
      <FlashList
        data={tasks}
        renderItem={({ item, index }) => <TaskCard task={item} />}
        keyExtractor={(_, index) => index.toString()}
        estimatedItemSize={140}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTasksText: {
    fontSize: 22,
    color: "white",
  },
});

const enhance = withObservables([], () => ({
  tasks: taskCollection.query(Q.sortBy("iso", Q.asc)),
}));

export default enhance(TaskList);

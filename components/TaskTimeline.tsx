import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlashList } from "@shopify/flash-list";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";
import PoppinsSemiBold from "./Text/PoppinsSemibold";

import database, { statisticsCollection, taskCollection } from "~/database";
import Task from "~/models/Tasks";

interface TaskCardProps {
  task: Task;
  index: number;
  onRemove: (id: string) => void;
}

interface TaskTimelineProps {
  tasks: Task[];
  selectedDay: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onRemove }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colors = ["hsl(54, 100%, 76%)", "hsl(269, 100%, 84%)", "hsl(0, 0%, 100%)"];
  const color = colors[index % colors.length];
  const formattedDate = format(new Date(task.iso), "MMM, dd hh:mm a");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = (callback: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      callback();
    });
  };

  async function handleComplete(taskid: string) {
    fadeOut(() => {
      database.write(async () => {
        const taskToDelete = await taskCollection.query(Q.where("id", taskid)).fetch();
        await taskToDelete[0].markAsDeleted();
        await taskToDelete[0].destroyPermanently();
        const statistics = await statisticsCollection.query().fetch();
        const stat = statistics[0];
        await stat.update((s) => {
          s.tasksCompleted += 1;
        });
        onRemove(taskid);
      });
    });
  }

  async function handleDelete(taskid: string) {
    fadeOut(() => {
      database.write(async () => {
        const taskToDelete = await taskCollection.query(Q.where("id", taskid)).fetch();
        await taskToDelete[0].markAsDeleted();
        await taskToDelete[0].destroyPermanently();
        onRemove(taskid);
      });
    });
  }

  return (
    <Animated.View style={[styles.taskContainer, { opacity: fadeAnim }]}>
      <View style={[styles.taskCard, { backgroundColor: color }]}>
        <View style={styles.taskInfo}>
          <PoppinsRegular style={styles.taskTime}>{formattedDate}</PoppinsRegular>
          <PoppinsSemiBold style={styles.taskTitle}>{task.title}</PoppinsSemiBold>
          <PoppinsRegular style={styles.taskDesc}>{task.description}</PoppinsRegular>
          <PoppinsSemiBold style={styles.taskPriority}>{task.priority}</PoppinsSemiBold>
        </View>
        <View style={styles.taskCardButtons}>
          <Pressable
            android_ripple={{ color: "gray", borderless: false, foreground: true }}
            style={styles.taskButton}
            onPress={() => handleComplete(task.id)}>
            <PoppinsRegular style={styles.buttonText}>Complete</PoppinsRegular>
          </Pressable>
          <Pressable
            android_ripple={{ color: "gray", borderless: false, foreground: true }}
            style={styles.taskButton}
            onPress={() => handleDelete(task.id)}>
            <PoppinsRegular style={styles.buttonText}>Delete</PoppinsRegular>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const TaskTimeline = ({ tasks: initialTasks, selectedDay }: TaskTimelineProps) => {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleRemoveTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  if (tasks.length === 0) {
    return (
      <View style={styles.noTasksContainer}>
        <PoppinsRegular style={styles.noTasksText}>No tasks for the day!</PoppinsRegular>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={tasks}
        renderItem={({ item, index }) => (
          <TaskCard task={item} index={index} onRemove={handleRemoveTask} />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={140}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashList}
        disableIntervalMomentum
      />
    </View>
  );
};

const enhance = withObservables(["selectedDay"], ({ selectedDay }) => ({
  tasks: taskCollection.query(Q.sortBy("iso", Q.asc), Q.where("day", selectedDay)),
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  taskButton: {
    backgroundColor: "hsl(0, 0%, 8%)",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  taskContainer: {
    marginBottom: 20,
  },
  taskCard: {
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskCardButtons: {
    justifyContent: "space-evenly",
    marginHorizontal: 3,
  },
  taskInfo: {
    flex: 1,
    paddingRight: 20,
  },
  taskTime: {
    color: "black",
    fontSize: 12,
    marginBottom: 5,
  },
  taskTitle: {
    color: "black",
    fontSize: 16,
    marginBottom: 5,
  },
  taskDesc: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
    fontSize: 13,
  },
  taskPriority: {
    color: "black",
    fontSize: 13,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  noTasksText: {
    fontSize: 22,
    color: "white",
  },
  flashList: {
    paddingTop: 15,
    paddingBottom: 70,
  },
});

export default enhance(TaskTimeline);

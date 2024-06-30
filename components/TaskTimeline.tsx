import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PoppinsRegular from './Text/PoppinsRegular';
import PoppinsSemiBold from './Text/PoppinsSemibold';

interface Task {
  time: string;
  title: string;
  tags: string[];
  duration: string;
  color: string;
}

interface TaskCardProps {
  task: Task;
  isLast: boolean;
  index: number;
}

interface TaskTimelineProps {
  tasks: Task[] | [];
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isLast, index }) => {
  const colors = ['hsl(0, 0%, 100%)', 'hsl(269, 100%, 84%)', 'hsl(54, 100%, 76%)'];
  const color = colors[index % colors.length];

  return (
    <View style={styles.taskContainer}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={[styles.taskCard, { backgroundColor: color }]}>
        <PoppinsRegular style={styles.taskTime}>{task.time}</PoppinsRegular>
        <PoppinsSemiBold style={styles.taskTitle}>{task.title}</PoppinsSemiBold>
        <View style={styles.tagsContainer}>
          {task.tags.map((tag, index) => (
            <PoppinsRegular key={index} style={styles.tag}>
              #{tag}
            </PoppinsRegular>
          ))}
        </View>
        <PoppinsRegular style={styles.taskDuration}>{task.duration}</PoppinsRegular>
      </View>
    </View>
  );
};

const TaskTimeline: React.FC<TaskTimelineProps> = ({ tasks }) => {
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
          <TaskCard task={item} isLast={index === tasks.length - 1} index={index} />
        )}
        keyExtractor={(_, index) => index.toString()}
        estimatedItemSize={140}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  taskContainer: {
    flexDirection: 'row',
    marginBottom: 20, // Space between task cards
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 1, // Ensure dot appears above the line
  },
  timelineLine: {
    position: 'absolute',
    top: 10, // Start line from the bottom of the dot
    bottom: -20, // Extend line to connect with the next dot
    left: 4, // Center the line (half of dot's width)
    width: 2,
    backgroundColor: 'white',
  },
  taskCard: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    marginRight: 1,
  },
  taskTime: {
    color: 'black',
    fontSize: 12,
    marginBottom: 5,
  },
  taskTitle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  tag: {
    color: 'black',
    fontSize: 12,
    marginRight: 5,
  },
  taskDuration: {
    color: 'black',
    fontSize: 12,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: 22,
    color: 'white',
  },
  flashList: {
    paddingTop: 15,
    paddingBottom: 70,
  },
});

export default TaskTimeline;

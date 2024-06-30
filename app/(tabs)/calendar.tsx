import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import TaskTimeline from '~/components/TaskTimeline';
import PoppinsRegular from '~/components/Text/PoppinsRegular';
import WeekBoard from '~/components/WeekBoard';

export default function Calender() {
  const [selectedDate, setSelectedDate] = useState('');
  const tasks = [
    {
      time: '11:00am',
      title: 'Design team meeting',
      tags: ['call', 'team'],
      duration: '30 min',
      color: '#333333',
    },
    {
      time: '12:00am',
      title: 'Restaurant C&B. New Project Research',
      tags: ['ux design', 'brand', 'research'],
      duration: '2 hr',
      color: '#8E44AD',
    },
    {
      time: '3:00pm',
      title: 'Clients and managers meet. Fintech Company',
      tags: ['call', 'finance', 'pm communication'],
      duration: '1 hr',
      color: '#F1C40F',
    },
    {
      time: '3:00pm',
      title: 'Clients and managers meet. Fintech Company',
      tags: ['call', 'finance', 'pm communication'],
      duration: '1 hr',
      color: '#F1C40F',
    },
    {
      time: '3:00pm',
      title: 'Clients and managers meet. Fintech Company',
      tags: ['call', 'finance', 'pm communication'],
      duration: '1 hr',
      color: '#F1C40F',
    },
    {
      time: '3:00pm',
      title: 'Clients and managers meet. Fintech Company',
      tags: ['call', 'finance', 'pm communication'],
      duration: '1 hr',
      color: '#F1C40F',
    },
  ];
  return (
    <View style={styles.container}>
      <WeekBoard setSelectedDate={setSelectedDate} selectedDate={selectedDate} color="black" />
      <View style={styles.taskContainer}>
        <PoppinsRegular style={styles.text}>Planned for today</PoppinsRegular>
        <TaskTimeline tasks={tasks} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  taskContainer: {
    flex: 1,
    backgroundColor: 'hsl(0, 0%, 11%)',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginLeft: 12,
    paddingVertical: 10,
  },
});

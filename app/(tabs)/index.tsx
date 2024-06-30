import { StyleSheet, ScrollView } from 'react-native';

import Greetings from '~/components/Greetings';
import TaskBoard from '~/components/TaskBoard';
import TaskList from '~/components/TaskList';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Greetings />
      <TaskBoard />
      <TaskList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 90,
    borderWidth: 0,
  },
});

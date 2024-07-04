import { usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView } from "react-native";

import Greetings from "~/components/Greetings";
import TaskBoard from "~/components/TaskBoard";
import TaskList from "~/components/TaskList";

export default function Home() {
  const pathname = usePathname();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style={pathname === "/calendar" ? "dark" : "light"} />
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

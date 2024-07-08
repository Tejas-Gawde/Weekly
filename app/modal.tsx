import React, { useState } from "react";
import { Pressable, View, Alert, StyleSheet } from "react-native";

import NamePopup from "~/components/NamePopup";
import PoppinsRegular from "~/components/Text/PoppinsRegular";
import PoppinsSemiBold from "~/components/Text/PoppinsSemibold";
import Separator from "~/components/ui/Seperator";
import database, { taskCollection } from "~/database";

export default function Modal() {
  const [modalVisible, setModalVisible] = useState(false);

  async function handleTaskNuke() {
    Alert.alert("Confirm Task Deletion", "Are you sure you want to delete all tasks?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          database.write(async () => {
            const tasks = await taskCollection.query().fetch();
            const deleted = tasks.map((task: any) => task.prepareDestroyPermanently());
            database.batch(deleted);
          });
          Alert.alert("Success", "All tasks have been deleted.");
        },
        style: "destructive",
      },
    ]);
  }

  async function handleStatNuke() {
    Alert.alert(
      "Confirm Statistics Deletion",
      "Are you sure you want to delete all task statistics?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            database.write(async () => {
              const statistics = await database.collections.get("statistics").query().fetch();
              const deleted = statistics.map((stat: any) => stat.prepareDestroyPermanently());
              database.batch(deleted);
            });
            Alert.alert("Success", "All task statistics have been deleted.");
          },
          style: "destructive",
        },
      ]
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "hsl(0, 0%, 6%)",
          paddingHorizontal: 20,
          paddingTop: 40,
        }}>
        <Pressable
          style={styles.button}
          android_ripple={{ color: "gray", borderless: false, foreground: true }}
          onPress={() => setModalVisible(true)}>
          <PoppinsRegular style={styles.buttonText}>Change Name</PoppinsRegular>
        </Pressable>
        <NamePopup visible={modalVisible} onClose={() => setModalVisible(false)} />

        <Separator marginVertical={10} />

        <Pressable
          onPress={handleTaskNuke}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "hsl(0, 70%, 35%)" : "hsl(0, 70%, 40%)",
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
          })}>
          <PoppinsSemiBold style={styles.buttonText}>Nuke all tasks!</PoppinsSemiBold>
        </Pressable>

        <Separator marginVertical={10} />

        <Pressable
          onPress={handleStatNuke}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "hsl(0, 70%, 35%)" : "hsl(0, 70%, 40%)",
            borderRadius: 10,
            padding: 15,
          })}>
          <PoppinsSemiBold style={styles.buttonText}>Nuke all task statistics!</PoppinsSemiBold>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "hsl(0, 0%, 16%)",
    borderRadius: 10,
    padding: 15,
    overflow: "hidden",
  },
});

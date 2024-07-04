import React, { useState } from "react";
import { Pressable, View, TextInput, Alert } from "react-native";
import { Separator, Button, Dialog, PortalProvider } from "tamagui";

import PoppinsSemiBold from "~/components/Text/PoppinsSemibold";
import database, { taskCollection } from "~/database";
import { setName } from "~/functions/helper";

export default function Modal() {
  const [nickname, setNickname] = useState("");
  const [showNicknameDialog, setShowNicknameDialog] = useState(false);

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
      <PortalProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "hsl(0, 0%, 6%)",
            paddingHorizontal: 20,
            paddingTop: 40,
          }}>
          <Pressable
            onPress={() => setShowNicknameDialog(true)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 10%)",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            })}>
            <PoppinsSemiBold style={{ color: "white", fontSize: 18 }}>
              Change Nickname
            </PoppinsSemiBold>
          </Pressable>

          <Separator marginVertical={10} />

          <Pressable
            onPress={handleTaskNuke}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "hsl(0, 70%, 35%)" : "hsl(0, 70%, 40%)",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            })}>
            <PoppinsSemiBold style={{ color: "white", fontSize: 18, textAlign: "center" }}>
              Nuke all tasks!
            </PoppinsSemiBold>
          </Pressable>

          <Separator marginVertical={10} />

          <Pressable
            onPress={handleStatNuke}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "hsl(0, 70%, 35%)" : "hsl(0, 70%, 40%)",
              borderRadius: 10,
              padding: 15,
            })}>
            <PoppinsSemiBold style={{ color: "white", fontSize: 18, textAlign: "center" }}>
              Nuke all task statistics!
            </PoppinsSemiBold>
          </Pressable>

          <Dialog open={showNicknameDialog} onOpenChange={setShowNicknameDialog}>
            <Dialog.Portal>
              <Dialog.Overlay
                key="overlay"
                animation="quick"
                opacity={0.5}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
              <Dialog.Content
                padding="$8"
                bordered
                elevate
                key="content"
                animateOnly={["transform", "opacity"]}
                animation={[
                  "quick",
                  {
                    opacity: {
                      overshootClamping: true,
                    },
                  },
                ]}
                enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                gap="$4">
                <Dialog.Description>Enter your new nickname below:</Dialog.Description>
                <TextInput
                  value={nickname}
                  onChangeText={setNickname}
                  style={{
                    borderWidth: 1,
                    borderColor: "hsl(0, 0%, 80%)",
                    borderRadius: 5,
                    padding: 10,
                    marginVertical: 10,
                    color: "white",
                  }}
                />
                <Dialog.Close asChild>
                  <Button
                    disabled={nickname.length < 3}
                    onPress={async () => {
                      setName(nickname).then(() => {
                        setNickname("");
                      });
                      setShowNicknameDialog(false);
                    }}
                    theme="active">
                    Save
                  </Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button position="absolute" top="$3" right="$3" size="$2" circular>
                    x
                  </Button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
        </View>
      </PortalProvider>
    </>
  );
}

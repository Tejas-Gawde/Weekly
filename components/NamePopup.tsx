import { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Animated, Pressable, TextInput } from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";
import PoppinsSemiBold from "./Text/PoppinsSemibold";

import { setName } from "~/functions/helper";

interface NamePopupProps {
  visible: boolean;
  onClose: () => void;
}

export default function NamePopup({ visible, onClose }: NamePopupProps) {
  const [nickname, setNickname] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  async function handleUpload() {
    setName(nickname).then(() => {
      setNickname("");
      onClose();
    });
  }

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalView, { opacity: fadeAnim }]}>
          <PoppinsSemiBold style={styles.modalText}>Change Nickname</PoppinsSemiBold>
          <TextInput
            onChangeText={setNickname}
            value={nickname}
            textContentType="nickname"
            placeholderTextColor="gray"
            placeholder="Required"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              android_ripple={{ color: "gray", borderless: false, foreground: true }}
              style={styles.closeButton}
              onPress={onClose}>
              <PoppinsRegular style={[styles.buttonText, { color: "white" }]}>Close</PoppinsRegular>
            </Pressable>
            <Pressable
              disabled={nickname.length < 3}
              android_ripple={{ color: "gray", borderless: false, foreground: true }}
              style={styles.changeButton}
              onPress={handleUpload}>
              <PoppinsRegular style={styles.buttonText}>Update</PoppinsRegular>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    marginHorizontal: 40,
    width: "90%",
    backgroundColor: "hsl(0, 0%, 8%)",
    borderRadius: 10,
    rowGap: 20,
    paddingVertical: 25,
    paddingHorizontal: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 0.6,
    borderColor: "hsl(0, 0%, 20%)",
  },
  closeButton: {
    borderWidth: 0.8,
    borderColor: "white",
    overflow: "hidden",
    width: "35%",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  changeButton: {
    overflow: "hidden",
    width: "35%",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "white",
    marginTop: 15,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: { color: "white", fontSize: 18 },
  input: {
    padding: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 30,
  },
});

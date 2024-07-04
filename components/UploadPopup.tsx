import { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Animated, Pressable } from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";

interface UploadPopupProps {
  visible: boolean;
  onClose: () => void;
  message: string;
  isEmptyMessage: boolean;
}

const UploadPopup = ({ visible, onClose, message, isEmptyMessage }: UploadPopupProps) => {
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

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalView, { opacity: fadeAnim }]}>
          <PoppinsRegular style={styles.modalText}>
            {isEmptyMessage
              ? "The message is empty. Please provide some content."
              : message || "Default message when not empty but no message provided."}
          </PoppinsRegular>
          <Pressable
            android_ripple={{ color: "gray", borderless: false, foreground: true }}
            style={styles.button}
            onPress={onClose}>
            <PoppinsRegular style={styles.buttonText}>Okay</PoppinsRegular>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 10,
  },
  modalView: {
    backgroundColor: "hsl(0, 0%, 8%)",
    borderRadius: 10,
    padding: 35,
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
  button: {
    overflow: "hidden",
    width: "30%",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
});

export default UploadPopup;

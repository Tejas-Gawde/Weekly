import { StatusBar } from "expo-status-bar";
import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";
import PoppinsSemiBold from "./Text/PoppinsSemibold";
import BouncyProgressBar from "./ui/Progress";

import { setName, storeData } from "~/functions/helper";

interface OnboardingProps {
  onComplete: () => void;
}

const { width } = Dimensions.get("window");
const HAS_LAUNCHED = "HAS_LAUNCHED";

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [progress, setProgress] = useState(50);
  const [currentSection, setCurrentSection] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNextSection = () => {
    if (currentSection === 0) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentSection(1);
        slideAnim.setValue(0);
        fadeAnim.setValue(1);
      });
      setProgress(100);
    } else {
      setName(inputValue).then(() => {
        setInputValue("");
        storeData(HAS_LAUNCHED, "true");
        onComplete();
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <BouncyProgressBar value={progress} />
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          },
        ]}>
        {currentSection === 0 ? (
          <View style={styles.section}>
            <PoppinsSemiBold style={styles.header1}>
              <Text style={{ color: "hsl(269, 100%, 84%)" }}>Manage</Text> all your{" "}
              <Text style={{ color: "hsl(269, 100%, 84%)" }}>Weekly</Text> tasks and take
              <Text style={{ color: "hsl(269, 100%, 84%)" }}> Control</Text> of your day.
            </PoppinsSemiBold>
          </View>
        ) : (
          <View style={styles.section}>
            <PoppinsSemiBold style={styles.header2}>
              Enter your <Text style={{ color: "hsl(269, 100%, 84%)" }}>nickname</Text>
            </PoppinsSemiBold>
            <TextInput
              textContentType="nickname"
              placeholderTextColor="gray"
              placeholder="Required"
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
        )}
      </Animated.View>
      <Pressable
        disabled={!!(currentSection === 1 && inputValue.length < 3)}
        android_ripple={{ color: "gray", borderless: false, foreground: true }}
        style={styles.button}
        onPress={handleNextSection}>
        <PoppinsRegular style={styles.buttonText}>
          {currentSection === 0 ? "Next" : "Finish"}
        </PoppinsRegular>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "hsl(0, 0%, 8%)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  section: {
    width: width - 40,
    justifyContent: "center",
  },
  header1: {
    color: "white",
    fontSize: 35,
    letterSpacing: 0.5,
    paddingRight: 30,
  },
  header2: {
    color: "white",
    fontSize: 25,
  },
  input: {
    fontSize: 18,
    height: 60,
    color: "white",
    backgroundColor: "hsl(0, 0%, 16%)",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  button: {
    overflow: "hidden",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Onboarding;

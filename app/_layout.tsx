import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState, lazy } from "react";
import { TamaguiProvider } from "tamagui";

import config from "../tamagui.config";

import { HeaderBack } from "~/components/ui/HeaderBack";
import { getItemsFor } from "~/functions/helper";

SplashScreen.preventAutoHideAsync();

const Onboarding = lazy(() => import("~/components/Onboarding"));

export const unstable_settings = {
  initialRouteName: "(tabs)",
};
const HAS_LAUNCHED = "HAS_LAUNCHED";

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const [hasLaunched, setHasLaunched] = useState(false);
  useEffect(() => {
    const getData = () => {
      const launched = getItemsFor(HAS_LAUNCHED);
      if (launched) {
        setHasLaunched(true);
      }
    };
    getData();
    SplashScreen.hideAsync();
  }, []);

  if (!loaded) return null;

  return (
    <>
      <TamaguiProvider config={config}>
        {hasLaunched ? (
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, contentStyle: { backgroundColor: "hsl(0, 0%, 6%)" } }}
            />
            <Stack.Screen
              name="modal"
              options={{
                contentStyle: { backgroundColor: "hsl(0, 0%, 6%)" },
                presentation: "modal",
                headerShadowVisible: false,
                headerTitle: "Settings",
                headerTitleStyle: { color: "white", fontFamily: "Poppins-Regular" },
                headerStyle: { backgroundColor: "hsl(0, 0%, 6%)" },
                headerLeft: () => <HeaderBack />,
              }}
            />
          </Stack>
        ) : (
          <Onboarding onComplete={() => setHasLaunched(true)} />
        )}
      </TamaguiProvider>
    </>
  );
}

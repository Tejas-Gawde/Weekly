import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';

import { HeaderBack } from '~/components/ui/HeaderBack';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, contentStyle: { backgroundColor: 'hsl(0, 0%, 6%)' } }}
        />
        <Stack.Screen
          name="modal"
          options={{
            contentStyle: { backgroundColor: 'hsl(0, 0%, 6%)' },
            presentation: 'modal',
            headerShadowVisible: false,
            headerTitle: 'Settings',
            headerTitleStyle: { color: 'white', fontFamily: 'Poppins_400Regular' },
            headerStyle: { backgroundColor: 'hsl(0, 0%, 6%)' },
            headerLeft: () => <HeaderBack />,
          }}
        />
      </Stack>
    </TamaguiProvider>
  );
}

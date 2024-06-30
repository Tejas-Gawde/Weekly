import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';
import { Separator } from 'tamagui';

import PoppinsSemiBold from '~/components/Text/PoppinsSemibold';

export default function Modal() {
  return (
    <>
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          backgroundColor: 'hsl(0, 0%, 6%)',
          paddingHorizontal: 10,
        }}>
        <Pressable>
          <PoppinsSemiBold style={{ color: 'white', fontSize: 20, padding: 10 }}>
            Change Nickname
          </PoppinsSemiBold>
        </Pressable>
        <Separator marginVertical={5} />
        <Pressable>
          <PoppinsSemiBold style={{ color: 'white', fontSize: 20, padding: 10 }}>
            Change UTC
          </PoppinsSemiBold>
        </Pressable>
      </View>
    </>
  );
}

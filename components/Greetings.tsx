import { View } from 'react-native';

import PoppinsRegular from './Text/PoppinsRegular';

export default function Greetings() {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
      <PoppinsRegular style={{ fontSize: 40, color: 'white' }}>Good Morning</PoppinsRegular>
    </View>
  );
}

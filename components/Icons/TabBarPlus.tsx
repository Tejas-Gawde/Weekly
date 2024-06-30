import Octicons from '@expo/vector-icons/Octicons';
import { StyleSheet, View } from 'react-native';

export const TabBarPlus = (props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: 'hsl(0, 0%, 18%)',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22.5,
      }}>
      <Octicons size={28} style={styles.tabBarIcon} {...props} />
    </View>
  );
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});

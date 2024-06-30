import { Link, Tabs, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { TabBarIcon } from '~/components/Icons/TabBarIcon';
import { TabBarPlus } from '~/components/Icons/TabBarPlus';
import { HeaderButton } from '~/components/ui/HeaderButton';

export default function TabLayout() {
  const pathname = usePathname();
  return (
    <>
      <StatusBar style={pathname === '/calendar' ? 'dark' : 'light'} />
      <Tabs
        sceneContainerStyle={{ backgroundColor: 'hsl(0, 0%, 6%)' }}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { display: 'none' },
          tabBarStyle: {
            backgroundColor: 'hsl(0, 0%, 16%)',
            height: 55,
            borderRadius: 20,
            position: 'absolute',
            bottom: 15,
            left: 20,
            right: 20,
            elevation: 0,
            borderTopWidth: 0,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerTitle: 'Tejas Gawde',
            headerShadowVisible: false,
            headerTitleStyle: { color: 'white', fontFamily: 'Poppins_400Regular', paddingLeft: 10 },
            headerStyle: { backgroundColor: 'hsl(0, 0%, 6%)', height: 90 },
            headerRight: () => (
              <Link href="/modal" asChild>
                <HeaderButton />
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            tabBarIcon: ({ color }) => <TabBarPlus name="plus" color={color} />,
            headerTitle: 'Add a Task',
            headerShadowVisible: false,
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'Poppins_400Regular',
              paddingLeft: 10,
              fontSize: 28,
            },
            headerStyle: { backgroundColor: 'hsl(0, 0%, 6%)', height: 90 },
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
            headerTitle: 'Weekly Calendar',
            headerShadowVisible: false,
            headerStyle: { height: 90 },
            headerTitleStyle: {
              color: 'black',
              fontFamily: 'Poppins_400Regular',
              paddingLeft: 10,
              fontSize: 26,
            },
          }}
        />
      </Tabs>
    </>
  );
}

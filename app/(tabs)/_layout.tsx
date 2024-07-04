import { Link, Tabs } from "expo-router";
import { useEffect, useState, lazy } from "react";

import { TabBarIcon } from "~/components/Icons/TabBarIcon";
import { TabBarPlus } from "~/components/Icons/TabBarPlus";
import { HeaderButton } from "~/components/ui/HeaderButton";
import EnhancedHeaderTitle from "~/components/ui/HeaderTitle";
import { getItemsFor, missedTasks } from "~/functions/helper";

const HAS_LAUNCHED = "HAS_LAUNCHED";

const Onboarding = lazy(() => import("~/components/Onboarding"));

export default function TabLayout() {
  const [hasLaunched, setHasLaunched] = useState(false);
  useEffect(() => {
    const getData = () => {
      const launched = getItemsFor(HAS_LAUNCHED);
      if (launched) {
        setHasLaunched(true);
      }
    };
    getData();
  }, []);
  missedTasks();
  return (
    <>
      {!hasLaunched ? (
        <Onboarding onComplete={() => setHasLaunched(true)} />
      ) : (
        <Tabs
          sceneContainerStyle={{ backgroundColor: "hsl(0, 0%, 6%)" }}
          screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: "white",
            tabBarLabelStyle: { display: "none" },
            tabBarStyle: {
              backgroundColor: "hsl(0, 0%, 16%)",
              height: 55,
              borderRadius: 20,
              position: "absolute",
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
              headerTitle: () => <EnhancedHeaderTitle />,
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "white",
                fontFamily: "Poppins_400Regular",
                paddingLeft: 10,
              },
              headerStyle: { backgroundColor: "hsl(0, 0%, 6%)", height: 90 },
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
              headerTitle: "Add a Task",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "white",
                fontFamily: "Poppins_400Regular",
                paddingLeft: 10,
                fontSize: 28,
              },
              headerStyle: { backgroundColor: "hsl(0, 0%, 6%)", height: 90 },
            }}
          />
          <Tabs.Screen
            name="calendar"
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
              headerTitle: "Weekly Calendar",
              headerShadowVisible: false,
              headerStyle: { height: 90 },
              headerTitleStyle: {
                color: "black",
                fontFamily: "Poppins_400Regular",
                paddingLeft: 10,
                fontSize: 26,
              },
            }}
          />
        </Tabs>
      )}
    </>
  );
}

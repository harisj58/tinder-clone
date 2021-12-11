import React from "react";
import useAuth from "./hooks/useAuth";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "./screens/AboutScreen";
import StackNavigator from "./StackNavigator";
import { DrawerContent } from "./screens/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { user } = useAuth();
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {user ? (
        <>
          <Drawer.Screen name="DrawerHome" component={StackNavigator} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </>
      ) : (
        <Drawer.Screen
          name="DrawerHome"
          component={StackNavigator}
          options={{ swipeEnabled: false }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import DrawerNavigator from "./DrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component */}
      <AuthProvider>
        {/* Passes down the cool auth stuff to children... */}
        <DrawerNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

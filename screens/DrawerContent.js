import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { NavigationRouteContext, useNavigation } from "@react-navigation/core";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useAuth from "../hooks/useAuth";

export function DrawerContent(props) {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <Drawer.Section>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: user?.photoURL,
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>{user?.displayName}</Title>
                  <Caption style={styles.caption}>{user?.email}</Caption>
                </View>
              </View>

              <View style={[styles.row, { paddingBottom: 10 }]}>
                <View style={styles.section}>
                  <Caption style={styles.caption}>Happy Swiping!</Caption>
                </View>
              </View>
            </View>
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Icon name="home-outline" color="#FF5864" size={25} />
              )}
              label="Home"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="account-outline" color="#FF5864" size={25} />
              )}
              label="Update Profile"
              onPress={() => {
                navigation.navigate("Modal");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="information-outline" color="#FF5864" size={25} />
              )}
              label="About"
              onPress={() => {
                navigation.navigate("About");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Icon name="exit-to-app" color="#FF5864" size={25} />}
          label="Sign Out"
          onPress={() => {
            props.navigation.toggleDrawer();
            logout();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 0,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-rn";
import Header from "../components/Header";

const AboutScreen = () => {
  return (
    <View>
      <Header title="About" />
      <View style={tw("items-center pt-10")}>
        <Image
          style={tw("h-20 w-full")}
          resizeMode="contain"
          source={require("../assets/logoWithText.png")}
        />
      </View>
      <View style={tw("items-center pt-20")}>
        <Text style={tw("text-xl")}>A clone by:</Text>
        <Text style={tw("text-3xl")}>Haris Javed</Text>
      </View>
      <View style={tw("items-center pt-20")}>
        <Text style={tw("text-xl")}>© 2021. All Rights Reserved.</Text>
      </View>
      <View style={tw("items-center pt-20")}>
        <Text style={tw("text-xl")}>v2.0.0</Text>
      </View>
    </View>
  );
};

export default AboutScreen;

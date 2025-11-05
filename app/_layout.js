// app/_layout.js
import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header />
      <View className="flex-1">
        <Slot />
      </View>
      <View className="bg-blue-600 h-12 w-full" />
    </SafeAreaView>
  );
}

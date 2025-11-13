import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { initDB } from "../database/db";
import { useNotifications } from "../utils/notifications";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
    "expo-notifications: Android Push notifications (remote notifications)",
  ]);

export default function Layout() {
  const insets = useSafeAreaInsets();
  useNotifications();
  
  useEffect(() => {
    initDB();
    NavigationBar.setButtonStyleAsync("light");
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
        <Header />
      <View style={{ flex: 1 /* altura del header */ }}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}
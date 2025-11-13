// app/_layout.js
import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";
import { initDB } from "../database/db";

export default function Layout() {
  const insets = useSafeAreaInsets(); // 🔹 márgenes seguros (top, bottom, etc.)

  useEffect(() => {
    initDB();
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View
        style={{
          position: "absolute",
          top: insets.top,    
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <Header />
      </View>
      <View style={{ flex: 1, paddingTop: insets.top + 10 /* altura del header */ }}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

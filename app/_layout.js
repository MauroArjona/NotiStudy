// app/_layout.js
import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";
import { initDB } from "../database/db";

export default function Layout() {
  useEffect(() => {
    initDB(); // Se ejecuta una vez al iniciar la app
    
    NavigationBar.setButtonStyleAsync('light'); // botones blancos
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header />
      <View className="flex-1">
        <Slot />
      </View>
    </SafeAreaView>
  );
}

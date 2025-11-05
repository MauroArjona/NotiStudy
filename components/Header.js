import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <SafeAreaView className="bg-blue-600">
      <View className="px-4 py-3 flex-row justify-between items-center">
        <View className="flex-row items-center">
          {/* left avatar / status circle */}
          <View className="w-9 h-9 bg-black rounded-full mr-3" />
          <Text className="text-white text-3xl font-bold">MiUni</Text>
        </View>

        {/* notification button inside white circle */}
        <TouchableOpacity className="bg-white p-2 rounded-full">
          <Ionicons name="notifications-outline" size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

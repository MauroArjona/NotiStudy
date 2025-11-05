import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View className="bg-blue-600 pt-4 pb-4 px-4 flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Text className="text-white text-3xl font-bold">MiUni</Text>
      </View>

      <TouchableOpacity className="bg-white p-2 rounded-full">
        <Ionicons name="notifications-outline" size={20} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );
}

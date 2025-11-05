import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNav() {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white py-2 pt-4 rounded-t-3xl shadow-lg">
      <View className="flex-row justify-around items-start">
        <TouchableOpacity className="items-center mx-2">
          <View className="w-14 h-14 rounded-full border border-blue-500 justify-center items-center bg-white mb-3">
            <Ionicons name="calendar" size={22} color="#2563eb" />
          </View>
          <Text className="text-blue-600 text-xs leading-tight text-center">
            Calendario{'\n'}de{'\n'}actividades
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center mx-2">
          <View className="w-14 h-14 rounded-full border border-blue-500 justify-center items-center bg-white mb-3">
            <Ionicons name="book" size={22} color="#2563eb" />
          </View>
          <Text className="text-blue-600 text-xs leading-tight text-center">
            Materias
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center mx-2">
          <View className="w-14 h-14 rounded-full border border-blue-500 justify-center items-center bg-white mb-3">
            <Ionicons name="timer-outline" size={22} color="#2563eb" />
          </View>
          <Text className="text-blue-600 text-xs leading-tight text-center">
            Recordatorios
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

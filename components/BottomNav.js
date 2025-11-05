import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNav() {
  return (
    <View className="bg-white p-6 rounded-2xl shadow-lg">
      <View className="flex-row justify-around items-center">
        <TouchableOpacity className="items-center">
          <View className="w-14 h-14 rounded-full border border-blue-500 justify-center items-center bg-white">
            <Ionicons name="calendar" size={22} color="#2563eb" />
          </View>
          <Text className="text-blue-600 text-sm mt-2 text-center">Calendario de actividades</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="w-14 h-14 rounded-full border border-blue-500 justify-center items-center bg-white">
            <Ionicons name="book" size={22} color="#2563eb" />
          </View>
          <Text className="text-blue-600 text-sm mt-2 text-center">Materias</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="w-14 h-14 rounded-full border border-blue-500 justify-center items-center bg-white">
            <Ionicons name="notifications" size={22} color="#2563eb" />
          </View>
          <Text className="text-blue-600 text-sm mt-2 text-center">Recordatorios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

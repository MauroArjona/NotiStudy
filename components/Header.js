import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();

  return (
    <View className="bg-blue-600 pt-4 pb-4 px-4 flex-row justify-between items-center">
      <View className="flex-row items-center">
        {/* 🔹 "MiUni" ahora es un botón que lleva al index */}
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text className="text-white text-3xl font-bold">MiUni</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-white p-2 rounded-full">
        <Ionicons name="notifications-outline" size={20} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );
}

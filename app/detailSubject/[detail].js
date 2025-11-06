import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function MateriaDetail() {
  const { detail } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        <View className="flex-row justify-between mb-2 px-7 mt-[-18]">
          <Text className="text-lg font-semibold mb-2">{detail}</Text>
        </View>

        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 🔹 Horarios */}
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="font-semibold mb-1">Horarios</Text>
            <View className="border-t border-gray-200 my-2" />
            <View className="space-y-2">
              <Text>Lunes — 19:00 - 21:00 — Aula 110</Text>
              <View className="border-t border-gray-100" />
              <Text>Martes — 19:00 - 21:00 — Virtual</Text>
              <View className="border-t border-gray-100" />
              <Text>Viernes — 16:00 - 18:00 — Lab. Ardenghi</Text>
            </View>
          </View>

          {/* 🔹 Actividades pendientes */}
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="font-semibold mb-1">Actividades pendientes</Text>
            <View className="border-t border-gray-200 my-2" />
            <View className="space-y-2">
              <Text>2do. Parcial SETR — 14/11/25 — 16:00hs — Lab. Ardenghi</Text>
              <View className="border-t border-gray-100" />
              <Text>Entrega TP4 - SETR — 14/11/25 — 23:59hs</Text>
            </View>
          </View>

          {/* 🔹 Actividades anteriores */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="font-semibold mb-1">Actividades anteriores</Text>
            <View className="border-t border-gray-200 my-2" />
            <View className="space-y-2">
              <Text>1er. Parcial SETR — 03/10/25</Text>
              <View className="border-t border-gray-100" />
              <Text>Entrega TP2 - SETR — 28/08/25</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

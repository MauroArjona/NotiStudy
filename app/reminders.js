import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Switch } from "react-native";
import Card from "../components/Card";
import { useState } from "react";

export default function Recordatorios() {
  // Estado para los switches
  const [recordatorios, setRecordatorios] = useState({
    tp4: true,
    tp3: false,
    parcial: true,
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="text-2xl font-bold mb-4 px-4 mt-[-18]">Mis recordatorios</Text>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- TP4 --- */}
        <Card>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-semibold">Tarea: Entregar TP4</Text>
            <Switch
              value={recordatorios.tp4}
              onValueChange={(value) =>
                setRecordatorios((prev) => ({ ...prev, tp4: value }))
              }
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={recordatorios.tp4 ? "#2563eb" : "#f4f3f4"}
            />
          </View>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600 mb-1">Materia: Taller de Nuevas Tecnologías</Text>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600 mb-1">Notificar: 1 día antes - 08:00</Text>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600">Fecha de entrega: 05/11/2025</Text>
        </Card>

        {/* --- TP3 --- */}
        <Card>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-semibold">Tarea: Entregar TP3</Text>
            <Switch
              value={recordatorios.tp3}
              onValueChange={(value) =>
                setRecordatorios((prev) => ({ ...prev, tp3: value }))
              }
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={recordatorios.tp3 ? "#2563eb" : "#f4f3f4"}
            />
          </View>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600 mb-1">
            Materia: Sistemas Embebidos y de Tiempo Real
          </Text>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600 mb-1">Notificar: 1 día antes - 13:00</Text>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600">Fecha de entrega: 07/11/2025</Text>
        </Card>

        {/* --- Segundo Parcial --- */}
        <Card>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-semibold">Examen: Segundo Parcial</Text>
            <Switch
              value={recordatorios.parcial}
              onValueChange={(value) =>
                setRecordatorios((prev) => ({ ...prev, parcial: value }))
              }
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={recordatorios.parcial ? "#2563eb" : "#f4f3f4"}
            />
          </View>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600 mb-1">
            Materia: Sistemas Embebidos y de Tiempo Real
          </Text>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600 mb-1">Notificar: 3 días antes - 08:00</Text>

          <View className="border-t border-gray-200 my-1" />
          <Text className="text-gray-600">Fecha de examen: 17/11/2025</Text>
        </Card>
      </ScrollView>
        <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

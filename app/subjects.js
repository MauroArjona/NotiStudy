import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";

export default function MisMaterias() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* 🔹 Encabezado con botón "+" */}
      <View className="flex-row items-center justify-between px-4 mt-[-18] mb-4">
        <Text className="text-2xl font-bold">Mis materias</Text>
        <TouchableOpacity
          className="bg-blue-600 p-2 rounded-full"
          onPress={() => console.log("Agregar materia")}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Lista de materias */}
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* En curso */}
        <Text className="text-lg font-semibold mb-2">En curso</Text>
        <Card>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Sistemas embebidos y de tiempo real</Text>
            <Text className="text-blue-500">En curso</Text>
          </View>
        </Card>

        <Card>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Taller de nuevas tecnologías</Text>
            <Text className="text-blue-500">En curso</Text>
          </View>
        </Card>

        <Card>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Desarrollo de aplicaciones móviles</Text>
            <Text className="text-blue-500">En curso</Text>
          </View>
        </Card>

        {/* Regularizadas */}
        <Text className="text-lg font-semibold mt-6 mb-2">Regularizadas</Text>
        <Card>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Inteligencia Artificial</Text>
            <Text className="text-green-600">Regularizada</Text>
          </View>
        </Card>

        <Card>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Ingeniería de Software</Text>
            <Text className="text-green-600">Regularizada</Text>
          </View>
        </Card>

        <Card>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Complementos Matemáticos</Text>
            <Text className="text-green-600">Regularizada</Text>
          </View>
        </Card>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

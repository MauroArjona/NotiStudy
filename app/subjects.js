import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { getMateriasEnCurso } from "../database/materias"; 

export default function MisMaterias() {
  const [materias, setMaterias] = useState([]);
  
  useEffect(() => {
    cargarMaterias();
  }, []);

  // Obtiene los datos de la BD
  const cargarMaterias = () => {
    try {
      const data = getMateriasEnCurso(); // devuelve directamente un array
      console.log("Materias en curso:", data);
      setMaterias(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    }
  };

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
      <View
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* En curso */}
        <Text className="text-lg font-semibold mb-2">En curso</Text>

        <FlatList
        data={materias}
        keyExtractor={ (item) => item.idMateria.toString()}
        renderItem={ ({ item }) => (
          <View>
            <Card>
              <View className="flex-row justify-between">
                <Text className="font-semibold">{item.nombre}</Text>
                <Text className="text-blue-500">{item.estado}</Text>
              </View>
            </Card>
          </View>
        )}
        />

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
      </View>
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

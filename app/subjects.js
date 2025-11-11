import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { getMaterias } from "../database/materias"; 

export default function MisMaterias() {
  // Obtiene los datos de la BD
  const [materiasEnCurso, setMateriasEnCurso] = useState([]);
  const [materiasRegulares, setMateriasRegulares] = useState([]);
  
  useEffect(() => {
    cargarMateriasEnCurso();
    cargarMateriasRegulares();
  }, []);

  const cargarMateriasEnCurso = () => {
    try {
      const data = getMaterias('En Curso'); // devuelve directamente un array
      console.log("Materias en curso:", data);
      setMateriasEnCurso(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    }
  };

  const cargarMateriasRegulares = () => {
    try {
      const data = getMaterias('Regularizada'); // devuelve directamente un array
      console.log("Materias en curso:", data);
      setMateriasRegulares(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* 🔹 Encabezado con botón "+" */}
    <View className="flex-1 px-5">
      <View className="flex-row items-center justify-between px-4 mt-[-18] mb-4">
        <Text className="text-2xl font-bold">Mis materias</Text>
        <TouchableOpacity
          className="bg-blue-600 p-2 rounded-full"
          onPress={() => console.log("Agregar materia")}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

        {/* 🔹 En curso */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            En curso
          </Text>
          <FlatList
            data={materiasEnCurso}
            keyExtractor={(item) => item.idMateria.toString()}
            renderItem={({ item }) => (
              <View key={item.idMateria} className="flex-row justify-between items-start border-b border-gray-200 last:border-0 py-2">
                <Text className="flex-1 font-medium text-gray-900 pr-3" numberOfLines={2} ellipsizeMode="tail">
                  {item.nombre}</Text>
                <Text className="text-blue-600 text-sm">Ver más</Text>
              </View>
            )}
          />
        </View>

        {/* 🔹 Regularizadas */}
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            Regularizadas
          </Text>
          <FlatList
            data={materiasRegulares}
            keyExtractor={(item) => item.idMateria.toString()}
            renderItem={({ item }) => (
              <View key={item.idMateria} className="flex-row justify-between items-start border-b border-gray-200 last:border-0 py-2">
                <Text className="flex-1 font-medium text-gray-900 pr-3" numberOfLines={2} ellipsizeMode="tail">
                  {item.nombre}</Text>
                <Text className="text-blue-600 text-sm">Ver más</Text>
              </View>
            )}
          />
        </View>
      </View>
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

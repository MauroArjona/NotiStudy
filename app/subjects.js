import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getMaterias } from "../database/materias"; 

export default function MisMaterias() {
  const [materiasEnCurso, setMateriasEnCurso] = useState([]);
  const [materiasRegulares, setMateriasRegulares] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    cargarMateriasEnCurso();
    cargarMateriasRegulares();
  }, []);

  const cargarMateriasEnCurso = () => {
    try {
      const data = getMaterias('En Curso');
      setMateriasEnCurso(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    }
  };

  const cargarMateriasRegulares = () => {
    try {
      const data = getMaterias('Regularizada');
      setMateriasRegulares(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    }
  };

  // 🔹 Función reutilizable para renderizar materias
  const renderMateria = (item) => (
    <View
      key={item.idMateria}
      className="flex-row justify-between items-start border-b border-gray-200 last:border-0 py-2"
    >
      <Text
        className="flex-1 font-medium text-gray-900 pr-3"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.nombre}
      </Text>

      {/* 🔹 Botón Ver más */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/detailSubject/[detail]",
            params: { detail: item.nombre },
          })
        }
      >
        <Text className="text-blue-600 text-sm">Ver más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-5">
        {/* Encabezado */}
        <View className="flex-row items-center justify-between px-1 mb-6">
          <Text className="text-2xl font-bold">Mis materias</Text>
          <TouchableOpacity
            className="bg-blue-600 p-2 rounded-full"
            onPress={() => router.push("/addSubject")}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* En curso */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            En curso
          </Text>
          <FlatList
            data={materiasEnCurso}
            keyExtractor={(item) => item.idMateria.toString()}
            renderItem={({ item }) => renderMateria(item)}
          />
        </View>

        {/* Regularizadas */}
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            Regularizadas
          </Text>
          <FlatList
            data={materiasRegulares}
            keyExtractor={(item) => item.idMateria.toString()}
            renderItem={({ item }) => renderMateria(item)}
          />
        </View>
      </View>

      {/* Barra inferior */}
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

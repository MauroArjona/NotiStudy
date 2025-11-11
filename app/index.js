import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import Card from "../components/Card";
import BottomNav from "../components/BottomNav";
import { getClasesHoy } from "../database/clases"; 
import { useEffect, useState } from "react";
import { getFechaActual } from "../utils/formatDate";

export default function HomeScreen() {
  const router = useRouter();

  const [clasesHoy, setClasesHoy] = useState([]);
    
  useEffect(() => {
    cargarClasesHoy();
  }, []);
  
  const cargarClasesHoy = () => {
    try {
      const data = getClasesHoy(); // devuelve directamente un array
      console.log("Clases hoy:", data);
      setClasesHoy(data);
    } catch (error) {
      console.error("Error cargando clases del día:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        <View className="flex-row justify-between mb-2 px-4 mt-[-18] items-end">
          <Text className="text-xl font-semibold">Actividades</Text>
          <Text className="text-gray-500">{getFechaActual()}</Text>
        </View>

        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          {/* 🔹 Mis clases */}
          <Card title="Mis clases">
            <View className="border-t border-gray-200 my-2" />

            {/* 🔸 Materia 1 */}
          
          <FlatList
            data={clasesHoy}
            keyExtractor={(item) => item.idClase.toString()}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-start mb-2 border-b border-gray-100 my-1 pb-3">
                <TouchableOpacity
                  className="flex-1"
                  onPress={() =>
                    router.push({
                      pathname: "/detailSubject/[detail]",
                      params: { detail: "{item.nombre}" },
                    })
                  }
                >
                  <Text className="font-semibold">{item.nombre}</Text>
                </TouchableOpacity>

                <View className="items-end">
                  <Text className="text-gray-700">{item.horarioInicio} - {item.horarioFin}</Text>
                  <Text className="text-gray-500">{item.aula}</Text>
                </View>
              </View>
            )}
          />

            
          </Card>

          {/* 🔹 Entregas próximas */}
          <Card title="Entrega próxima">
            <View className="border-t border-gray-200 my-2" />
            <Text className="font-semibold">TP4 - TNT</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>

          <Card title="Entrega próxima">
            <View className="border-t border-gray-200 my-2" />
            <Text className="font-semibold">TP5 - Redes</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>

          <Card title="Entrega próxima">
            <View className="border-t border-gray-200 my-2" />
            <Text className="font-semibold">Exposición - Cloud Computing</Text>
            <Text className="text-gray-500">18:00hs</Text>
          </Card>
        </ScrollView>
      </View>

      {/* Barra inferior */}
      <View className="absolute bottom-12 left-0 right-0">
        <BottomNav />
      </View>
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

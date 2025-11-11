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

  const data = [
    { tipo: "clases" },
   // { tipo: "actividades" },
    { tipo: "actividades", titulo: "TP4 - TNT", hora: "23:59hs" },
    { tipo: "actividades", titulo: "Exposición - Cloud Computing", hora: "18:00hs" },
  ];

  return (
     <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        {/* Encabezado */}
        <View className="flex-row items-center justify-between mb-5 px-4 mt-[-15] items-end">
          <Text className="text-2xl font-bold leading-6">Actividades</Text>
          <Text className="text-gray-500 leading-6">{getFechaActual()}</Text>
        </View>

        {/* FlatList principal */}
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 16 }}
          renderItem={({ item }) => {
            if (item.tipo === "clases") {
              return (
                <Card title="Mis clases">
                  <View className="border-t border-gray-200 my-2" />
                  {clasesHoy.length > 0 ? (
                    clasesHoy.map((c) => (
                      <View
                        key={c.idClase}
                        className="flex-row justify-between items-start mb-2 border-b border-gray-100 my-1 pb-3"
                      >
                        <View className="flex-1">
                          <Text className="font-semibold">{c.nombre}</Text>
                        </View>
                        <View className="items-end">
                          <Text className="text-gray-700">
                            {c.horarioInicio} - {c.horarioFin}
                          </Text>
                          <Text className="text-gray-500">{c.aula}</Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text className="text-gray-500 text-center py-3">
                      No hay clases hoy
                    </Text>
                  )}
                </Card>
              );
            } else if (item.tipo === "actividades") {
              return (
                <Card title="Actividades Pendientes">
                  <View className="border-t border-gray-200 my-2" />
                  <Text className="font-semibold">{item.titulo}</Text>
                  <Text className="text-gray-500">{item.hora}</Text>
                </Card>
              );
            }
            return null;
          }}
        />
      </View>

      {/* Barra inferior */}
      <View className="absolute bottom-12 left-0 right-0">
        <BottomNav />
      </View>
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

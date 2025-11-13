import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import Card from "../components/Card";
import BottomNav from "../components/BottomNav";
import { getClasesHoy } from "../database/clases"; 
import { useEffect, useState } from "react";
import { getStringFechaActual } from "../utils/formatDate";
import { getActividadesHoy } from "../database/actividades";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const [clasesHoy, setClasesHoy] = useState([]);
  const [actividadesHoy, setActividades] = useState([]);
    
  useEffect(() => {
    cargarClasesHoy();
    cargarActiviadesHoy();
  }, []);
  
  const cargarClasesHoy = () => {
    try {
      const data = getClasesHoy();
      //console.log("Clases hoy:", data);
      setClasesHoy(data);
    } catch (error) {
      console.error("Error cargando clases del día:", error);
    }
  };

  const cargarActiviadesHoy = () => {
    try {
      const data = getActividadesHoy(); 
      console.log("Actividades del día:", data);
      setActividades(data);
    } catch (error) {
      console.error("Error cargando las actividades del día:", error);
    }
  };

  const data = [
    { tipo: "clases" },
    { tipo: "actividades" },
  ];

  return (
     <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        {/* Encabezado */}
        <View className="flex-row justify-between mb-6 px-4 items-end">
          <Text className="text-xl font-semibold">Actividades</Text>
          <Text className="text-gray-500">{getStringFechaActual()}</Text>
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
                    { actividadesHoy.length > 0 ? (
                      actividadesHoy.map((a) => (
                      <View key={a.idActividad} className="flex-row justify-between items-start mb-2 border-b border-gray-100 my-1 pb-3">
                          <View className="flex-1">
                            <Text className="font-semibold">{a.descripcionActividad}</Text>
                            <Text className="text-gray-500">{a.horario} {a.aula ? ` - ${a.aula}` : ""}</Text>
                          </View>
                          <View style={{ maxWidth: "50%" }} className="items-end">
                            <Text className="font-semibold text-right text-gray-800" numberOfLines={2} ellipsizeMode="tail">
                              {a.nombre}</Text>
                          </View>
                      </View>
                    ))
                  ) : (
                    <Text className="text-gray-500 text-center py-3">
                      No hay actividades para hoy
                    </Text>
                  )}
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

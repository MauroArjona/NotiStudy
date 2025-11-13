import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function MateriaDetail() {
  const { detail } = useLocalSearchParams();
  const [actividades, setActividades] = useState([]);
  const [clases, setClases] = useState([]);
  const [comentario, setComentario] = useState(null);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    cargarActividades();
    cargarClases();
    cargarEstado();
  }, []);

  const cargarActividades = () => {
    try {
      const actividades = getActividadesFiltradas(detail); 
      console.log("Actividades de la materia:", actividades);
      setActividades(actividades);
    } catch (error) {
      console.error("Error cargando las actividades de la materia:", error);
    }
  };
  const cargarClases = () => {
    try {
      const clases = getClasesMateria(detail); 
      console.log("Clases de la materia:", clases);
      setClases(clases);
    } catch (error) {
      console.error("Error cargando las actividades de la materia:", error);
    }
  };

  const cargarEstado = () => {
    try {
      const data = getEstadoMateria(detail);
      setEstado(data);
    } catch (error) {
      console.error("Error al cargar estado:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        <View className="flex-row justify-between mb-2 px-7 mt-[-25] items-end">
          <Text className="text-lg font-semibold mb-2 flex-[0.75]" numberOfLines={3}>{detail}</Text>
          <Text className="text-sm text-right mb-2 flex-[0.25]">{estado}</Text>
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
          {clases.length > 0 ? (
            clases.map((clase, index) => (
              <View key={clase.idClase} className="py-2 border-b border-gray-100">
                <Text className="text-gray-700">
                  {clase.dia} — {clase.horarioInicio} - {clase.horarioFin}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {clase.tipo} • {clase.aula}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">Sin clases registradas</Text>
          )}
        </View>

        {comentario && (
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="font-semibold mb-1">Horarios de clase</Text>
            <View className="border-t border-gray-200 my-2" />
            {clases.length > 0 ? (
              clases.map((c) => (
                <View key={c.idClase}
                  className="flex-row justify-between items-start mb-2 border-b border-gray-100 my-1 pb-3">
                  <View className="flex-1">
                    <Text className="font-semibold">{c.dia}</Text>
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
              <Text className="text-gray-500 text-center py-3">No hay clases registradas</Text>
            )}
          </View>
        )}


          {/* 🔹 Actividades pendientes */}
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="font-semibold mb-1">Actividades pendientes</Text>
            <View className="border-t border-gray-200 my-2" />
              { actividades.length > 0 ? (
                actividades.map((a) => (
                <View key={a.idActividad} className="flex-row justify-between items-start mb-2 border-b border-gray-100 my-1 pb-3">
                    <View className="flex-1">
                      <Text className="font-semibold">{a.descripcionActividad}</Text>
                      <Text className="text-gray-500">{a.horario} {a.aula ? ` - ${a.aula}` : ""}</Text>
                    </View>
                    <View style={{ maxWidth: "50%" }} className="items-end">
                      <Text className="font-semibold text-right text-gray-800" numberOfLines={2} ellipsizeMode="tail">
                        {a.fecha}</Text>
                    </View>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center py-3">
                No hay actividades para hoy
              </Text>
            )}
           </View>

        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

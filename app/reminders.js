import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { getRecordatoriosProximos, actualizarEstadoRecordatorio } from "../database/recordatorios";

export default function Recordatorios() {
  const [recordatorios, setRecordatorios] = useState([]);

  useEffect(() => {
    const data = getRecordatoriosProximos();
    setRecordatorios(data);
  }, []);

  const toggleRecordatorio = (idRecordatorio, nuevoValor) => {
    actualizarEstadoRecordatorio(idRecordatorio, nuevoValor ? 1 : 0);
    setRecordatorios((prev) =>
      prev.map((r) =>
        r.idRecordatorio === idRecordatorio ? { ...r, activo: nuevoValor ? 1 : 0 } : r
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="text-2xl font-bold mb-4 px-4 mt-[-30]">Mis recordatorios</Text>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {recordatorios.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">No hay recordatorios aún 📅</Text>
        ) : (
          recordatorios.map((rec) => (
            <Card key={rec.idRecordatorio}>
              {/* Título + switch */}
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base font-semibold">
                  {rec.descripcionActividad || "Actividad sin descripción"}
                </Text>
                <Switch
                  value={rec.activo === 1}
                  onValueChange={(value) => toggleRecordatorio(rec.idRecordatorio, value)}
                  trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
                  thumbColor={rec.activo ? "#2563eb" : "#f4f3f4"}
                />
              </View>

              {/* Materia */}
              <View className="border-t border-gray-200 my-1" />
              <Text className="text-gray-600 mb-1">
                Materia: {rec.materia || "Sin materia"}
              </Text>

              {/* Fecha aviso */}
              <View className="border-t border-gray-200 my-1" />
              <Text className="text-gray-600 mb-1">
                Notificar: {rec.fechaAviso} - {rec.horaAviso}
              </Text>

              {/* Fecha de la actividad */}
              <View className="border-t border-gray-200 my-1" />
              <Text className="text-gray-600">
                Fecha de vencimiento: {rec.fechaActividad || "Sin fecha"}
              </Text>
            </Card>
          ))
        )}
      </ScrollView>

      {/* Barra inferior */}
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

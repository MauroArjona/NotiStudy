import {View,Text,ScrollView,Switch,TouchableOpacity,Alert,} from "react-native";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import {getRecordatoriosProximos,actualizarEstadoRecordatorio,eliminarRecordatorio,} from "../database/recordatorios";
import { Trash2 } from "lucide-react-native";
import SuccessModal from "../components/SuccessModal";
import { formatearFechaISO } from "../utils/formatDate";

export default function Recordatorios() {
  const [recordatorios, setRecordatorios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

  useEffect(() => {
    const data = getRecordatoriosProximos();
    setRecordatorios(data);
  }, []);

  const toggleRecordatorio = (idRecordatorio, nuevoValor) => {
    actualizarEstadoRecordatorio(idRecordatorio, nuevoValor ? 1 : 0);
    setRecordatorios((prev) =>
      prev.map((r) =>
        r.idRecordatorio === idRecordatorio
          ? { ...r, activo: nuevoValor ? 1 : 0 }
          : r
      )
    );
  };

  const confirmarEliminacion = (idRecordatorio) => {
    Alert.alert(
      "Eliminar recordatorio",
      "¿Seguro que querés eliminar este recordatorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await eliminarRecordatorio(idRecordatorio);
            setRecordatorios((prev) =>
              prev.filter((r) => r.idRecordatorio !== idRecordatorio)
            );

            // Mostrar modal de confirmación
            setModalMensaje("🗑️ Recordatorio eliminado correctamente");
            setModalVisible(true);
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-2xl font-bold mb-4 px-4">
        Mis recordatorios
      </Text>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {recordatorios.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">
            No hay recordatorios aún 📅
          </Text>
        ) : (
          recordatorios.map((rec) => (
            <Card key={rec.idRecordatorio}>
              {/* Encabezado: texto + botones */}
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base font-semibold flex-1">
                  {rec.descripcionActividad || "Actividad sin descripción"}
                </Text>

                <TouchableOpacity
                  onPress={() => confirmarEliminacion(rec.idRecordatorio)}
                  className="mr-3"
                >
                  <Trash2 size={22} color="#ef4444" />
                </TouchableOpacity>

                <Switch
                  value={rec.activo === 1}
                  onValueChange={(value) =>
                    toggleRecordatorio(rec.idRecordatorio, value)
                  }
                  trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
                  thumbColor={rec.activo ? "#2563eb" : "#f4f3f4"}
                />
              </View>

              {/* Materia */}
              <View className="border-t border-gray-200 my-1" />
              <Text className="text-gray-600 mb-1">
                {rec.materia || "Sin materia"}
              </Text>

              {/* Fecha aviso */}
              <View className="border-t border-gray-200 my-1" />
              <Text className="text-gray-600 mb-1">
                Notificar: { formatearFechaISO(rec.fechaAviso) } - {rec.horaAviso}
              </Text>

              {/* Fecha de vencimiento */}
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

      {/* Modal personalizado */}
      <SuccessModal
        visible={modalVisible}
        mensaje={modalMensaje}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

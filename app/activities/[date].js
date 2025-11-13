import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getActividadesFiltradas } from "../../database/actividades";
import { getStringFecha } from "../../utils/formatDate";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { eliminarActividad } from "../../database/actividades";
import { obtenerRecordatorioPorActividad, eliminarRecordatorio } from "../../database/recordatorios";
import * as Notifications from "expo-notifications";
import SuccessModal from "../../components/SuccessModal"; // 🔹 importa el modal


export default function DayActivities() {
  const { date } = useLocalSearchParams();
  const router = useRouter();

  const fechaValida = date === "all" ? null : date;

  // 🔹 Estados para los inputs
  const [actividad, setActividad] = useState("");
  const [materia, setMateria] = useState("");
  const [fecha, setFecha] = useState(fechaValida);
  const [showPicker, setShowPicker] = useState(false);
  const [activities, setActividades] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");


  useEffect(() => {
    cargarActividades();
  }, [materia, fecha, actividad]);

  const cargarActividades = () => {
    try {
      const acts = getActividadesFiltradas(materia, fecha, actividad);
      console.log("Actividades:", acts);
      setActividades(acts);
    } catch (error) {
      console.error("Error cargando las actividades:", error);
    }
  };

  // 🔹 Función de búsqueda (simulada)
  const handleSearch = () => {
    Alert.alert(
      "Búsqueda",
      `Actividad: ${actividad || "—"}\nMateria: ${materia || "—"}\nFecha: ${
        fecha || "—"
      }`
    );
  };

  // 🔹 Swipe actions
  const handleEliminar = (idActividad) => {
    Alert.alert(
      "Confirmar",
      "¿Deseás eliminar esta actividad y su recordatorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // 1️⃣ Revisar recordatorio
              const rec = await obtenerRecordatorioPorActividad(idActividad);
              if (rec) {
                // Cancelar notificación
                await Notifications.cancelScheduledNotificationAsync(rec.idRecordatorio.toString());
                // Borrar recordatorio de la DB
                await eliminarRecordatorio(rec.idRecordatorio);
              }

              // 2️⃣ Borrar actividad de la DB
              await eliminarActividad(idActividad);

              // 3️⃣ Actualizar estado local para que desaparezca de la lista
              setActividades(prev => prev.filter(a => a.idActividad !== idActividad));
              setModalMensaje("Actividad y recordatorio eliminados correctamente.");
              setModalVisible(true);
              console.log("Actividad y recordatorio eliminados:", idActividad);
            } catch (error) {
              console.error("Error al eliminar actividad y recordatorio:", error);
              Alert.alert("Error", "No se pudo eliminar la actividad");
            }
          },
        },
      ]
    );
  };

  const renderRightActions = (actividad) => {
    return (
      <View className="flex-row">
        <RectButton
          onPress={() =>
            router.push({
              pathname: "../editActivities",
              params: { idActividad: actividad.idActividad },
            })
          }
          className="bg-blue-500 justify-center items-center w-16"
        >
          <Ionicons name="pencil" size={20} color="white" />
        </RectButton>

        <RectButton
          onPress={() => handleEliminar(actividad.idActividad)}
          className="bg-red-500 justify-center items-center w-16"
        >
          <Ionicons name="trash" size={20} color="white" />
        </RectButton>
      </View>
    );
  };

  // 🔹 Formato legible de fecha
  let fechaFormateada = "";
  if (fecha) {
    const [year, month, day] = fecha.split("-");
    const fechaLocal = new Date(year, month - 1, day);
    const fechaLegible = fechaLocal.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    fechaFormateada = fechaLegible.charAt(0).toUpperCase() + fechaLegible.slice(1);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-1 w-full max-w-md self-center">
          {/* Encabezado */}
          <View className="flex-row justify-between items-end mb-4 px-4">
            <Text className="text-xl font-semibold">Mis Actividades</Text>
            <TouchableOpacity
              onPress={() => router.push("../../addActivities")}
              className="bg-blue-600 rounded-full p-2"
            >
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Barra de búsqueda */}
          <View className="flex-row items-center justify-between px-4 mb-4">
            <TextInput
              placeholder="Actividad"
              placeholderTextColor="#888"
              value={actividad}
              onChangeText={setActividad}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 mr-2"
            />
            <TextInput
              placeholder="Materia"
              placeholderTextColor="#888"
              value={materia}
              onChangeText={setMateria}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 mr-2"
            />

            {/* Input de fecha */}
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 mr-2"
            >
              <Text
                className={`${
                  fecha && /^\d{4}-\d{2}-\d{2}$/.test(fecha)
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {fecha && /^\d{4}-\d{2}-\d{2}$/.test(fecha)
                  ? (() => {
                      const [y, m, d] = fecha.split("-");
                      const localDate = new Date(y, m - 1, d);
                      return localDate.toLocaleDateString("es-AR");
                    })()
                  : "Fecha"}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={
                  fecha && /^\d{4}-\d{2}-\d{2}$/.test(fecha)
                    ? new Date(fecha)
                    : new Date()
                }
                mode="date"
                display="default"
                minimumDate={new Date(2020, 0, 1)}
                onChange={(event, selectedDate) => {
                  setShowPicker(false);

                  if (event.type === "dismissed" || !selectedDate) {
                    console.log("Selección cancelada ❌");
                    return;
                  }

                  if (selectedDate) {
                    const year = selectedDate.getFullYear();
                    const month = selectedDate.getMonth() + 1;
                    const day = selectedDate.getDate();

                    const localISO = `${year}-${String(month).padStart(
                      2,
                      "0"
                    )}-${String(day).padStart(2, "0")}`;
                    setFecha(localISO);
                  }
                }}
              />
            )}

            <TouchableOpacity
              onPress={handleSearch}
              className="bg-blue-600 p-2 rounded-lg"
            >
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Lista de actividades */}
          <ScrollView
            className="flex-1 p-4"
            contentContainerStyle={{ paddingBottom: 160 }}
            showsVerticalScrollIndicator={false}
          >
            {activities.length > 0 ? (
              Object.entries(
                activities.reduce((acc, a) => {
                  if (!acc[a.fecha]) acc[a.fecha] = [];
                  acc[a.fecha].push(a);
                  return acc;
                }, {})
              ).map(([fecha, actividadesDeEseDia]) => (
                <View
                  key={fecha}
                  className="bg-white px-4 pt-4 pb-2 rounded-xl mb-3 shadow-sm"
                >
                  <Text className="text-lg font-semibold mb-3">
                    {getStringFecha(fecha)}
                  </Text>

                  {actividadesDeEseDia.map((a) => (
                    <Swipeable
                      key={a.idActividad}
                      renderRightActions={() => renderRightActions(a)}
                    >
                      <View className="flex-row justify-between items-end bg-white py-3 shadow border-t border-gray-200">
                        <View className="flex-[0.7]">
                          <Text className="font-semibold text-base">
                            {a.descripcionActividad}
                          </Text>
                          <Text className="text-gray-500 text-sm">{a.nombre}</Text>
                        </View>

                        <View className="items-end flex-[0.3]">
                          <Text className="text-gray-700 text-sm">{a.horario}</Text>
                          {a.aula && (
                            <Text className="text-gray-500 text-sn">{a.aula}</Text>
                          )}
                        </View>
                      </View>
                    </Swipeable>
                  ))}
                </View>
              ))
            ) : (
              <View
                title={fechaFormateada}
                className="bg-white p-4 rounded-2xl shadow mb-4"
              >
                <Text className="text-gray-500 text-center py-2">
                  No hay actividades.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
        <SuccessModal
          visible={modalVisible}
          mensaje={modalMensaje}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

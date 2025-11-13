import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,ScrollView,TextInput,TouchableOpacity,Alert,} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getActividadesFiltradas } from "../../database/actividades";
import { getStringFecha } from "../../utils/formatDate";

export default function DayActivities() {
  const { date } = useLocalSearchParams();
  const router = useRouter();

  const fechaValida = date === "all" ? null : date;
  const hoy = new Date();

  // 🔹 Estados para los inputs
  const [actividad, setActividad] = useState("");
  const [materia, setMateria] = useState("");
  const [fecha, setFecha] = useState(fechaValida);
  const [showPicker, setShowPicker] = useState(false);
  const [activities, setActividades] = useState([]);

  useEffect(() => {
    cargarActividades();
  }, [materia, fecha, actividad]);

  const cargarActividades = () => {
    try {
      const activities = getActividadesFiltradas(materia, fecha, actividad); 
      console.log("Actividades:", activities);
      setActividades(activities);
    } catch (error) {
      console.error("Error cargando las actividades:", error);
    }
  };

  // 🔹 Formato legible de fecha (sin error de zona horaria)
  const [year, month, day] = date.split("-");
  const fechaLocal = new Date(year, month - 1, day);


  const fechaLegible = fechaLocal.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const fechaFormateada =
    fechaLegible.charAt(0).toUpperCase() + fechaLegible.slice(1);

  // 🔹 Función de búsqueda (simulada)
  const handleSearch = () => {
    Alert.alert(
      "Búsqueda",
      `Actividad: ${actividad || "—"}\nMateria: ${
        materia || "—"
      }\nFecha: ${fecha || "—"}`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        {/* 🔹 Encabezado */}
        <View className="flex-row justify-between items-end mb-4 px-4 mt-[-30]">
          <Text className="text-xl font-semibold">Mis Actividades</Text>
          <TouchableOpacity
            onPress={() => router.push("../../addActivities")}
            className="bg-blue-600 rounded-full p-2 "
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* 🔹 Barra de búsqueda */}
        <View className="flex-row items-center justify-between px-4 mb-4 ">
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
          
          {/* 🔹 Input de fecha con mini calendario */}
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 mr-2"
          >
            <Text className={`${fecha && /^\d{4}-\d{2}-\d{2}$/.test(fecha) ? "text-gray-700" : "text-gray-400"}`} numberOfLines={1} ellipsizeMode="tail">
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
                value={fecha && /^\d{4}-\d{2}-\d{2}$/.test(fecha) ? new Date(fecha) : new Date()}
                mode="date"
                display="default"
                minimumDate={new Date(2020, 0, 1)} 
                onChange={(event, selectedDate) => {
                    setShowPicker(false);

                    if (event.type === "dismissed" || !selectedDate) {
                      console.log("Selección cancelada ❌");
                      return; // no actualiza la fecha
                    }

                    if (selectedDate) {
                        // ✅ Tomar la fecha seleccionada en hora local
                        const year = selectedDate.getFullYear();
                        const month = selectedDate.getMonth() + 1; // enero = 0
                        const day = selectedDate.getDate();

                        // Formato YYYY-MM-DD sin usar toISOString (evita UTC)
                        const localISO = `${year}-${String(month).padStart(2, "0")}-${String(
                            day
                        ).padStart(2, "0")}`;

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

        {/* 🔹 Lista de actividades */}
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          {activities.length > 0 ? (
            // 🔹 Agrupar por fecha
            Object.entries(
              activities.reduce((acc, a) => {
                if (!acc[a.fecha]) acc[a.fecha] = [];
                acc[a.fecha].push(a);
                return acc;
              }, {})
            ).map(([fecha, actividadesDeEseDia]) => (
              <View key={fecha} className="bg-white px-4 pt-4 pb-2 rounded-xl mb-3 shadow-sm">
                {/* Encabezado de fecha */}
                <Text className="text-lg font-semibold mb-3">{getStringFecha(fecha)}</Text>

                {/* Actividades del mismo día */}
                {actividadesDeEseDia.map((a) => (
                  <View
                    key={a.idActividad}
                    className="flex-row justify-between items-end bg-white py-3 shadow border-t border-gray-200"
                  >
                    <View className="flex-[0.7]">
                      <Text className="font-semibold">{a.descripcionActividad}</Text>
                      <Text className="text-gray-500">{a.nombre}</Text>
                    </View>
                    <View className="items-end flex-[0.3]">
                      <Text className="text-gray-700">{a.horario}</Text>
                      {a.aula && <Text className="text-gray-500">{a.aula}</Text> }
                    </View>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View title={fechaFormateada} className="bg-white p-4 rounded-2xl shadow mb-4">
              <Text className="text-gray-500 text-center py-2">
                No hay actividades.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
        <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

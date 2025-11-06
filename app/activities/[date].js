import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,ScrollView,TextInput,TouchableOpacity,Alert,} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Card from "../../components/Card";

export default function DayActivities() {
  const { date } = useLocalSearchParams();
  const router = useRouter();

  // 🔹 Estados para los inputs
  const [actividad, setActividad] = useState("");
  const [materia, setMateria] = useState("");
  const [fecha, setFecha] = useState(date || "");
  const [showPicker, setShowPicker] = useState(false);

  // 🔹 Simulación de actividades
  const activities = {
    "2025-11-03": [
      {
        title: "2do. Parcial SETR",
        time: "16:00hs",
        location: "Lab. Ardenghi",
      },
      { title: "Entrega TP3 - TNT", time: "23:59hs" },
    ],
    "2025-11-05": [{ title: "Entrega TP4 - TNT", time: "23:59hs" }],
    "2025-11-10": [
      { title: "Presentación paper TNT", time: "14:00hs", location: "Virtual" },
    ],
  };

  const items = activities[date] || [];

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
        <View className="flex-row justify-between items-center mb-2 px-4 mt-[-18]">
          <Text className="text-xl font-semibold">Mis Actividades</Text>
          <TouchableOpacity
            onPress={() => console.log("Agregar actividad")}
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
            <Text className="text-gray-700" numberOfLines={1} ellipsizeMode="tail">
                {fecha
                    ? (() => {
                        const [y, m, d] = fecha.split("-");
                        const localDate = new Date(y, m - 1, d); 
                        return localDate.toLocaleDateString("es-AR");
                        })()
                    : "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
                value={fecha ? new Date(fecha) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                    setShowPicker(false);
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
          <Card title={fechaFormateada}>
            {items.length === 0 ? (
              <Text className="text-gray-500 text-center py-2">
                No hay actividades.
              </Text>
            ) : (
              items.map((a, i) => (
                <View
                  key={i}
                  className={`flex-row justify-between items-start py-2 ${
                    i < items.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <View className="flex-1">
                    <Text className="font-semibold">{a.title}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-700">{a.time}</Text>
                    {a.location && (
                      <Text className="text-gray-500">{a.location}</Text>
                    )}
                  </View>
                </View>
              ))
            )}
          </Card>
        </ScrollView>
      </View>
        <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

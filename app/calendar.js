import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getColorActividad } from "../database/actividades";

// 🔹 Configurar idioma en español
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ],
  monthNamesShort: ["Ene.","Feb.","Mar.","Abr.","May.","Jun.","Jul.","Ago.","Sept.","Oct.","Nov.","Dic."],
  dayNames: ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
  dayNamesShort: ["D","L","M","M","J","V","S"]
};
LocaleConfig.defaultLocale = "es";

export default function CalendarScreen() {
  const router = useRouter();
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    // Navega a la pantalla dinámica con la fecha seleccionada
    router.push(`/activities/${day.dateString}`);
  };

  useEffect(() => {
    const fetchFechas = async () => {
      const actividades = getColorActividad(); // [{fecha, color}, ...]
      
      const marked = actividades.reduce((acc, a) => {
        // Convertir DD-MM-AA -> YYYY-MM-DD
        const [d, m, y] = a.fecha.split("-");
        const dateKey = `20${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;

        // Inicializar dots si no existe
        if (!acc[dateKey]) acc[dateKey] = { dots: [] };

        // Evitar duplicados de color en la misma fecha
        if (!acc[dateKey].dots.some(dot => dot.color === a.color)) {
          acc[dateKey].dots.push({ key: `c${a.color}`, color: a.color });
        }

        return acc;
      }, {});

      setMarkedDates(marked);
    };
    fetchFechas();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4 mt-[-45]">
        <Text className="text-2xl font-bold text-center mb-4 text-black">
          Noviembre
        </Text>

        <Calendar className="rounded-xl"
          onDayPress={handleDayPress}
          theme={{
            selectedDayBackgroundColor: "#0030BF",
            todayTextColor: "#416CFA",
            arrowColor: "#0030BF",
            monthTextColor: "#000",
            textDayFontWeight: "500",
          }}
          markingType="multi-dot"
          markedDates={markedDates}
        />
        <View className="items-center">
          <TouchableOpacity className="bg-blue-600 rounded-lg py-2 items-center my-4 w-2/3" 
            onPress={() =>
            router.push({
              pathname: "/activities/all"
            })
          }>
            <Text className="text-white font-semibold p-2">   
              Ver todas mis actividades
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

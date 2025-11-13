import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const handleDayPress = (day) => {
    // Navega a la pantalla dinámica con la fecha seleccionada
    router.push(`/activities/${day.dateString}`);
  };

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
            todayTextColor: "#0030BF",
            arrowColor: "#0030BF",
            monthTextColor: "#000",
            textDayFontWeight: "500",
          }}
          markedDates={{
            "2025-11-03": { selected: true, selectedColor: "#FACC15" },
            "2025-11-05": { selected: true, selectedColor: "#A78BFA" },
            "2025-11-10": { selected: true, selectedColor: "#22C55E" },
          }}
        />
        <View className="items-center">
          <TouchableOpacity className="bg-blue-600 rounded-lg py-2 items-center my-4 w-2/3" 
            onPress={() =>
            router.push({
              pathname: "/activities/''"
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

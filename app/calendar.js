import { SafeAreaView, View, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

// 🔹 Configurar idioma en español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ],
  monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['D','L','M','M','J','V','S']
};
LocaleConfig.defaultLocale = 'es';

export default function CalendarScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mb-4 text-black">
          Noviembre
        </Text>

        <Calendar
          theme={{
            selectedDayBackgroundColor: "#0030BF",
            todayTextColor: "#0030BF",
            arrowColor: "#0030BF",
            monthTextColor: "#000",
            textDayFontWeight: "500",
          }}
          markedDates={{
            "2025-11-08": { selected: true, selectedColor: "#FACC15" }, // Amarillo
            "2025-11-09": { selected: true, selectedColor: "#A78BFA" }, // Violeta
            "2025-11-11": { selected: true, selectedColor: "#22C55E" }, // Verde
          }}
        />

        <Text className="text-center text-gray-600 mt-6">
          Actividades: examen, final, entrega, proyecto, presentación
        </Text>
      </View>
        <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

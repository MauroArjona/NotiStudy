import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Header from "../components/Header";
import Card from "../components/Card";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
  return (
    // full-height background; center the phone container on wide screens
    <View className="flex-1 bg-gray-100 items-center">
      {/* phone-width container: full width on native, centered with max width on web */}
      <View className="w-full max-w-md relative">
        <Header />

        <ScrollView
          className="p-4"
          contentContainerStyle={{ paddingBottom: 220, flexGrow: 1 }}
        >
        <View className="flex-row justify-between mb-2">
          <Text className="text-xl font-semibold">Actividades</Text>
          <Text className="text-gray-500">Viernes 31 de Octubre</Text>
        </View>

        <Card title="Mis clases">
          <View className="mb-2">
            <Text className="font-semibold">Sistemas embebidos y de tiempo real</Text>
            <Text className="text-gray-500">16:00 - 18:00  •  Lab. Ardenghi</Text>
          </View>
          <View>
            <Text className="font-semibold">Desarrollo de aplicaciones móviles</Text>
            <Text className="text-gray-500">18:00 - 20:00  •  Lab. Ardenghi</Text>
          </View>
        </Card>

        <Card title="Próximo">
          <View className="mb-2">
            <Text className="font-semibold">2do. Parcial SETR</Text>
            <Text className="text-gray-500">16:00hs  •  Lab. Ardenghi</Text>
          </View>
          <View>
            <Text className="font-semibold">Entrega TP4 - TNT</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </View>
        </Card>

        {/* 🔹 Botón para ir a la ruta de prueba */}
        <Link href="/algo" asChild>
          <TouchableOpacity className="bg-blue-600 rounded-xl p-3 my-3">
            <Text className="text-white text-center text-base font-semibold">
              Ir a ruta de prueba
            </Text>
          </TouchableOpacity>
        </Link>

          </ScrollView>

          {/* Fixed bottom navigation inside the phone-width container (elevado) */}
          <View className="absolute bottom-6 left-0 right-0 px-4 pb-2">
            <BottomNav />
          </View>
        </View>
      </View>
  );
}
 
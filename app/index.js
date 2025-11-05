import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Contenedor principal del contenido */}
      <View className="flex-1 w-full max-w-md self-center">
        <Header />

        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{
            paddingBottom: 160, // deja más espacio para que el último card no quede oculto
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row justify-between mb-2">
            <Text className="text-xl font-semibold">Actividades</Text>
            <Text className="text-gray-500">Viernes 31 de Octubre</Text>
          </View>

          {/* Tus cards */}
          <Card title="Mis clases">
            <View className="mb-2">
              <Text className="font-semibold">
                Sistemas embebidos y de tiempo real
              </Text>
              <Text className="text-gray-500">
                16:00 - 18:00 • Lab. Ardenghi
              </Text>
            </View>
            <View>
              <Text className="font-semibold">
                Desarrollo de aplicaciones móviles
              </Text>
              <Text className="text-gray-500">
                18:00 - 20:00 • Lab. Ardenghi
              </Text>
            </View>
          </Card>

          <Card title="Próximo">
            <Text className="font-semibold">Entrega TP4 - TNT</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>

          <Card title="Otro evento">
            <Text className="font-semibold">Reunión final</Text>
            <Text className="text-gray-500">10:00hs</Text>
          </Card>

          <Card title="Otro evento">
            <Text className="font-semibold">Reunión final</Text>
            <Text className="text-gray-500">10:00hs</Text>
          </Card>
          <Card title="Otro evento">
            <Text className="font-semibold">Reunión final</Text>
            <Text className="text-gray-500">10:00hs</Text>
          </Card>
          <Card title="Otro evento">
            <Text className="font-semibold">Reunión final</Text>
            <Text className="text-gray-500">10:00hs</Text>
          </Card>
        </ScrollView>
      </View>

      {/* 🔹 BottomNav FIJO y global (fuera del contenido centrado) */}
      <View className="absolute bottom-12 left-0 right-0">
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

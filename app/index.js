import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Card from "../components/Card";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        <View className="flex-row justify-between mb-2 px-4 mt-[-18]">
          <Text className="text-xl font-semibold">Actividades</Text>
          <Text className="text-gray-500">Viernes 31 de Octubre</Text>
        </View>

        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 🔹 Mis clases */}
          <Card title="Mis clases">
            <View className="border-t border-gray-200 my-2" />

            {/* 🔸 Materia 1 */}
            <View className="flex-row justify-between items-start mb-2">
              <TouchableOpacity
                className="flex-1"
                onPress={() =>
                  router.push({
                    pathname: "/detailSubject/[detail]",
                    params: { detail: "Sistemas embebidos y de tiempo real" },
                  })
                }
              >
                <Text className="font-semibold">
                  Sistemas embebidos {"\n"}y de tiempo real
                </Text>
              </TouchableOpacity>

              <View className="items-end">
                <Text className="text-gray-700">16:00 - 18:00</Text>
                <Text className="text-gray-500">Lab. Ardenghi</Text>
              </View>
            </View>

            <View className="border-t border-gray-100 my-1" />

            {/* 🔸 Materia 2 */}
            <View className="flex-row justify-between items-start mt-2">
              <TouchableOpacity
                className="flex-1"
                onPress={() =>
                  router.push({
                    pathname: "/detailSubject/[detail]",
                    params: { detail: "Desarrollo de aplicaciones móviles" },
                  })
                }
              >
                <Text className="font-semibold">
                  Desarrollo de aplicaciones móviles
                </Text>
              </TouchableOpacity>

              <View className="items-end">
                <Text className="text-gray-700">18:00 - 20:00</Text>
                <Text className="text-gray-500">Lab. Ardenghi</Text>
              </View>
            </View>
          </Card>

          {/* 🔹 Entregas próximas */}
          <Card title="Entrega próxima">
            <View className="border-t border-gray-200 my-2" />
            <Text className="font-semibold">TP4 - TNT</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>

          <Card title="Entrega próxima">
            <View className="border-t border-gray-200 my-2" />
            <Text className="font-semibold">TP5 - Redes</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>

          <Card title="Entrega próxima">
            <View className="border-t border-gray-200 my-2" />
            <Text className="font-semibold">Exposición - Cloud Computing</Text>
            <Text className="text-gray-500">18:00hs</Text>
          </Card>
        </ScrollView>
      </View>

      {/* Barra inferior */}
      <View className="absolute bottom-12 left-0 right-0">
        <BottomNav />
      </View>
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import Card from "../components/Card";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
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
          <Card title="Mis clases">
            <Text className="font-semibold">Sistemas embebidos</Text>
            <Text className="text-gray-500">16:00 - 18:00</Text>
          </Card>

          <Card title="Entrega próxima">
            <Text className="font-semibold">TP4 - TNT</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>

          <Card title="Entrega próxima">
            <Text className="font-semibold">TP4 - TNT</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>

          <Card title="Entrega próxima">
            <Text className="font-semibold">TP4 - TNT</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>

          <Card title="Entrega próxima">
            <Text className="font-semibold">TP4 - TNT</Text>
            <Text className="text-gray-500">23:59hs</Text>
          </Card>
        </ScrollView>
      </View>

      {/* 🔹 Barra inferior con los botones */}
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function Algo() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Ruta de prueba
        </Text>

        <Link href="/">
          <Text className="text-blue-600 underline">Volver al inicio</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

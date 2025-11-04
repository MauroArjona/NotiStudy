import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg text-gray-800 mb-4">
        ¡Bienvenido a NotiStudy!
      </Text>

      <Link href="/algo">
        <Text className="text-blue-600 underline">Ir a ruta de prueba</Text>
      </Link>

      <StatusBar style="auto" />
    </View>
  );
}

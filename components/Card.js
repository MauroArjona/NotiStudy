import { View, Text } from "react-native";

export default function Card({ title, children }) {
  return (
    <View className="bg-white p-4 rounded-2xl shadow mb-4">
      {title && <Text className="text-lg font-semibold">{title}</Text>}
      {children}
    </View>
  );
}

import { Slot } from "expo-router";
import { View } from "react-native";

export default function Layout() {
    return (
        // Usamos className (correcto) y flex-1 para que el layout ocupe toda la pantalla
        <View className="flex-1 bg-black">
            <Slot />
        </View>
    );
}
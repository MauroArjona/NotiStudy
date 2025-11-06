import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Calendario\nde\nactividades",
      icon: "calendar",
      href: "/calendar",
    },
    {
      label: "Materias",
      icon: "book",
      href: "/subjects",
    },
    {
      label: "Recordatorios",
      icon: "timer-outline",
      href: "/reminders",
    },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white py-2 pt-4 rounded-t-3xl shadow-lg">
      <View className="flex-row justify-around items-start">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link href={tab.href} asChild key={tab.href}>
              <TouchableOpacity className="items-center mx-2">
                <View
                  className={`w-14 h-14 rounded-full border justify-center items-center mb-3 ${
                    isActive
                      ? "border-blue-600 bg-blue-100"
                      : "border-blue-500 bg-white"
                  }`}
                >
                  <Ionicons
                    name={tab.icon}
                    size={22}
                    color={isActive ? "#1e3a8a" : "#2563eb"}
                  />
                </View>
                <Text
                  className={`text-xs leading-tight text-center ${
                    isActive ? "text-blue-800 font-semibold" : "text-blue-600"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

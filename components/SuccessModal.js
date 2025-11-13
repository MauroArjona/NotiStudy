// components/SuccessModal.js
import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { CheckCircle2 } from "lucide-react-native";

export default function SuccessModal({ visible, onClose, mensaje }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white w-80 rounded-2xl p-6 items-center shadow-xl">
          <CheckCircle2 size={60} color="#22c55e" />
          <Text className="text-2xl font-bold text-gray-800 mt-3">¡Éxito!</Text>
          <Text className="text-gray-600 text-center mt-2">{mensaje}</Text>

          <TouchableOpacity
            onPress={onClose}
            className="bg-green-500 mt-5 px-6 py-2 rounded-xl"
          >
            <Text className="text-white font-semibold">Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

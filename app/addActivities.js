import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { agregarActividad } from "../database/actividades";
import { agregarRecordatorio } from "../database/recordatorios";
import { getMaterias } from "../database/materias";

export default function AgregarActividad() {
  const router = useRouter();

  // 🔹 Datos de formulario
  const [idMateria, setIdMateria] = useState("");
  const [fecha, setFecha] = useState("");
  const [fechaAviso, setFechaAviso] = useState(""); 
  const [horario, setHorario] = useState("");
  const [aula, setAula] = useState("");
  const [descripcionActividad, setDescripcionActividad] = useState("");
  const [recordarme, setRecordarme] = useState(false);

  const [materias, setMaterias] = useState(getMaterias("En Curso"));

  // 🔹 DateTimePicker
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState("fecha"); 

  const openPicker = (type) => {
    setPickerType(type);
    setShowPicker(true);
  };

  const onPickerChange = (event, selectedDate) => {
    if (!selectedDate) {
      setShowPicker(false);
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    if (pickerType === "fecha") {
      setFecha(`${year}-${month}-${day}`);
    } else if (pickerType === "fechaAviso") {
      setFechaAviso(`${year}-${month}-${day}`);
    } else {
      const horas = String(selectedDate.getHours()).padStart(2, "0");
      const minutos = String(selectedDate.getMinutes()).padStart(2, "0");
      setHorario(`${horas}:${minutos}`);
    }

    setShowPicker(false);
  };

  // 🔹 Guardar actividad y recordatorio
  const handleGuardar = () => {
    if (!idMateria || !fecha || !horario || !descripcionActividad.trim() || !fechaAviso) {
      Alert.alert("Error", "Completá todos los campos obligatorios (incluyendo la fecha de aviso)");
      return;
    }

    const idActividad = agregarActividad(idMateria, horario, fecha, aula, descripcionActividad);

    if (idActividad) {
      const activo = recordarme ? 1 : 0;
      const horaAviso = horario;

      const idRec = agregarRecordatorio(idActividad, fechaAviso, horaAviso, activo);
      if (idRec) {
        console.log(`Recordatorio agregado con fechaAviso=${fechaAviso} ✅`);
      } else {
        console.error("Error creando el recordatorio ❌");
      }

      Alert.alert("✅ Actividad y recordatorio guardados correctamente");
      router.back();
    } else {
      Alert.alert("❌ Error", "No se pudo guardar la actividad");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4 mt-[-54]">
        <Text className="text-2xl font-bold text-center mb-4">Agregar Actividad</Text>

        {/* Recordarme esta actividad */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-semibold">Recordarme esta actividad</Text>
          <Switch
            value={recordarme}
            onValueChange={setRecordarme}
            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            thumbColor={recordarme ? "#2563eb" : "#f4f3f4"}
          />
        </View>

        {/* 🔹 Fecha de aviso */}
        <Text className="font-semibold mb-1">Recordarme el dia</Text>
        <TouchableOpacity
          className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
          onPress={() => openPicker("fechaAviso")}
        >
          <Text>{fechaAviso || "Seleccionar fecha de aviso"}</Text>
        </TouchableOpacity>

        {/* Materia */}
        <Text className="font-semibold mb-1">Materia</Text>
        <View className="bg-white border border-gray-300 rounded-lg mb-4 max-h-10 justify-center">
          <Picker selectedValue={idMateria} onValueChange={setIdMateria}>
            <Picker.Item label="Seleccioná una materia" value="" />
            {materias.map((m) => (
              <Picker.Item key={m.idMateria} label={m.nombre} value={m.idMateria} />
            ))}
          </Picker>
        </View>

        {/* Fecha de la actividad */}
        <Text className="font-semibold mb-1">Fecha de la actividad</Text>
        <TouchableOpacity
          className="bg-white border border-gray-300 rounded-lg p-3 mb-4 justify-center"
          onPress={() => openPicker("fecha")}
        >
          <Text>{fecha || "Seleccionar fecha"}</Text>
        </TouchableOpacity>

        {/* Horario */}
        <Text className="font-semibold mb-1">Horario</Text>
        <TouchableOpacity
          className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
          onPress={() => openPicker("hora")}
        >
          <Text>{horario || "Seleccionar hora"}</Text>
        </TouchableOpacity>

        {/* Aula */}
        <Text className="font-semibold mb-1">Aula (opcional)</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Ej: Lab. Ardenghi"
          value={aula}
          onChangeText={setAula}
        />

        {/* Descripción */}
        <Text className="font-semibold mb-1">Descripción de la actividad</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg p-2 mb-6 h-20"
          placeholder="Ej: Parcial, entrega de TP..."
          value={descripcionActividad}
          onChangeText={setDescripcionActividad}
          multiline
        />

        {/* Botones */}
        <View className="flex-row justify-between mb-10">
          <TouchableOpacity
            className="bg-gray-400 py-3 rounded-lg flex-1 mr-2 items-center"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-lg flex-1 ml-2 items-center"
            onPress={handleGuardar}
          >
            <Text className="text-white font-semibold">Guardar</Text>
          </TouchableOpacity>
        </View>

        {/* Picker */}
        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode={pickerType === "hora" ? "time" : "date"}
            display="default"
            onChange={onPickerChange}
          />
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

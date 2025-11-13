import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams } from "expo-router";
import {obtenerActividadPorId,actualizarActividad,} from "../database/actividades";
import {obtenerRecordatorioPorActividad,actualizarRecordatorio,} from "../database/recordatorios";
import { getMaterias } from "../database/materias";
import SuccessModal from "../components/SuccessModal";

export default function EditarActividad() {
  const router = useRouter();
  const { idActividad } = useLocalSearchParams();

  // 🔹 Estados
  const [idMateria, setIdMateria] = useState("");
  const [fecha, setFecha] = useState("");
  const [fechaAviso, setFechaAviso] = useState("");
  const [horario, setHorario] = useState("");
  const [aula, setAula] = useState("");
  const [descripcionActividad, setDescripcionActividad] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [materias, setMaterias] = useState(getMaterias("En Curso"));

  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState("fecha");
  const [modalVisible, setModalVisible] = useState(false);

  // 🔹 Cargar datos existentes
  useEffect(() => {
    const cargarDatos = async () => {
      const act = await obtenerActividadPorId(idActividad);
      if (!act) {
        Alert.alert("Error", "No se encontró la actividad");
        router.back();
        return;
      }
    
      setIdMateria(act.idMateria);
      setFecha(act.fecha);
      setHorario(act.horario);
      setAula(act.aula || "");
      setDescripcionActividad(act.descripcionActividad);

      // Buscar recordatorio vinculado
      const rec = await obtenerRecordatorioPorActividad(idActividad);
      if (rec) {
        console.log("📆 Fecha aviso (cruda):", rec.fechaAviso);
        setRecordarme(rec.activo === 1);
        setFechaAviso(rec.fechaAviso);
      }
    };

    cargarDatos();
  }, [idActividad]);

  // 🔹 Helpers
  const openPicker = (type) => {
    setPickerType(type);
    setShowPicker(true);
  };

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatTime = (date) => {
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${h}:${min}`;
  };

  // 🔹 Cambios en DateTimePicker
  const onPickerChange = (event, selectedDate) => {
    if (!selectedDate) {
      setShowPicker(false);
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (pickerType === "fecha" || pickerType === "fechaAviso") {
      const fechaSeleccionada = new Date(selectedDate);
      fechaSeleccionada.setHours(0, 0, 0, 0);

      if (fechaSeleccionada < hoy) {
        Alert.alert("Fecha inválida", "No puede ser anterior a hoy.");
        setShowPicker(false);
        return;
      }
    }

    if (pickerType === "hora" && fechaAviso) {
      const [y, m, d] = fechaAviso.split("-").map(Number);
      const fechaAvisoObj = new Date(y, m - 1, d);
      const hoy = new Date();
      fechaAvisoObj.setHours(0, 0, 0, 0);
      hoy.setHours(0, 0, 0, 0);

      if (fechaAvisoObj.getTime() === hoy.getTime()) {
        const ahora = new Date();
        if (
          selectedDate.getHours() < ahora.getHours() ||
          (selectedDate.getHours() === ahora.getHours() &&
            selectedDate.getMinutes() <= ahora.getMinutes())
        ) {
          Alert.alert("Hora inválida", "Debe ser posterior a la hora actual.");
          setShowPicker(false);
          return;
        }
      }
    }

    if (pickerType === "fecha") {
      setFecha(formatDate(selectedDate));
    } else if (pickerType === "fechaAviso") {
      setFechaAviso(formatDate(selectedDate));
    } else {
      setHorario(formatTime(selectedDate));
    }

    setShowPicker(false);
  };

  // 🔹 Guardar cambios
  const handleGuardarCambios = async () => {
    if (!idMateria || !fecha || !horario || !descripcionActividad.trim()) {
      Alert.alert("Error", "Completá todos los campos obligatorios");
      return;
    }
    
    const actualizado = await actualizarActividad(
      idActividad,
      idMateria,
      horario,
      fecha,
      aula,
      descripcionActividad
    );

    if (actualizado) {
      // Actualizar recordatorio si existe o no
      const rec = await obtenerRecordatorioPorActividad(idActividad);
      const activo = recordarme ? 1 : 0;
      const horaAviso = horario;

      if (rec) {
        await actualizarRecordatorio(rec.idRecordatorio, fechaAviso, horaAviso, activo);
      }

      setModalVisible(true);
    } else {
      Alert.alert("❌ Error", "No se pudo actualizar la actividad");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4 mt-[-54]">
        <Text className="text-2xl font-bold text-center mb-4">Editar Actividad</Text>

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

        {/* Fecha de aviso */}
        <Text className="font-semibold mb-1">Recordarme el día</Text>
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

        {/* Fecha */}
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
            onPress={handleGuardarCambios}
          >
            <Text className="text-white font-semibold">Guardar cambios</Text>
          </TouchableOpacity>
        </View>

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

      {/* Modal éxito */}
      <SuccessModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          router.back();
        }}
        mensaje="Actividad actualizada correctamente 🎉"
      />
    </SafeAreaView>
  );
}

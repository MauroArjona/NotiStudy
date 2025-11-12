import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  coloresContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: '3%',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  colorSeleccionado: {
    borderColor: "#000",
    borderWidth: 3,
  },
});

export default function AgregarMateria() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("en_curso");
  const [comentario, setComentario] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [colorSeleccionado, setColorSeleccionado] = useState("#E57373");
  const coloresDisponibles = ["#E57373", "#64B5F6", "#81C784", "#FFD54F", "#BA68C8", "#4DB6AC", "#F06292", "#A1887F",];

  const [nuevoHorario, setNuevoHorario] = useState({
    dia: "Lunes",
    horaInicio: "",
    horaFin: "",
  });
  
  const [showPicker, setShowPicker] = useState(false);
  const [pickerField, setPickerField] = useState("horaInicio");

  // Picker para hora inicio o fin
  const openTimePicker = (field) => {
    setPickerField(field);
    setShowPicker(true);
  };

  const onTimeChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios"); // en Android se cierra automáticamente
    if (selectedDate) {
      const horaFormatted = selectedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      
      if (pickerField === "horaInicio") {
        setNuevoHorario({ ...nuevoHorario, horaInicio: horaFormatted, horaFin: null });
      } else {
        // Solo permitir horaFin > horaInicio
        const [hiH, hiM] = nuevoHorario.horaInicio.split(":").map(Number);
        const [hfH, hfM] = horaFormatted.split(":").map(Number);
        if (hfH < hiH || (hfH === hiH && hfM <= hiM)) {
          alert("La hora de fin debe ser posterior a la hora de inicio");
          return;
        }
        setNuevoHorario({ ...nuevoHorario, horaFin: horaFormatted });
      }
    } 
  };

  const agregarHorario = () => {
    if (nuevoHorario.horaInicio && nuevoHorario.horaFin) {
        const horarioNuevo = { ...nuevoHorario };
        const horariosActualizados = [...horarios, horarioNuevo];
        const diasOrden = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
        horariosActualizados.sort((a, b) => {
            const diaA = diasOrden.indexOf(a.dia);
            const diaB = diasOrden.indexOf(b.dia);
            if (diaA !== diaB) return diaA - diaB;
            return a.horaInicio.localeCompare(b.horaInicio); // compara strings "HH:MM"
        });
      setHorarios(horariosActualizados);
      setNuevoHorario({ dia: "Lunes", horaInicio: "", horaFin: "" });
    } else {
      alert("Seleccioná hora de inicio y fin");
    }
  };

  const guardarMateria = () => {
    if (!nombre.trim()) {
      alert("Por favor ingresá el nombre de la materia");
      return;
    }
    console.log("Materia guardada:", { nombre, estado, horarios, comentario, color: colorSeleccionado});
    router.back(); // vuelve al listado de materias
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4 mt-[-54]">
        <View className="mx-3">
        <Text className="text-2xl font-bold text-center mb-4">Agregar Materia</Text>

        {/*Nombre*/}
        <Text className="font-semibold mb-1">Nombre de la materia</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Ej: Algorítmica y Programación I"
          value={nombre}
          onChangeText={setNombre}
        />

        {/*Selector de color*/}
        <Text className="font-semibold mb-2">Color de la materia</Text>
        <View style={styles.coloresContainer}>
          {coloresDisponibles.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                colorSeleccionado === color && styles.colorSeleccionado,
              ]}
              onPress={() => setColorSeleccionado(color)}
            />
          ))}
        </View>

        <Text className="text-sm mt-2 mb-6 text-gray-600">
          Color elegido: <Text style={{ color: colorSeleccionado }}>{colorSeleccionado}</Text>
        </Text>

        {/*Estado*/}
        <Text className="font-semibold mb-1">Estado</Text>
        <View className="bg-white border border-gray-300 rounded-lg mb-4 justify-center max-h-10">
          <Picker selectedValue={estado} onValueChange={setEstado}>
            <Picker.Item label="En curso" value="en_curso" />
            <Picker.Item label="Regularizada" value="regularizada" />
            <Picker.Item label="Aprobada" value="aprobada" />
          </Picker>
        </View>

        {/*Horarios*/}
        <Text className="font-semibold mb-1">Horarios</Text>
        <View className="bg-white border border-gray-300 rounded-lg p-3 mb-3">
          <Text className="font-semibold mb-1">Nuevo horario</Text>

          <View className="border border-gray-300 rounded-lg mb-2 max-h-10 justify-center">
            <Picker
              selectedValue={nuevoHorario.dia}
              onValueChange={(v) => setNuevoHorario({ ...nuevoHorario, dia: v })}
            >
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((d) => (
                <Picker.Item key={d} label={d} value={d} />
              ))}
            </Picker>
          </View>

          {/* Botones para seleccionar horas */}
          <TouchableOpacity
            className="border border-gray-300 rounded-lg p-2 mb-2 h-10"
            onPress={() => openTimePicker("horaInicio")}
          >
            <Text>{nuevoHorario.horaInicio || "Hora de inicio"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-gray-300 rounded-lg p-2 mb-2 h-10"
            onPress={() => openTimePicker("horaFin")}
          >
            <Text>{nuevoHorario.horaFin || "Hora de fin"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-600 rounded-lg py-2 items-center mt-1"
            onPress={agregarHorario}
          >
            <Text className="text-white font-semibold">+ Agregar horario</Text>
          </TouchableOpacity>
        </View>

        {/* Horarios agregados por el usuario al completar*/}
        {horarios.length > 0 && (
        <View style={{ marginTop: 12, marginBottom: 16 }}>
            <Text style={{ fontWeight: "600", marginBottom: 4 }}>Horarios agregados</Text>
            {horarios.map((h, index) => (
            <View
                key={index}
                style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 8,
                marginBottom: 4,
                backgroundColor: "#f3f4f6",
                borderRadius: 6,
                alignItems: "center",
                }}
            >
                <Text style={{ flex: 1 }}>{h.dia}</Text>
                <Text style={{ flex: 1, textAlign: "center" }}>
                {h.horaInicio} - {h.horaFin}
                </Text>
                <TouchableOpacity onPress={() => {
                const horariosFiltrados = horarios.filter((_, i) => i !== index);
                setHorarios(horariosFiltrados);
                }}>
                <Text style={{ color: "red" }}>Eliminar</Text>
                </TouchableOpacity>
            </View>
            ))}
        </View>
        )}


        {/*Comentario*/}
        <Text className="font-semibold mb-1">Comentario (opcional)</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg p-2 mb-6 h-10"
          placeholder="Ej: Parciales los viernes"
          value={comentario}
          onChangeText={setComentario}
          multiline
        />

        <View className="flex-row justify-between mb-10">
          <TouchableOpacity
            className="bg-gray-400 py-3 rounded-lg flex-1 mr-2 items-center"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-lg flex-1 ml-2 items-center"
            onPress={guardarMateria}
          >
            <Text className="text-white font-semibold">Guardar</Text>
          </TouchableOpacity>
        </View>

         {/* DateTimePicker */}
        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Platform} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getMateriaById, actualizarMateria, eliminarClasesPorMateria} from "../../database/materias";
import { getClasesByMateria, agregarClase } from "../../database/clases";

const styles = StyleSheet.create({
  coloresContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: "3%",
    marginBottom: 10,
    marginTop: 5,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  colorSeleccionado: {
    borderWidth: 3,
    borderColor: "#000",
  },
});

export default function EditSubject() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("En Curso");
  const [comentario, setComentario] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("#E57373");
  const coloresDisponibles = ["#E57373", "#64B5F6", "#81C784", "#FFD54F", "#BA68C8", "#4DB6AC", "#F06292", "#A1887F",];

  const [horarios, setHorarios] = useState([]);

  const [nuevoHorario, setNuevoHorario] = useState({
    dia: "Lunes",
    horarioInicio: "",
    horarioFin: "",
    aula: "",
    tipo: "Teoría",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [pickerField, setPickerField] = useState("horarioInicio");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    const materia = getMateriaById(Number(id));

    if (!materia) {
      Alert.alert("Error", "No se encontró la materia.");
      return router.back();
    }

    setNombre(materia.nombre);
    setEstado(materia.estado);
    setComentario(materia.comentario || "");
    setColorSeleccionado(materia.color);

    const clases = getClasesByMateria(Number(id));
    setHorarios(clases);
  };

  const openTimePicker = (campo) => {
    setPickerField(campo);
    setShowPicker(true);
  };

  const formatTime = (date) => {
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  const onTimeChange = (event, selectedDate) => {
    if (!selectedDate) return;

    setShowPicker(Platform.OS === "ios");

    const hora = formatTime(selectedDate);

    if (pickerField === "horarioInicio") {
      setNuevoHorario({ ...nuevoHorario, horarioInicio: hora, horarioFin: null });
    } else {
      const [hiH, hiM] = nuevoHorario.horarioInicio.split(":").map(Number);
      const [hfH, hfM] = hora.split(":").map(Number);

      if (hfH < hiH || (hfH === hiH && hfM <= hiM)) {
        Alert.alert("Error", "La hora de fin debe ser posterior a la hora de inicio.");
        return;
      }

      setNuevoHorario({ ...nuevoHorario, horarioFin: hora });
    }
  };

  const agregarHorarioNuevo = () => {
    if (!nuevoHorario.horarioInicio || !nuevoHorario.horarioFin) {
      return Alert.alert("Error", "Seleccioná hora de inicio y fin.");
    }

    if (!nuevoHorario.aula.trim()) {
      return Alert.alert("Error", "Ingresá la ubicación (aula/lab).");
    }

    const horariosActualizados = [...horarios, { ...nuevoHorario }];

    const ordenDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    horariosActualizados.sort((a, b) => {
      const d1 = ordenDias.indexOf(a.dia);
      const d2 = ordenDias.indexOf(b.dia);
      if (d1 !== d2) return d1 - d2;
      return a.horarioInicio.localeCompare(b.horarioInicio);
    });

    setHorarios(horariosActualizados);

    setNuevoHorario({
      dia: "Lunes",
      horarioInicio: "",
      horarioFin: "",
      aula: "",
      tipo: "Teoría",
    });
  };

  const guardarCambios = () => {
    if (!nombre.trim()) {
      return Alert.alert("Error", "El nombre no puede estar vacío.");
    }

    const actualizado = actualizarMateria(
      Number(id),
      nombre,
      estado,
      colorSeleccionado,
      comentario
    );

    if (!actualizado) {
      return Alert.alert("Error", "No se pudieron guardar los cambios.");
    }

    eliminarClasesPorMateria(Number(id));

    horarios.forEach((h) => {
      agregarClase(
        Number(id),
        h.horarioInicio,
        h.horarioFin,
        h.dia,
        h.aula,
        h.tipo
      );
    });

    Alert.alert("Éxito", "La materia fue actualizada correctamente.");
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="pb-4 px-4">
        <View className="mx-3">
            <Text className="text-2xl font-bold text-center mb-4">
            Editar Materia
            </Text>

            {/* Nombre */}
            <Text className="font-semibold mb-1">Nombre de la materia</Text>
            <TextInput
            className="bg-white border border-gray-300 rounded-lg p-2 mb-4"
            value={nombre}
            onChangeText={setNombre}
            />

            {/* Color */}
            <Text className="font-semibold mb-1">Color de la materia</Text>
            <View style={styles.coloresContainer}>
            {coloresDisponibles.map((color) => (
                <TouchableOpacity
                key={color}
                style={[
                    styles.colorCircle,
                    { backgroundColor: color },
                    color === colorSeleccionado && styles.colorSeleccionado,
                ]}
                onPress={() => setColorSeleccionado(color)}
                />
            ))}
            </View>

            <Text className="text-sm mb-4">
            Seleccionado:{" "}
            <Text style={{ color: colorSeleccionado }}>{colorSeleccionado}</Text>
            </Text>

            {/* Estado */}
            <Text className="font-semibold mb-1">Estado</Text>
            <View className="bg-white border border-gray-300 rounded-lg mb-4 justify-center max-h-10">
                <Picker selectedValue={estado} onValueChange={setEstado}>
                    <Picker.Item label="En Curso" value="En Curso" />
                    <Picker.Item label="Regularizada" value="Regularizada" />
                    <Picker.Item label="Aprobada" value="Aprobada" />
                </Picker>
            </View>

            {/* Horarios */}
            <Text className="font-semibold mb-1">Horarios</Text>

            <View className="bg-white border border-gray-300 rounded-lg p-3 mb-3">

            {/* Día de la semana */}
                <Text className="font-semibold mb-1">Nuevo horario</Text>
                <View className="border border-gray-300 rounded-lg mb-2 h-10 justify-center overflow-hidden">
                <Picker
                    selectedValue={nuevoHorario.dia}
                    onValueChange={(v) => setNuevoHorario({ ...nuevoHorario, dia: v })}
                >
                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((d) => (
                    <Picker.Item key={d} label={d} value={d} />
                    ))}
                </Picker>
                </View>

            {/* Hora inicio */}
            <TouchableOpacity
                className="border border-gray-300 rounded-lg p-2 mb-2"
                onPress={() => openTimePicker("horarioInicio")}
            >
                <Text>{nuevoHorario.horarioInicio || "Hora de inicio"}</Text>
            </TouchableOpacity>

            {/* Hora fin */}
            <TouchableOpacity
                className="border border-gray-300 rounded-lg p-2 mb-2 h-10"
                onPress={() => openTimePicker("horarioFin")}
            >
                <Text>{nuevoHorario.horarioFin || "Hora de fin"}</Text>
            </TouchableOpacity>

            {/* Tipo de clase */}
            <Text className="font-semibold mb-1">Tipo de clase</Text>
            <View className="border border-gray-300 rounded-lg mb-2 h-10 justify-center overflow-hidden">
            <Picker
                selectedValue={nuevoHorario.tipo}
                onValueChange={(v) => setNuevoHorario({ ...nuevoHorario, tipo: v })}
            >
                <Picker.Item label="Teoría" value="Teoría" />
                <Picker.Item label="Práctica" value="Práctica" />
            </Picker>
            </View>

            {/* Ubicación */}
            <Text className="font-semibold mb-1">Ubicación</Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2 h-10"
                placeholder="Ej: Lab. Ardenghi, Aula 110, Virtual"
                value={nuevoHorario.aula}
                onChangeText={(t) => setNuevoHorario({ ...nuevoHorario, aula: t })}
            />

            <TouchableOpacity
                className="bg-blue-600 rounded-lg py-2 items-center"
                onPress={agregarHorarioNuevo}
            >
                <Text className="text-white font-semibold">+ Agregar horario</Text>
            </TouchableOpacity>
            </View>

            {/* Lista de horarios */}
            {horarios.length > 0 && (
            <View className="mb-4">
                <Text className="font-semibold text-center mb-2">
                Horarios agregados
                </Text>

                {horarios.map((h, index) => (
                <View
                    key={index}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        marginBottom: 6,
                        backgroundColor: "#f3f4f6",
                        borderRadius: 6,
                        alignItems: "center",
                    }}
                    >
                    <Text style={{ flex: 2, textAlign: "center" }}>{h.dia}</Text>
                    <Text style={{ flex: 2, textAlign: "center" }}>
                    {h.horarioInicio} - {h.horarioFin}
                    </Text>
                    <View style={{ flex: 3, alignItems: "center" }}>
                    <Text>{h.tipo}</Text>
                    <Text>{h.aula}</Text>
                    </View>

                    <TouchableOpacity
                    onPress={() =>
                        setHorarios(horarios.filter((_, idx) => idx !== i))
                    }
                    >
                    <Text style={{ color: "red", fontWeight: "600" }}>
                        Eliminar
                    </Text>
                    </TouchableOpacity>
                </View>
                ))}
            </View>
            )}

            {/* Comentario */}
            <Text className="font-semibold mb-1">Comentario</Text>
            <TextInput
            className="bg-white border border-gray-300 rounded-lg p-2 mb-6"
            value={comentario}
            onChangeText={setComentario}
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
                onPress={guardarCambios}
            >
                <Text className="text-white font-semibold">Guardar cambios</Text>
            </TouchableOpacity>
            </View>

            {showPicker && (
            <DateTimePicker
                mode="time"
                is24Hour
                display="default"
                value={new Date()}
                onChange={onTimeChange}
            />
            )}
        </View>
      </ScrollView>
    </View>
  );
}

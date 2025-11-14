import { View, Text, TouchableOpacity, FlatList, Pressable, Alert} from "react-native";
import { GestureHandlerRootView, Swipeable, RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getMaterias, eliminarMateria, mostrarMaterias, mostrarClases, mostrarActividades} from "../database/materias"; 


export default function MisMaterias() {
  const [materiasEnCurso, setMateriasEnCurso] = useState([]);
  const [materiasRegulares, setMateriasRegulares] = useState([]);
  const [materiasAprobadas, setMateriasAprobadas] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    cargarMateriasEnCurso();
    cargarMateriasRegulares();
    cargarMateriasAprobadas();
  }, []);

  const cargarMateriasEnCurso = () => {
    try {
      const data = getMaterias('En Curso');
      setMateriasEnCurso(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    }
  };

  const cargarMateriasRegulares = () => {
    try {
      const data = getMaterias('Regularizada');
      setMateriasRegulares(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    }
  };

  const cargarMateriasAprobadas = () => {
    try {
      const data = getMaterias('Aprobada');
      setMateriasAprobadas(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    }
  };

  const renderRightActions = (item) => (
    <View className="flex-row">
      
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/editSubject/[id]",
            params: { id: item.idMateria },
          })
        }
        className="bg-blue-500 w-16 justify-center items-center rounded-l-xl"
      >
        <Ionicons name="pencil" size={20} color="white" />
      </Pressable>

      <Pressable
        onPress={() => handleEliminarMateria(item.idMateria)}
        className="bg-red-500 w-16 justify-center items-center rounded-r-xl"
      >
        <Ionicons name="trash" size={20} color="white" />
      </Pressable>

    </View>
  );


  const handleEliminarMateria = (idMateria) => {
    Alert.alert(
      "Eliminar materia",
      "¿Desea eliminar esta materia y su información asociada (clases, actividades, recordatorios)?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            try {
              mostrarMaterias();
              mostrarClases(idMateria);
              mostrarActividades(idMateria);

              const ok = eliminarMateria(idMateria);

              if (ok) {
                cargarMateriasEnCurso();
                cargarMateriasRegulares();
                Alert.alert("Éxito", "Materia eliminada correctamente.");
                mostrarMaterias();
                mostrarClases(idMateria);
                mostrarActividades(idMateria);
              } else {
                Alert.alert("Error", "No se pudo eliminar la materia.");
              }
            } catch (error) {
              console.error("Error eliminando materia:", error);
              Alert.alert("Error", "Ocurrió un problema al eliminar la materia.");
            }
          },
        },
      ]
    );
  };

  // 🔹 Función reutilizable para renderizar materias
  const renderMateria = (item) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View
        key={item.idMateria}
        className="flex-row justify-between items-center border-b border-gray-200 py-3 bg-white"
      >
        {/*círculo de color asociado a la materia*/}
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            backgroundColor: item.color || "#000",
            marginRight: 10,
          }}
        />

        <Text
          className="flex-1 font-medium text-gray-900 pr-3"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.nombre}
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/detailSubject/[detail]",
              params: { detail: item.nombre },
            })
          }
        >
          <Text className="text-blue-600 text-sm">Ver más</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-gray-100">
        <View className="flex-1 px-5">
          {/* Encabezado */}
          <View className="flex-row items-center justify-between px-1 mb-6">
            <Text className="text-2xl font-bold">Mis materias</Text>
            <TouchableOpacity
              className="bg-blue-600 p-2 rounded-full"
              onPress={() => router.push("/addSubject")}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* En curso */}
          <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <Text className="text-lg font-semibold mb-3 text-gray-800">
              En curso
            </Text>
            <FlatList
              data={materiasEnCurso}
              keyExtractor={(item) => item.idMateria.toString()}
              renderItem={({ item }) => renderMateria(item)}
              ListEmptyComponent={() => (
                <Text className="text-gray-400 text-center py-4">
                  No hay materias en curso
                </Text>
              )}
            />
          </View>

          {/* Regularizadas */}
          <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <Text className="text-lg font-semibold mb-3 text-gray-800">
              Regularizadas
            </Text>
            <FlatList
              data={materiasRegulares}
              keyExtractor={(item) => item.idMateria.toString()}
              renderItem={({ item }) => renderMateria(item)}
              ListEmptyComponent={() => (
                <Text className="text-gray-400 text-center py-4">
                  No hay materias regularizadas
                </Text>
              )}
            />
          </View>

          {/* Aprobadas */}
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-lg font-semibold mb-3 text-gray-800">
              Aprobadas
            </Text>
            <FlatList
              data={materiasAprobadas}
              keyExtractor={(item) => item.idMateria.toString()}
              renderItem={({ item }) => renderMateria(item)}
              ListEmptyComponent={() => (
                <Text className="text-gray-400 text-center py-4">
                  No hay materias aprobadas
                </Text>
              )}
            />
          </View>
        </View>

        {/* Barra inferior */}
        <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
      </View>
  </GestureHandlerRootView>
  );
}

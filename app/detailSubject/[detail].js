import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getEstadoMateria, getComentarioPorMateria } from '../../database/materias';
import { getClasesPorMateria } from '../../database/clases';
import { getActividadesFiltradas } from '../../database/actividades';
import {parseFecha} from '../../utils/formatDate';

export default function MateriaDetail() {
  const { detail } = useLocalSearchParams();
  const [actividades, setActividades] = useState({ pendientes: [], anteriores: [] });
  const [clases, setClases] = useState([]);
  const [comentario, setComentario] = useState(null);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    cargarActividades();
    cargarClases();
    cargarEstado();
    cargarComentario();
  }, []);

  const cargarActividades = () => {
    try {
      const data = getActividadesFiltradas(detail);

      const hoy = new Date();
      const pendientes = data.filter(a => parseFecha(a.fecha) >= hoy);
      const anteriores = data.filter(a => parseFecha(a.fecha) < hoy);

      pendientes.sort((a, b) => parseFecha(a.fecha) - parseFecha(b.fecha));
      anteriores.sort((a, b) => parseFecha(b.fecha) - parseFecha(a.fecha));

      setActividades({ pendientes, anteriores });
    } catch (error) {
      console.error("Error cargando actividades:", error);
    }
  };

  const cargarClases = () => {
    try {
      const clases = getClasesPorMateria(detail); 
      console.log("Clases de la materia:", clases);
      setClases(clases);
    } catch (error) {
      console.error("Error cargando las actividades de la materia:", error);
    }
  };

  const cargarEstado = () => {
    try {
      const data = getEstadoMateria(detail);
      setEstado(data);
    } catch (error) {
      console.error("Error al cargar estado:", error);
    }
  };

  const cargarComentario = () => {
    try {
      const data = getComentarioPorMateria(detail);
      setComentario(data);
    } catch (error) {
      console.error("Error al cargar comentario:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        <View className="flex-row justify-between mb-2 px-4 items-end">
          <Text className="text-lg font-semibold mb-2 flex-[0.65]" numberOfLines={3}>{detail}</Text>
          <Text className="text-sm font-semibold text-right mb-2 flex-[0.35] text-blue-500">{estado}</Text>
        </View>

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >

        {/* 🔹 Comentario */}
          {comentario && (
            <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
              <Text className="font-semibold mb-1">Comentario</Text>
              <View className="border-t border-gray-200 my-2" />
              <Text className="text-gray-500 text-sm">{comentario}</Text>
            </View>
          )}

        {/* 🔹 Horarios */}
          <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
            <Text className="font-semibold mb-1">Horarios de clase</Text>
            <View className="border-t border-gray-200 my-2" />
            {clases.length > 0 ? (
              clases.map((c) => (
                <View key={c.idClase}
                  className="flex-row justify-between items-start mb-2 border-b border-gray-100 my-1 pb-3">
                  <View className="flex-1">
                    <Text className="font-semibold">{c.dia}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-700 font-semibold">
                      {c.horarioInicio} - {c.horarioFin}
                    </Text>
                    <Text className="text-gray-500">{c.tipo}</Text>
                    <Text className="text-gray-500">{c.aula}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center py-3">No hay clases registradas</Text>
            )}
          </View>

          {/* 🔹 Actividades pendientes */}
          <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
            <Text className="font-semibold mb-1">Actividades pendientes</Text>
            <View className="border-t border-gray-200 my-2" />
            {actividades.pendientes?.length > 0 ? (
              actividades.pendientes.map((a) => (
                <View key={a.idActividad} className="flex-row justify-between items-start mb-2 border-b border-gray-100 my-1 pb-3">
                  <View className="flex-1">
                    <Text className="font-semibold">{a.descripcionActividad}</Text>
                    <Text className="text-gray-500">
                      {a.horario} {a.aula ? ` - ${a.aula}` : ""}
                    </Text>
                  </View>
                  <View style={{ maxWidth: "50%" }} className="items-end">
                    <Text className="font-semibold text-right text-gray-800" numberOfLines={2} ellipsizeMode="tail">
                      {a.fecha}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center py-3">No hay actividades pendientes</Text>
            )}
          </View>

          {/* 🔹 Actividades anteriores */}
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="font-semibold mb-1">Actividades anteriores</Text>
            <View className="border-t border-gray-200 my-2" />
            {actividades.anteriores?.length > 0 ? (
              actividades.anteriores.map((a) => (
                <View key={a.idActividad} className="flex-row justify-between items-start mb-2 border-b border-gray-100 my-1 pb-3">
                  <View className="flex-1">
                    <Text className="font-semibold">{a.descripcionActividad}</Text>
                    <Text className="text-gray-500">
                      {a.horario} {a.aula ? ` - ${a.aula}` : ""}
                    </Text>
                  </View>
                  <View style={{ maxWidth: "50%" }} className="items-end">
                    <Text className="font-semibold text-right text-gray-800" numberOfLines={2} ellipsizeMode="tail">
                      {a.fecha}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center py-3">No hay actividades anteriores</Text>
            )}
          </View>


        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </View>
  );
}

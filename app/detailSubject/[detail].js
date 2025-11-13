import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getClasesPorMateria } from "../../database/clases";
import { getComentarioPorMateria } from '../../database/materias';
import { getActividadesPorMateria } from "../../database/actividades";
import { getFechaNumerica } from '../../utils/formatDate';
import {parseFecha} from '../../utils/formatDate';
import {formatearFecha} from '../../utils/formatDate';

export default function MateriaDetail() {
  const { detail } = useLocalSearchParams();
  const [clases, setClases] = useState([]);
  const [comentario, setComentario] = useState(null);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const clases = getClasesPorMateria(detail);
    const comentario = getComentarioPorMateria(detail);
    const actividades = getActividadesPorMateria(detail);

    const hoyStr = getFechaNumerica();         // "13-11-25"
    const hoy = parseFecha(hoyStr);            // Date(2025-11-13)

    const pendientes = actividades.filter(a => parseFecha(a.fecha) >= hoy);
    const anteriores = actividades.filter(a => parseFecha(a.fecha) < hoy);

    pendientes.sort((a, b) => parseFecha(a.fecha) - parseFecha(b.fecha));
    anteriores.sort((a, b) => parseFecha(b.fecha) - parseFecha(a.fecha));

    setClases(clases);
    setComentario(comentario);
    setActividades({ pendientes, anteriores });
  }, [detail]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full max-w-md self-center">
        <View className="flex-row justify-between mb-2 px-7 mt-[-18]">
          <Text className="text-lg font-semibold mb-2">{detail}</Text>
        </View>

        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
        {/* 🔹 Horarios */}
        <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
          <Text className="font-semibold mb-1">Horarios</Text>
          <View className="border-t border-gray-200 my-2" />
          {clases.length > 0 ? (
            clases.map((clase, index) => (
              <View key={clase.idClase} className="py-2 border-b border-gray-100">
                <Text className="text-gray-700">
                  {clase.dia} — {clase.horarioInicio} - {clase.horarioFin}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {clase.tipo} • {clase.aula}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">Sin clases registradas</Text>
          )}
        </View>

        {comentario && (
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="font-semibold mb-1">Comentario</Text>
            <View className="border-t border-gray-200 my-2" />
            <Text className="text-gray-500 text-sm">
              {comentario}
            </Text>
          </View>
        )}


          {/* 🔹 Actividades pendientes */}
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="font-semibold mb-1">Actividades pendientes</Text>
            <View className="border-t border-gray-200 my-2" />
            {actividades.pendientes?.length > 0 ? (
              actividades.pendientes.map((act) => (
                <View key={act.idActividad} className="py-2 border-b border-gray-100">
                  <Text className="text-gray-700">
                    {act.descripcionActividad} — {formatearFecha(act.fecha)} — {act.horario}hs
                  </Text>
                  {act.aula && <Text className="text-gray-500 text-sm">{act.aula}</Text>}
                </View>
              ))
            ) : (
              <Text className="text-gray-500">No hay actividades pendientes</Text>
            )}
          </View>

          {/* 🔹 Actividades anteriores */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="font-semibold mb-1">Actividades anteriores</Text>
            <View className="border-t border-gray-200 my-2" />
            {actividades.anteriores?.length > 0 ? (
              actividades.anteriores.map((act) => (
                <View key={act.idActividad} className="py-2 border-b border-gray-100">
                  <Text className="text-gray-700">
                    {act.descripcionActividad} — {formatearFecha(act.fecha)}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-500">No hay actividades anteriores</Text>
            )}
          </View>


        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-blue-600 h-12" />
    </SafeAreaView>
  );
}

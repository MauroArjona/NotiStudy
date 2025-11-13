import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Vibration } from "react-native";
import { reproducirSonido, detenerSonido } from "./playSound";
import { eliminarRecordatorio } from "../database/recordatorios";

// 🧩 Hook global para manejar notificaciones y permisos
export function useNotifications() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
       //shouldShowList: true,   
        shouldPlaySound: true,   
        shouldSetBadge: false,   
      }),
    });

    // 🟨 Pedir permisos
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          alert("Se necesitan permisos para mostrar notificaciones.");
        }
      }
    })();

    // 🟩 Cuando llega una notificación
    const received = Notifications.addNotificationReceivedListener(() => {
      console.log("📩 Notificación recibida");
      Vibration.vibrate(1000);
      reproducirSonido();
    });

    // 🟥 Cuando el usuario toca una notificación
    const touched = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("👆 Notificación tocada");
      detenerSonido();
      const id = response.notification.request.content.data?.idRecordatorio;
      if (id) {
        eliminarRecordatorio(id);
        console.log(`Recordatorio ${id} eliminado tras tocar la notificación ✅`);
      }
    });

    return () => {
      received.remove();
      touched.remove();
    };
  }, []);
}

// 🕒 Función para programar notificación en una fecha/hora específica
export async function programarNotificacion({ idRecordatorio, materia, descripcion, fechaAviso, horaAviso }) {
  try {
    const fechaHoraAviso = new Date(`${fechaAviso}T${horaAviso}:00`);
    const ahora = new Date();

    // Validar que la fecha sea futura
    if (fechaHoraAviso <= ahora) {
      console.warn("⚠️ La hora del recordatorio ya pasó, no se programa notificación.");
      return null;
    }

    const idNotificacion = await Notifications.scheduleNotificationAsync({
        identifier: idRecordatorio.toString(),
        content: {
        title: `📘 ${materia}`,
        body: `${descripcion}\n⏰ ${fechaAviso} ${horaAviso}`,
        sound: null,
        data: { idRecordatorio },
      },
      trigger: fechaHoraAviso, // ✅ fecha absoluta, no segundos
    });

    console.log(`🔔 Notificación programada para ${fechaHoraAviso.toLocaleString()} (ID ${idNotificacion})`);
    return idNotificacion;
  } catch (error) {
    console.error("Error al programar notificación ❌", error);
    return null;
  }
}

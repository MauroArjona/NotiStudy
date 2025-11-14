import { getFechaNumerica } from "../utils/formatDate";
import * as Notifications from "expo-notifications";
import db from "./db";

export const getRecordatoriosProximos = () => {
  try {
    const hoy = getFechaNumerica(); // formato YYYY-MM-DD

    const recordatorios = db.getAllSync(
      `SELECT 
          r.*, 
          a.descripcionActividad, 
          a.fecha AS fechaActividad, 
          a.horario AS horarioActividad, 
          m.nombre AS materia
       FROM recordatorios AS r
       INNER JOIN actividades AS a ON r.idActividad = a.idActividad
       INNER JOIN materias AS m ON a.idMateria = m.idMateria
       WHERE r.fechaAviso >= ?
       ORDER BY r.fechaAviso ASC, r.horaAviso ASC;`,
      [hoy]
    );
    return recordatorios;
  } catch (error) {
    console.error("Error al consultar recordatorios:", error);
    return [];
  }
};


// 🟦 Agregar un nuevo recordatorio
import { programarNotificacion } from "../utils/notifications";

export const agregarRecordatorio = async (idActividad, fechaAviso, horaAviso, activo = 0) => {
  try {
    const result = db.runSync(
      `INSERT INTO recordatorios (idActividad, fechaAviso, horaAviso, activo)
       VALUES (?, ?, ?, ?);`,
      [idActividad, fechaAviso, horaAviso, activo]
    );

    const idRecordatorio = result.lastInsertRowId;

    // 🔍 Buscar datos de la actividad y materia
    const [r] = db.getAllSync(`
      SELECT a.descripcionActividad, m.nombre AS materia
      FROM recordatorios AS r
      INNER JOIN actividades AS a ON r.idActividad = a.idActividad
      INNER JOIN materias AS m ON a.idMateria = m.idMateria
      WHERE r.idRecordatorio = ?;
    `, [idRecordatorio]);

    // 🔔 Programar notificación desde el hook
    await programarNotificacion({
      idRecordatorio,
      materia: r.materia,
      descripcion: r.descripcionActividad,
      fechaAviso,
      horaAviso,
    });

    console.log("Recordatorio agregado y notificación programada ✅");
    return idRecordatorio;
  } catch (error) {
    console.error("Error al agregar recordatorio ❌", error);
    return null;
  }
};


// 🟨 Obtener recordatorios activos (activo = 1)
export const getRecordatoriosActivos = () => {
  try {
    const recordatorios = db.getAllSync(`
      SELECT r.*, a.descripcionActividad, a.fecha AS fechaActividad, m.nombre AS materia
      FROM recordatorios AS r
      INNER JOIN actividades AS a ON r.idActividad = a.idActividad
      INNER JOIN materias AS m ON a.idMateria = m.idMateria
      WHERE r.activo = 1
      ORDER BY r.fechaAviso ASC;
    `);
    console.log(recordatorios);
    return recordatorios;
  } catch (error) {
    console.error("Error al obtener recordatorios activos ❌", error);
    return [];
  }
};

// 🟩 Actualizar el estado de un recordatorio (activar / desactivar)
export const actualizarEstadoRecordatorio = async (idRecordatorio, activo) => {
  try {
    db.runSync(
      `UPDATE recordatorios SET activo = ? WHERE idRecordatorio = ?;`,
      [activo ? 1 : 0, idRecordatorio]
    );

    //programar la notificación
    if (activo) {
      const [r] = db.getAllSync(`
        SELECT a.descripcionActividad, m.nombre AS materia, r.fechaAviso, r.horaAviso
        FROM recordatorios AS r
        INNER JOIN actividades AS a ON r.idActividad = a.idActividad
        INNER JOIN materias AS m ON a.idMateria = m.idMateria
        WHERE r.idRecordatorio = ?;
      `, [idRecordatorio]);

      if (!r) {
        console.warn("⚠️ No se encontró el recordatorio para activar.");
        return;
      }

      await programarNotificacion({
        idRecordatorio,
        materia: r.materia,
        descripcion: r.descripcionActividad,
        fechaAviso: r.fechaAviso,
        horaAviso: r.horaAviso,
      });

      console.log(`✅ Recordatorio ${idRecordatorio} activado y notificación programada`);
    } 
    else {
      await Notifications.cancelScheduledNotificationAsync(idRecordatorio.toString());
      console.log(`🛑 Recordatorio ${idRecordatorio} desactivado y notificación cancelada`);
    }

  } catch (error) {
    console.error("Error al actualizar estado del recordatorio ❌", error);
  }
};


// 🗑️ Eliminar recordatorio
export const eliminarRecordatorio = async (idRecordatorio) => {
  try {
    // 🔔 Cancelar la notificación programada (si existe)
    await Notifications.cancelScheduledNotificationAsync(idRecordatorio.toString());

    // 🧹 Borrar el registro de la base de datos
    db.runSync(`DELETE FROM recordatorios WHERE idRecordatorio = ?;`, [idRecordatorio]);

    console.log(`🗑️ Recordatorio ${idRecordatorio} eliminado y notificación cancelada ✅`);
  } catch (error) {
    console.error("Error al eliminar recordatorio ❌", error);
  }
};

export const obtenerRecordatorioPorActividad = (idActividad) => {
  try {
    const resultados = db.getAllSync(
      `SELECT * FROM recordatorios WHERE idActividad = ?;`,
      [idActividad]
    );
    return resultados[0] || null; // devuelve un solo recordatorio o null
  } catch (error) {
    console.error("Error al obtener recordatorio por actividad:", error);
    return null;
  }
};

export const actualizarRecordatorio = (idRecordatorio, fechaAviso, horaAviso, activo) => {
  try {
    db.runSync(
      `UPDATE recordatorios 
       SET fechaAviso = ?, horaAviso = ?, activo = ? 
       WHERE idRecordatorio = ?;`,
      [fechaAviso, horaAviso, activo ? 1 : 0, idRecordatorio]
    );
    return true;
  } catch (error) {
    console.error("Error al actualizar recordatorio:", error);
    return false;
  }
};

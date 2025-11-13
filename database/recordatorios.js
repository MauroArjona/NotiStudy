import { getFechaNumerica } from "../utils/formatDate";
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
export const agregarRecordatorio = (idActividad, fechaAviso, horaAviso, activo = 0) => {
  try {
    const result = db.runSync(
      `INSERT INTO recordatorios (idActividad, fechaAviso, horaAviso, activo)
       VALUES (?, ?, ?, ?);`,
      [idActividad, fechaAviso, horaAviso, activo]
    );
    console.log("Recordatorio agregado ✅");
    return result.lastInsertRowId;
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
    return recordatorios;
  } catch (error) {
    console.error("Error al obtener recordatorios activos ❌", error);
    return [];
  }
};

// 🟥 Actualizar el estado de un recordatorio (activar/desactivar)
export const actualizarEstadoRecordatorio = (idRecordatorio, activo) => {
  try {
    db.runSync(
      `UPDATE recordatorios SET activo = ? WHERE idRecordatorio = ?;`,
      [activo ? 1 : 0, idRecordatorio]
    );
    console.log(`Recordatorio ${idRecordatorio} actualizado a ${activo ? "activo" : "inactivo"} ✅`);
  } catch (error) {
    console.error("Error al actualizar recordatorio ❌", error);
  }
};

// 🗑️ Eliminar recordatorio
export const eliminarRecordatorio = (idRecordatorio) => {
  try {
    db.runSync(`DELETE FROM recordatorios WHERE idRecordatorio = ?;`, [idRecordatorio]);
    console.log(`Recordatorio ${idRecordatorio} eliminado ✅`);
  } catch (error) {
    console.error("Error al eliminar recordatorio ❌", error);
  }
};

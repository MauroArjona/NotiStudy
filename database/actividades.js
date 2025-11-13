import { getFechaNumerica } from '../utils/formatDate';
import db from './db';

export const getAllActividades = () => {
  try {
    const actividades = db.getAllSync(
      `SELECT a.*, m.nombre 
       FROM actividades as a
       INNER JOIN materias as m ON a.idMateria = m.idMateria
       ORDER BY a.fecha
       LIMIT 5;`
    );
    console.log("Actividades obtenidas ✅");
    return actividades; 
  } catch (error) {
    console.error("Error al consultar actividades:", error);
    return [];
  }
};

export const getActividadesHoy = () => {
  try {
    const hoy = getFechaNumerica();
    const actividades = db.getAllSync(
      `SELECT a.*, m.nombre 
       FROM actividades as a
       INNER JOIN materias as m ON a.idMateria = m.idMateria
       WHERE a.fecha = ?
       ORDER BY a.fecha`, 
       [hoy]
    );
    console.log("Actividades obtenidas ✅");
    return actividades; 
  } catch (error) {
    console.error("Error al consultar actividades:", error);
    return [];
  }
};

export const getActividadesFiltradas = (nombreMateria = "", fecha = "", descripcion = "") => {
  try {
    // Base de la consulta
    let query = `
      SELECT a.*, m.nombre
      FROM actividades AS a
      INNER JOIN materias AS m ON a.idMateria = m.idMateria
    `;

    // Condiciones dinámicas
    const condiciones = [];
    const valores = [];

    if (nombreMateria) {
      condiciones.push("m.nombre LIKE ?");
      valores.push(`%${nombreMateria}%`);
    }
    if (fecha) {
      condiciones.push("a.fecha = ?");
      valores.push(fecha);
    }
    if (descripcion) {
      condiciones.push("a.descripcionActividad LIKE ?");
      valores.push(`%${descripcion}%`);
    }

    // Si hay condiciones, agregarlas al WHERE
    if (condiciones.length > 0) {
      query += " WHERE " + condiciones.join(" AND ");
    }
    query += " ORDER BY a.fecha;";

    // Ejecutar consulta
    const resultados = db.getAllSync(query, valores);
    console.log("Actividades filtradas obtenidas ✅", resultados.length);
    return resultados;
  } catch (error) {
    console.error("Error al filtrar actividades:", error);
    return [];
  }
};

export const agregarActividad = (idMateria, horario, fecha, aula, descripcionActividad) => {
  try {
    const result = db.runSync(
      'INSERT INTO actividades (idMateria, horario, fecha, aula, descripcionActividad) VALUES (?, ? ,? ,? ,?);', 
        [idMateria, horario, fecha, aula, descripcionActividad]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al agregar actividad:", error);
    return null;
  }
};
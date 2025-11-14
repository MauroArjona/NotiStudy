import { formatearFechaISO, getFechaNumerica } from '../utils/formatDate';
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
    return actividades; 
  } catch (error) {
    console.error("Error al consultar actividades:", error);
    return [];
  }
};

export const getColorActividad = () => {
  try {
    const actividades = db.getAllSync(
      `SELECT a.fecha, m.color 
       FROM actividades as a
       INNER JOIN materias as m ON a.idMateria = m.idMateria
       ORDER BY a.fecha;`
    );
    return actividades; 
  } catch (error) {
    console.error("Error al consultar fechas y colores de las actividades:", error);
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
    return actividades; 
  } catch (error) {
    console.error("Error al consultar actividades:", error);
    return [];
  }
};

export const getActividadesFiltradas = (nombreMateria = "", fecha = "", descripcion = "") => {
  try {
    const fechaFormateada = fecha && fecha.trim() !== "" ? formatearFechaISO(fecha) : "";
    // Base de la consulta
    let query = `
      SELECT a.*, m.nombre, m.color
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
    if (fechaFormateada) {
      condiciones.push("a.fecha = ?");
      valores.push(fechaFormateada);
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
  const fechaFormateada = formatearFechaISO(fecha);
  try {
    const result = db.runSync(
      'INSERT INTO actividades (idMateria, horario, fecha, aula, descripcionActividad) VALUES (?, ? ,? ,? ,?);', 
        [idMateria, horario, fechaFormateada, aula, descripcionActividad]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al agregar actividad:", error);
    return null;
  }
};

export const obtenerActividadPorId = (idActividad) => {
  try {
    const resultados = db.getAllSync(
      `SELECT a.*, m.nombre 
       FROM actividades AS a
       INNER JOIN materias AS m ON a.idMateria = m.idMateria
       WHERE a.idActividad = ?;`,
      [idActividad]
    );
    return resultados[0] || null;
  } catch (error) {
    console.error("Error al obtener actividad por ID:", error);
    return null;
  }
};


export const actualizarActividad = (idActividad, idMateria, horario, fecha, aula, descripcionActividad) => {
  const fechaFormateada = formatearFechaISO(fecha);
  try {
    db.runSync(
      `UPDATE actividades
       SET idMateria = ?, horario = ?, fecha = ?, aula = ?, descripcionActividad = ?
       WHERE idActividad = ?;`,
      [idMateria, horario, fechaFormateada, aula, descripcionActividad, idActividad]
    );
    return true;
  } catch (error) {
    console.error("Error al actualizar actividad:", error);
    return false;
  }
};

export const eliminarActividad = (idActividad) => {
  try {
    db.runSync(`DELETE FROM actividades WHERE idActividad = ?;`, [idActividad]);
    return true;
  } catch (error) {
    console.error("Error eliminando actividad:", error);
    return false;
  }
};


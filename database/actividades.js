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
    return actividades; 
  } catch (error) {
    console.error("Error al consultar actividades:", error);
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

export const getActividadesPorMateria = (nombreMateria) => {
  try {
    const actividades = db.getAllSync(
      `SELECT a.*, m.nombre 
       FROM actividades AS a
       INNER JOIN materias AS m ON a.idMateria = m.idMateria
       WHERE m.nombre = ?
       ORDER BY a.fecha, a.horario;`,
      [nombreMateria]
    );
    console.log(`Actividades de ${nombreMateria} obtenidas ✅`);
    return actividades;
  } catch (error) {
    console.error("Error al obtener actividades por materia:", error);
    return [];
  }
};

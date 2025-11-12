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
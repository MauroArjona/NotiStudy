import db from './db';

export const getClasesHoy = () => {
  const dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  const hoy = dias[new Date().getDay()];
  try {
    const clases = db.getAllSync(
      `SELECT c.*, m.nombre 
       FROM clases as c 
       INNER JOIN materias as m ON c.idMateria = m.idMateria
       WHERE c.dia = ?
       ORDER BY c.horarioInicio;`, 
       [hoy]
    );
    console.log("Clases del día obtenidas ✅");
    return clases; 
  } catch (error) {
    console.error("Error al obtener clases del día:", error);
    return [];
  }
};

export const agregarClase = (idMateria, horarioInicio, horarioFin, dia, aula) => {
  try {
    const result = db.runSync(
      'INSERT INTO materias (idMateria, horarioInicio, horarioFin, dia, aula) VALUES (?, ?, ?, ?, ?);', 
        [idMateria, horarioInicio, horarioFin, dia, aula]
    );
    // result.lastInsertRowId contiene el ID del nuevo registro
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al agregar clase:", error);
    return null;
  }
};
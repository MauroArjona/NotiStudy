import db from './db';

export const getClasesHoy = () => {
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
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

export const getClasesMateria = (materia) => {
  try {
    const clases = db.getAllSync(
      `SELECT c.*, m.nombre 
       FROM clases as c 
       INNER JOIN materias as m ON c.idMateria = m.idMateria
       WHERE m.nombre = ?
       ORDER BY c.dia;`, 
       [materia]
    );
    console.log("Clases de la materia obtenidas ✅");
    return clases; 
  } catch (error) {
    console.error("Error al obtener clases de la materia:", error);
    return [];
  }
};

export const agregarClase = (idMateria, horarioInicio, horarioFin, dia, aula, tipo) => {
  try {
    const result = db.runSync(
      `INSERT INTO clases (idMateria, horarioInicio, horarioFin, dia, aula, tipo)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [idMateria, horarioInicio, horarioFin, dia, aula, tipo]
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al agregar clase:", error);
    return null;
  }
};

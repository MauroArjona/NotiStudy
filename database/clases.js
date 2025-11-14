import db from './db';

export const getClasesHoy = () => {
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hoy = dias[new Date().getDay()];
  try {
    const clases = db.getAllSync(
      `SELECT c.*, m.nombre 
       FROM clases as c 
       INNER JOIN materias as m ON c.idMateria = m.idMateria
       WHERE c.dia = ? AND m.estado = "En Curso"
       ORDER BY c.horarioInicio;`, 
       [hoy]
    );
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

export const getClasesPorMateria = (nombreMateria) => {
  try {
    const clases = db.getAllSync(`
      SELECT c.*, m.nombre 
      FROM clases as c 
      INNER JOIN materias as m ON c.idMateria = m.idMateria
      WHERE m.nombre = ?
      ORDER BY 
        CASE c.dia
          WHEN 'Lunes' THEN 1
          WHEN 'Martes' THEN 2
          WHEN 'Miércoles' THEN 3
          WHEN 'Jueves' THEN 4
          WHEN 'Viernes' THEN 5
          WHEN 'Sábado' THEN 6
          WHEN 'Domingo' THEN 7
        END,
        c.horarioInicio;
    `, [nombreMateria]);
    
    return clases;
  } catch (error) {
    console.error("Error al obtener clases por materia:", error);
    return [];
  }
};

export const getClasesByMateria = (idMateria) => {
  try {
    const query = `
      SELECT *
      FROM clases
      WHERE idMateria = ?
      ORDER BY 
        CASE dia
          WHEN 'Lunes' THEN 1
          WHEN 'Martes' THEN 2
          WHEN 'Miércoles' THEN 3
          WHEN 'Jueves' THEN 4
          WHEN 'Viernes' THEN 5
          WHEN 'Sábado' THEN 6
          ELSE 7
        END,
        horarioInicio
    `;
    return db.getAllSync(query, [idMateria]);
  } catch (error) {
    console.error("Error obteniendo clases por materia:", error);
    return [];
  }
};

export function eliminarClasesPorMateria(idMateria) {
  const db = getDB();
  db.exec("DELETE FROM clases WHERE idMateria = ?", [idMateria]);
}


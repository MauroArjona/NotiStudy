import db from './db';

export const getMaterias = (estado) => {
  try {
    const materias = db.getAllSync(
      'SELECT * FROM materias WHERE estado = ?;', [estado] 
    );
    console.log("Materias en curso obtenidas ✅");
    return materias; // devuelve un array de objetos
  } catch (error) {
    console.error("Error al obtener materias:", error);
    return [];
  }
};

export const getEstadoMateria = (materia) => {
  try {
    const rta = db.getFirstSync(
      'SELECT estado FROM materias WHERE nombre = ?;', [materia] 
    );
    console.log("Estado de materia obtenido ✅");
    return rta.estado; // devuelve un array de objetos
  } catch (error) {
    console.error("Error al obtener el estado:", error);
    return "Error";
  }
};

export const agregarMateria = (nombre, estado, color, comentario) => {
  try {
    const result = db.runSync(
      'INSERT INTO materias (nombre, estado, color, comentario) VALUES (?, ?, ?, ?);', 
      [nombre, estado, color, comentario]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al agregar materia:", error);
    return null;
  }
};

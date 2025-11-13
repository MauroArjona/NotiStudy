import db from './db';

export const getMaterias = (estado) => {
  try {
    const materias = db.getAllSync(
      'SELECT * FROM materias WHERE estado = ?;', [estado] 
    );
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

export const getComentarioPorMateria = (nombreMateria) => {
  try {
    const rows = db.getAllSync(
      'SELECT comentario FROM materias WHERE nombre = ?;',
      [nombreMateria]
    );
    if (rows.length > 0) {
      console.log(rows[0].comentario);
      return rows[0].comentario;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener comentario de la materia:", error);
    return null;
  }
};


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

export const agregarMateria = (nombre, estado) => {
  try {
    const result = db.runSync(
      'INSERT INTO materias (nombre, estado) VALUES (?, ?);', [nombre, estado]
    );
    // result.lastInsertRowId contiene el ID del nuevo registro
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al agregar materia:", error);
    return null;
  }
};
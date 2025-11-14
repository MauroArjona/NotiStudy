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

export const getMateriaById = (idMateria) => {
  try {
    const query = `
      SELECT *
      FROM materias
      WHERE idMateria = ?
    `;
    return db.getFirstSync(query, [idMateria]);
  } catch (error) {
    console.error("Error obteniendo materia por ID:", error);
    return null;
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

export const actualizarMateria = (idMateria, nombre, estado, color, comentario) => {
  try {
    const query = `
      UPDATE materias
      SET nombre = ?, estado = ?, color = ?, comentario = ?
      WHERE idMateria = ?
    `;
    db.runSync(query, [nombre, estado, color, comentario, idMateria]);
    return true;
  } catch (error) {
    console.error("Error actualizando materia:", error);
    return false;
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

export const eliminarClasesPorMateria = (idMateria) => {
  try {
    const query = `DELETE FROM clases WHERE idMateria = ?`;
    db.runSync(query, [idMateria]);
  } catch (error) {
    console.error("Error eliminando clases:", error);
  }
};

export const eliminarMateria = (idMateria) => {
  try {
    //Obtener todas las actividades de la materia
    const actividades = db.getAllSync(
      "SELECT * FROM actividades WHERE idMateria = ?;",
      [idMateria]
    );

    //Borrar recordatorios de cada actividad
    actividades.forEach(a => {
      db.runSync(
        "DELETE FROM recordatorios WHERE idActividad = ?;",
        [a.idActividad]
      );
    });

    //Borrar actividades
    db.runSync(
      "DELETE FROM actividades WHERE idMateria = ?;",
      [idMateria]
    );

    //Borrar clases
    db.runSync(
      "DELETE FROM clases WHERE idMateria = ?;",
      [idMateria]
    );

    //Borrar la materia
    db.runSync(
      "DELETE FROM materias WHERE idMateria = ?;",
      [idMateria]
    );

    console.log(`Materia ${idMateria} y todas sus dependencias eliminadas ✅`);
    return true;
  } catch (error) {
    console.error("Error eliminando materia y sus dependencias:", error);
    return false;
  }
};


//-------------------------------------------------------------------------
export const mostrarMaterias = () => {
  try {
    const materias = db.getAllSync("SELECT * FROM materias;");
    console.log("Materias actuales en la DB:", materias);
    return materias;
  } catch (error) {
    console.error("Error mostrando materias:", error);
  }
};

export const mostrarClases = (idMateria) => {
  try {
    const clases = db.getAllSync("SELECT * FROM clases WHERE idMateria = ?;", [idMateria]);
    console.log(`Clases de la materia ${idMateria}:`, clases);
    return clases;
  } catch (error) {
    console.error("Error mostrando clases:", error);
  }
};

export const mostrarActividades = (idMateria) => {
  try {
    const actividades = db.getAllSync("SELECT * FROM actividades WHERE idMateria = ?;", [idMateria]);
    console.log(`Actividades de la materia ${idMateria}:`, actividades);
    actividades.forEach(a => {
      const recs = db.getAllSync("SELECT * FROM recordatorios WHERE idActividad = ?;", [a.idActividad]);
      console.log(`  Recordatorios de actividad ${a.idActividad}:`, recs);
    });
    return actividades;
  } catch (error) {
    console.error("Error mostrando actividades:", error);
  }
};

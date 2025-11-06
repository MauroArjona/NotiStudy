import db from './db';

export const getMaterias = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM materias;',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.log('Error al obtener materias:', error)
    );
  });
};

export const agregarMateria = (nombre, estado, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO materias (nombre, estado) VALUES (?, ?);',
      [nombre, estado],
      (_, result) => callback(result.insertId),
      (_, error) => console.log('Error al agregar materia:', error)
    );
  });
};

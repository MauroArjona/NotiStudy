import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('miuni.db');

export const initDB = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXIST materias (
                idMateria INTEGER PRIMERY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                estado TEXT NOT NULL
            );`
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXIST clases (
                idClase INTEGER PRIMERY KEY AUTOINCREMENT,
                idMateria INTEGER
                horarioInicio TEXT NOT NULL,
                horarioFin TEXT NOT NULL,
                dia TEXT,
                aula TEXT NOT NULL,
                FOREIGN KEY (idMateria) REFERENCES materias(idMateria)
            );`
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXIST actividades (
                idActividad INTEGER PRIMERY KEY AUTOINCREMENT,
                idMateria INTEGER,
                horario,
                fecha, 
                aula,
                descripcionActividad TEXT,
                FOREIGN KEY (idMateria) REFERENCES materias(idMateria)
            );`
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXIST recordatorios (
                idRecordatorio INTEGER PRIMERY KEY AUTOINCREMENT,
                idActividad INTEGER,
                fechaAviso,
                horaAviso,
                activo INTEGER,
                FOREIGN KEY (idActividad) REFERENCES actividades(idActividad)
            );`
        );
    })
}

export default db;
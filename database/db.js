import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('miuni.db');

export const initDB = () => {
    try {
        db.runSync(
            `CREATE TABLE IF NOT EXISTS materias (
                idMateria INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                estado TEXT NOT NULL
            );`
        );
        db.runSync(
            `CREATE TABLE IF NOT EXISTS clases (
                idClase INTEGER PRIMARY KEY AUTOINCREMENT,
                idMateria INTEGER,
                horarioInicio TEXT NOT NULL,
                horarioFin TEXT NOT NULL,
                dia TEXT,
                aula TEXT NOT NULL,
                FOREIGN KEY (idMateria) REFERENCES materias(idMateria)
            );`
        );
        db.runSync(
            `CREATE TABLE IF NOT EXISTS actividades (
                idActividad INTEGER PRIMARY KEY AUTOINCREMENT,
                idMateria INTEGER,
                horario TEXT,
                fecha TEXT, 
                aula TEXT,
                descripcionActividad TEXT,
                FOREIGN KEY (idMateria) REFERENCES materias(idMateria)
            );`
        );
        db.runSync(
            `CREATE TABLE IF NOT EXISTS recordatorios (
                idRecordatorio INTEGER PRIMARY KEY AUTOINCREMENT,
                idActividad INTEGER,
                fechaAviso TEXT,
                horaAviso TEXT,
                activo INTEGER,
                FOREIGN KEY (idActividad) REFERENCES actividades(idActividad)
            );`
        );

    // Insertar materias iniciales si no existen 
    const result = db.getFirstSync("SELECT COUNT(*) AS count FROM materias;"); 
    if (result.count === 0) {
        console.log("Insertando materias iniciales...");
        db.execSync(`
            INSERT INTO materias (nombre, estado) VALUES
            ('Sistemas Embebidos y de Tiempo Real', 'En Curso'),
            ('Desarrollo de Aplicaciones Móviles', 'En Curso'),
            ('Inteligencia Artificial', 'Regularizada'),
            ('Ingeniería de Software', 'Regularizada'),
            ('Bases de Datos II', 'Aprobada');
        `);
    }
    console.log("Base de datos inicializada correctamente ✅");
  } catch (error) {
    console.error("Error inicializando la base de datos ❌", error);
  }
};

export default db;
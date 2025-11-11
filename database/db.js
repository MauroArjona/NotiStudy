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
    const resultMat = db.getFirstSync("SELECT COUNT(*) AS count FROM materias;"); 
    if (resultMat.count === 0) {
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

    const resultClases = db.getFirstSync("SELECT COUNT(*) AS count FROM clases;"); 
    if (resultClases.count === 0) {
        console.log("Insertando clases iniciales...");
        db.execSync(`
            INSERT INTO clases (idMateria, horarioInicio, horarioFin, dia, aula) VALUES
            ('1', '19:00', '21:00', 'Martes', 'Virtual'),
            ('2', '14:00', '16:00', 'Martes', 'Lab. Ardenghi'),
            ('3', '18:00', '20:00', 'Jueves', 'Aula 6 Anexo'),
            ('4', '15:00', '18:00', 'Lunes', 'Aula 406'),
            ('1', '17:00', '19:00', 'Viernes', 'Lab. Ardenghi');
        `);
    }

    const resultAct = db.getFirstSync("SELECT COUNT(*) AS count FROM actividades;"); 
    if (resultAct.count === 0) {
        console.log("Insertando actividades iniciales...");
        db.execSync(`
            INSERT INTO actividades (idMateria, horario, fecha, aula, descripcionActividad) VALUES
            ('1', '18:00', '20-11-25', 'Aula 110', '2do Parcial'),
            ('1', '23:59', '17-11-25', '', 'Entrega TP4'),
            ('2', '18:00', '17-11-25', 'Lab. Ardenghi', 'Presentación aplicación')
        `);
    }
    
    console.log("Base de datos inicializada correctamente ✅");
  } catch (error) {
    console.error("Error inicializando la base de datos ❌", error);
  }
};

export default db;
CREATE DATABASE IF NOT EXISTS pathuplus;
USE pathuplus;

-- =====================================
-- ROLES
-- =====================================

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (nombre)
VALUES
('Administrador'),
('Estudiante');

-- =====================================
-- USUARIOS
-- =====================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol_id INT DEFAULT 2,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- =====================================
-- CARRERAS
-- =====================================

CREATE TABLE carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    duracion VARCHAR(50),
    area VARCHAR(100),
    universidades TEXT,
    imagen VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- ESTADISTICAS LABORALES
-- =====================================

CREATE TABLE estadisticas_laborales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrera_id INT NOT NULL,
    salario_promedio DECIMAL(12,2),
    salario_experiencia DECIMAL(12,2),
    demanda_laboral VARCHAR(50),
    empleabilidad DECIMAL(5,2),
    crecimiento_sector DECIMAL(5,2),
    habilidades TEXT,
    sectores TEXT,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id)
    ON DELETE CASCADE
);

-- =====================================
-- PREGUNTAS TEST VOCACIONAL
-- =====================================

CREATE TABLE preguntas_test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT NOT NULL,
    categoria VARCHAR(100) NOT NULL
);

-- =====================================
-- RESPUESTAS TEST
-- =====================================

CREATE TABLE respuestas_test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    pregunta_id INT NOT NULL,
    respuesta INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE,
    FOREIGN KEY (pregunta_id) REFERENCES preguntas_test(id)
    ON DELETE CASCADE
);

-- =====================================
-- RESULTADOS TEST
-- =====================================

CREATE TABLE resultados_test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    perfil_dominante VARCHAR(100),
    tecnologia INT DEFAULT 0,
    creatividad INT DEFAULT 0,
    investigacion INT DEFAULT 0,
    social INT DEFAULT 0,
    administracion INT DEFAULT 0,
    ingenieria INT DEFAULT 0,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
);

-- =====================================
-- SIMULACIONES
-- =====================================

CREATE TABLE simulaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    carrera_relacionada INT,
    dificultad VARCHAR(50),
    FOREIGN KEY (carrera_relacionada)
    REFERENCES carreras(id)
    ON DELETE SET NULL
);

CREATE TABLE saved_careers (
 id INT PRIMARY KEY AUTO_INCREMENT,
 user_id INT,
 career_id INT
);

CREATE TABLE simulaciones (

    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT NOT NULL,

    carrera VARCHAR(150) NOT NULL,

    puntaje INT NOT NULL,

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)

);
-- =====================================
-- RESULTADOS SIMULACIONES
-- =====================================

CREATE TABLE resultados_simulacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    simulacion_id INT NOT NULL,
    puntaje DECIMAL(5,2),
    observaciones TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE,
    FOREIGN KEY (simulacion_id)
    REFERENCES simulaciones(id)
    ON DELETE CASCADE
);

-- =====================================
-- FAVORITOS
-- =====================================

CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    carrera_id INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE,
    FOREIGN KEY (carrera_id)
    REFERENCES carreras(id)
    ON DELETE CASCADE
);

-- =====================================
-- CARRERAS RECOMENDADAS
-- =====================================

CREATE TABLE recomendaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    carrera_id INT NOT NULL,
    porcentaje_compatibilidad DECIMAL(5,2),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE,
    FOREIGN KEY (carrera_id)
    REFERENCES carreras(id)
    ON DELETE CASCADE
);
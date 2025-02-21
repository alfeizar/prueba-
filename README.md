# Proyecto

Este es un proyecto de prueba que sigue los siguientes pasos para su configuración y ejecución.

## Pasos para configurar el proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/alfeizar/prueba-.git
   ```

2. **Ver el video de demostración**

- Si deseas ver un video de demostración, puedes acceder al siguiente enlace:

[Ver video de demostración](https://www.youtube.com/watch?v=6bJavXlFL0g)

3. Navegar a la carpeta `xampp/htdocs` y crear la estructura de carpetas
- Navega a la carpeta `xampp/htdocs`.
- Crea una carpeta llamada `proyectos`.
- Dentro de la carpeta `proyectos`, crea una carpeta llamada `prueba`.
- Copia o arrastra todos los archivos del proyecto clonado a la carpeta `prueba`. 

4. Abrir el proyecto en tu editor de código preferido

- Abre la carpeta `prueba` en tu editor de código favorito.
5. Configurar la base de datos

- Ingresa a la carpeta `app/config` y modifica el archivo `Database.php`. Asegúrate de respetar el nombre de la base de datos.
- Ejecuta el siguiente script SQL para generar la base de datos y las tablas necesarias:

```sql
CREATE DATABASE prueba;

USE prueba;

-- Tabla productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado TINYINT(1) DEFAULT 1
);

-- Tabla grupos
CREATE TABLE grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla intermedia producto_grupo
CREATE TABLE producto_grupo (
    producto_id INT,
    grupo_id INT,
    PRIMARY KEY (producto_id, grupo_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (grupo_id) REFERENCES grupos(id) ON DELETE CASCADE
);
```

6. Instalar dependencias

- Instala las dependencias del proyecto ejecutando el siguiente comando:

```bash
npm i
```

7. Ejecutar XAMPP

- Inicia XAMPP.
- Ejecuta los servicios de `Apache` y `MySQL`.
8. Acceder al proyecto en el navegador

- Navega a la siguiente URL en tu navegador:http://localhost/proyectos/prueba/index.php
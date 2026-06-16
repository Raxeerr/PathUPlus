const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { nombre, apellido, correo, password, edad } = req.body;

        const [existing] = await db.query(
            "SELECT id FROM usuarios WHERE correo = ?",
            [correo]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "El correo ya está registrado"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO usuarios
            (nombre, apellido, correo, password, edad)
            VALUES (?, ?, ?, ?, ?)`,
            [nombre, apellido, correo, hashedPassword, edad]
        );

        res.status(201).json({
            success: true,
            message: "Usuario registrado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error en el servidor"
        });
    }
};

const login = async (req, res) => {
    
    try {
        
        const { correo, password } = req.body;

        const [users] = await db.query(
            "SELECT * FROM usuarios WHERE correo = ?",
            [correo]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Credenciales incorrectas"
            });
        }

        

        const user = users[0];

        console.log("Correo recibido:", correo);
console.log("Password recibida:", password);
console.log("Usuario encontrado:", user.correo);
console.log("Hash BD:", user.password);

const validPassword = await bcrypt.compare(
  password,
  user.password
);

console.log(
  "Resultado compare:",
  validPassword
);

if (!validPassword) {

  return res.status(401).json({
    success: false,
    message: "Credenciales incorrectas"
  });

}

       

  

        
        const token = jwt.sign(
            {
                id: user.id,
                correo: user.correo,
                rol: user.rol_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
    success: true,
    token,
    usuario: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        test_completado: user.test_completado
    }
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error en el servidor"
        });
    }
};

module.exports = {
    register,
    login
};
//Permite ejecutar acciones cuando este archivo sea visitada
const { Pool } = require('pg');
const pool = require('../../db')



const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader);
  if(token==null)
      return res.status(401).send("Token requerido");
  jwt.verify(token, "x4TvnErxRETbVcqaLl5dqMI115eNlp5y", (err, user)=>{
      if(err) return res.status(403).send("Token invalido");
      console.log(user);
      req.user = user;
      next();
  });
}

const listarUsuarios = async (req, res,verifyToken) => {
    
  const result = await pool.query(`
  SELECT usuario.*, rol.nombre as nombre_rol
  FROM usuario
  JOIN rol ON usuario.idrol = rol.idrol
  ORDER BY usuario.idusuario DESC`)
  res.send(result.rows);
};

const listarUsuario= async (req, res) => {
 
  const id = req.params.id 
  console.log(req.params.id)
  const result = await pool.query(`SELECT * FROM usuario WHERE  idusuario = ${id} `)
  res.send(result.rows);
};

const crearUsuario = async (req, res) => {
  const{ idrol, nombre, tipo_documento, num_documento, direccion, telefono, email, estado }=req.body;
  let estadoRef=estado
  if (estadoRef==="1"){
    estadoRef=true
  }else{
    estadoRef=false
  }

 const result= await pool.query
  (`INSERT INTO usuario (idrol, nombre, tipo_documento, num_documento, direccion, telefono, email, estado )
  VALUES ( ${idrol}, '${nombre}', '${tipo_documento}', '${num_documento}',' ${direccion}', '${telefono}', '${email}', ${estadoRef})`)
  
  console.log(result)
  res.send("Crear un Usuario");
};

const eliminarUsuario = async(req, res) => {
  const {id} = req.params

  await pool.query(`DELETE FROM login WHERE idusuario = ${id}`)
 

  await pool.query(`DELETE FROM usuario WHERE idusuario = ${id}`)
  res.send("Usuario eliminado");
};







const actualizarUsuario = async(req, res, next) => {

  
  try {
    const
      {
        idrol,idusuario,nombre,
        direccion,telefono,email,estado
      } = req.body;

      console.log( idrol,idusuario,nombre,
        direccion,telefono,email,estado,)

  
    const result =await pool.query(
   `UPDATE usuario SET
   idrol=${idrol},
   nombre='${nombre}',  
   direccion= '${direccion}',
   telefono='${telefono}',
   email= '${email}',  
   estado= ${estado}
   WHERE idusuario= ${idusuario}` )
   console.log(result)
  
     if (result.rows.length !== 0) {
      return res.status(404).json({ 
        message: "El usuario que desea actualizar no ha sido encontrado" })};
   
    return res.send(result.rows); 
  } catch (error) {
    next(error)
    return error.message
    
  }}





//Luego exportamos las funciones así:
module.exports = {
  listarUsuarios,
  listarUsuario,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
}

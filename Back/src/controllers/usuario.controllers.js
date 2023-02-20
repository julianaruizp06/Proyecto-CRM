//Permite ejecutar acciones cuando este archivo sea visitada
const { Pool } = require('pg');
const pool = require('../../db')





const listarUsuarios = async (req, res) => {
    
  const result = await pool.query(`
  SELECT usuario.*, rol.nombre as nombre_rol
  FROM usuario
  JOIN rol ON usuario.idrol = rol.idrol`)
  res.send(result.rows);
};

const listarUsuario= async (req, res) => {
 
  const id = req.params.id 
 
  const result = await pool.query(`SELECT * FROM usuario WHERE  idusuario = ${id}`)
  res.send(result.rows);
};


//crear usuario
const crearUsuario = async (req, res) => {
  try {
    const{ idrol, nombre, tipo_documento, num_documento, direccion, telefono, email, estado }=req.body;
  let estadoRef=estado
  if (estadoRef==="1"){
    estadoRef=true
  }else{
    estadoRef=false
  }

  await pool.query
  (`INSERT INTO usuario (idrol, nombre, tipo_documento, num_documento, direccion, telefono, email, estado )
  VALUES ( ${Number(idrol)}, '${nombre}', '${tipo_documento}', '${num_documento}',' ${direccion}', '${telefono}', '${email}', ${estadoRef})`)

   
  res.send("Crear un Usuario");
    
  } catch (error) {
    console.error(error)    
  }
  
   
};




//eliminar usuario
const eliminarUsuario = async(req, res) => {
  const {id} = req.params

  await pool.query(`DELETE FROM login WHERE idusuario = ${id}`)
 

  await pool.query(`DELETE FROM usuario WHERE idusuario = ${id}`)
  res.send("Usuario eliminado");
};





//Actualizar usurio

const actualizarUsuario = async(req, res, next) => {

  
  try {
    const
      {
        idrol,idusuario,nombre,
        direccion,telefono,email,estado
      } = req.body;

    

  
    const result =await pool.query(
   `UPDATE usuario SET
   idrol=${idrol},
   nombre='${nombre}',  
   direccion= '${direccion}',
   telefono='${telefono}',
   email= '${email}',  
   estado= ${estado}
   WHERE idusuario= ${idusuario}` )
   
  
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

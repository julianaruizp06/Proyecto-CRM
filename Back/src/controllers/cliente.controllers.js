//Permite ejecutar acciones cuando este archivo sea visitada
const { Pool } = require('pg');
const pool = require('../../db')

//ver listas de clientes

const listarClientes = async (req, res) => {
  const result = await pool.query("SELECT * FROM cliente")
    res.send(result.rows);
  }

//ver un cliente
const listarCliente= async (req, res) => {
  const id = req.params.id 
  const result = await pool.query(`SELECT * FROM cliente WHERE idcliente = ${id}`)
  res.send(result.rows);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Cliente no encontrado" });
    }
  res.json(result.rows[0]);
};

//crear un cliente
const crearCliente = async (req, res) => {
  const{idusuario,nombre,tipo_documento, num_documento,direccion,telefono,email,estado}=req.body;
  let estadoRef=estado
if (estadoRef==="1"){
  estadoRef=true
}else{
  estadoRef=false
}

  const resul=await pool.query
  (`INSERT INTO cliente (nombre,tipo_documento, num_documento,direccion,telefono,email,estado)
  VALUES('${nombre}', '${tipo_documento}', '${num_documento}',' ${direccion}', '${telefono}', '${email}', ${estadoRef})`)
  
  console.log(resul)
  res.send("Crear cliente");
};

//Eliminar un cliente
const eliminarCliente = async(req, res) => {
  const id = req.params.id 
  await pool.query(`DELETE FROM cliente WHERE idcliente= ${id}`)
  res.send("Cliente eliminado");
  if (result.rows.length !== 0) {
    return res.status(404).json({ message: "Cliente no encontrado" });
    }
  res.json(result.rows[0]);

};

const actualizarCliente = async(req, res, next) => {
  try {
    
    const
    {
     idcliente,nombre,direccion,telefono,email,estado
    }=req.body;

    console.log(idcliente,nombre,direccion,telefono,email,estado)
  
       
 
    const result =await pool.query(
   `UPDATE cliente SET
  
   
    nombre='${nombre}',
    direccion = '${direccion}',     
    telefono= '${telefono}',  
    email= '${email}',
    estado=${estado}
    WHERE idcliente= ${idcliente}`)
    console.log(result)
  
    if (result.rows.length !== 0) {
      return res.status(404).json({ 
        message: "El cliente que desea actualizar no ha sido encontrada" })};
    return res.send(result.rows);     
  } catch (error) {
    next(error)
    
  }

}; 
//Luego exportamos las funciones así:
module.exports = {
  listarClientes,
  listarCliente,
  crearCliente,
  eliminarCliente,
  actualizarCliente,
};



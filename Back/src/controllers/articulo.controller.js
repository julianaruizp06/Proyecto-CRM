  //Permite ejecutar acciones cuando este archivo sea visitada (articulos)

const { Pool } = require('pg');
const pool = require('../../db');

//ver listas de articulos
const listarArticulos = async (req, res) => {
const result = await pool.query("SELECT * FROM articulo")
  res.send(result.rows);
}





//Ver 1 articulo
const listarArticulo = async (req, res) => {
  const id = req.params.id 
  const result = await pool.query(`SELECT * FROM articulo WHERE idarticulo = ${id}`)
  res.send(result.rows);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Articulo no encontrado" });
    }
  res.json(result.rows[0]);
};


 //crear un articulo
const crearArticulo = async (req, res) => {
const {nombre,precio_venta,descripcion,estado} = req.body;

  let estadoRef
  if (estadoRef==="1"){
    estadoRef=true
  }else{
    estadoRef=false
  }

  const resul=await pool.query
  (`INSERT INTO articulo (nombre,precio_venta,descripcion,estado) 
  VALUES( '${nombre}', ${precio_venta}, '${descripcion}', ${estadoRef})` 
  )
    console.log(resul)
    res.send("Crear un articulo");
};

//Eliminar un articulo

const eliminarArticulo = async(req, res) => {
  const id = req.params.id 
  await pool.query(`DELETE FROM articulo WHERE idarticulo = ${id}`)
  res.send("Articulo eliminado");

  if (result.rows.length === 0) {
    return res.status(404).json({ 
      message: "Articulo no encontrado para ser eliminado" })};
  
/*   return res.sendStauts(204); */
  console.log(result.rows[0])
};

//actualizar un articulo
const actualizarArticulo = async(req, res, next) => {
  try {
  
    const{idarticulo,nombre,precio_venta,descripcion,estado}=req.body;
  
    const result =await pool.query(
   `UPDATE articulo SET
    nombre ='${nombre}',
    precio_venta = ${precio_venta},
    descripcion = '${descripcion}', 
    estado = '${estado}'
    WHERE idarticulo= ${idarticulo}`)
  
    if (result.rows.length !== 0) {
      return res.status(404).json({ 
        message: "El articulo que desea actualizar no ha sido encontrado" })};
  
     res.json(result.rows[0]);  
  } catch (error) {
    next(error)
    
  }

};

//Luego exportamos las funciones así:

module.exports = {
  listarArticulos,
  listarArticulo,
  crearArticulo,
  eliminarArticulo,
  actualizarArticulo,
};   
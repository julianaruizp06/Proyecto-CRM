const pool = require('../../db')
 //FUNCION PARA MODIFICAR UNA COTIZACION
const updateCotizacionDetail = async (req, res) => {
  const { id_cotizacion, articulos, idclient } = req.body;

  // ELIMINO ALL PRODUCTOS DE LA FACTURA
  const QUERY = {
    text: `DELETE FROM detalles_cotizacion WHERE id_cotizacion = $1`,
    values: [id_cotizacion]
  };

  await pool.query(QUERY);

  // INSERTAR PRODUCTOSS EN PAYLOAD Y SUMAR TOTALES DE LOS ITEMS
  const totales = []

  articulos.forEach(item => {
    totales.push(item.total);
    const QUERY2 = {
      text: `INSERT INTO detalles_cotizacion (id_cotizacion,idarticulo,cantidad,subtotal,
        descuento,costo_envio,total) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      values: [
        item.id_cotizacion,
        item.idarticulo,
        item.cantidad,
        item.subtotal,
        item.descuento,
        item.costo_envio,
        item.total
      ]
    };
    pool.query(QUERY2);
  })

  const valorCotizacion = totales.reduce((count, next) => Number(count) + Number(next));

  // INSERTAR UNA COTIZACION
  const QUERY3 = {
    text: `UPDATE cotizaciones SET valor = $1, idcliente = $2 WHERE id_cotizacion = $3`,
    values: [valorCotizacion, idclient, id_cotizacion]
  };

  pool.query(QUERY3);

  res.send('ok');
}

//VER UNA COTIZACION CON SU DETALLE//TRAEMOS LA INFORMACION DEL USUARIO Y EL CLIENTE
const getSingleCotizacionDetail = async (req, res) => {
  const QUERY = {
    text: `SELECT detalle.id_cotizacion, detalle.valor, usuario.nombre as vendedor, 
      cliente.nombre as cliente, cliente.email as client_email, cliente.idcliente
      FROM cotizaciones detalle
      JOIN usuario ON usuario.idusuario = detalle.idusuario
      JOIN cliente ON cliente.idcliente = detalle.idcliente
      WHERE detalle.id_cotizacion = $1`,
    values: [req.params.id]
  };
  const factura = await pool.query(QUERY);
//TRAEMOS LA INFORMACION DE LOS ARTICUOS
  const QUERY2 = {
    text: `SELECT detalle.*, articulo.nombre as producto
      FROM detalles_cotizacion detalle
      JOIN articulo ON articulo.idarticulo = detalle.idarticulo
      WHERE detalle.id_cotizacion = $1`,
    values: [factura.rows[0].id_cotizacion]
  }
  const products = await pool.query(QUERY2);

  const data = { ...factura.rows[0], products: products.rows }
  res.send(data);
}

//VEMOS LAS COTIZACIONES
const getCotizaciones = async (req, res) => {
  const QUERY = `
    SELECT detalle.id_cotizacion, detalle.valor, usuario.nombre as vendedor, cliente.nombre as cliente
    FROM cotizaciones detalle
    JOIN usuario ON usuario.idusuario = detalle.idusuario
    JOIN cliente ON cliente.idcliente = detalle.idcliente
    ORDER BY detalle.id_cotizacion DESC
  `;
  const { rows } = await pool.query(QUERY);
  res.send(rows);
}

const listarCotizaciones = async (req, res) => {
  const result = await pool.query(`
  SELECT detalles_cotizacion.*, articulo.nombre as nombre_articulo,
  cotizaciones.idusuario as usuario_cotizacio, 
  cotizaciones.idcliente as cliente_cotizaciones,
  cliente.nombre as cliente_nombre,
  usuario.nombre as usuario_nombre,
  articulo.precio_venta as precio_venta
  FROM detalles_cotizacion
  JOIN articulo ON detalles_cotizacion.idarticulo = articulo.idarticulo
  JOIN cotizaciones ON detalles_cotizacion.id_cotizacion = cotizaciones.id_cotizacion
  JOIN cliente ON cotizaciones.idcliente = cliente.idcliente
  JOIN usuario ON cotizaciones.idusuario = usuario.idusuario`)
  res.send(result.rows);
};


//crear una cotizacion
const crearCotizacion = async (req, res) => {
  const { idcliente, idusuario, valor, articulos, decuento } = req.body;
  const QUERY = {
    text: 'INSERT INTO cotizaciones (idcliente,idusuario, valor) VALUES ($1,$2,$3) RETURNING *',
    values: [idcliente, idusuario, valor],
  };
  const { rows } = await pool.query(QUERY)
  articulos.forEach(item => {
    const QUERY2 = {
      text: `INSERT INTO detalles_cotizacion
              (id_cotizacion,idarticulo,cantidad,subtotal,descuento,costo_envio,total) 
              VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      values: [
        rows[0].id_cotizacion,
        item.idArticulo,
        item.cant,
        item.precioU,
        0,
        0,
        item.precioT
      ]
    }
    pool.query(QUERY2)
  });
  res.send('creado con exito');
};



//Eliminar una cotizacion
const eliminarCotizacion = async (req, res) => {
  const id = req.params.id
  await pool.query(`DELETE FROM cotizaciones WHERE id_cotizacion = ${id}`)
  res.send("Cotización eliminada");
};



//Luego exportamos las funciones así:
module.exports = {
  listarCotizaciones,
  crearCotizacion,
  eliminarCotizacion, 
  getCotizaciones,
  getSingleCotizacionDetail,
  updateCotizacionDetail
};



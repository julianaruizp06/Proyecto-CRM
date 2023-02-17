INSERT INTO rol (nombre,descripcion,estado)
VALUES ('Administrador', 'Persona encargada de administrar la plataforma',true) ;
INSERT INTO rol (nombre,descripcion,estado)
VALUES ('Usuario', 'Persona encargada de interactuar con la plataforma',true);

INSERT INTO usuario (idrol,nombre,tipo_documento, num_documento,direccion,telefono,email,estado)
VALUES(1,'wilson gomez','Cedula de ciudadania','10000000','Bogota manzana 11 calle falsa 123','3101234567','wilson@wilson.com',true);
INSERT INTO usuario (idrol,nombre,tipo_documento, num_documento,direccion,telefono,email,estado)
VALUES(1,'Juliana Ruiz','Cedula de ciudadania','20000000','Medelin manzana 11 calle falsa 123','3104567898','ejruizp@wilson.com',true);
INSERT INTO usuario (idrol,nombre,tipo_documento, num_documento,direccion,telefono,email,estado)
VALUES(2,'violetta Serna','Cedula de ciudadania','30000000','Manizales manzana 11 calle falsa 123','3245679876','violettaSp@wilson.com',true);

INSERT INTO login (idusuario,idrol,usuario,contrasenia)
VALUES (1,1,'wgomez','123');
INSERT INTO login (idusuario,idrol,usuario,contrasenia)
VALUES (2,1,'ejruizp','456');
INSERT INTO login (idusuario,idrol,usuario,contrasenia)
VALUES (3,2,'vioserna','789');

INSERT INTO articulo (nombre,precio_venta,descripcion,estado)
VALUES ('Mango',50000,'1 kg de mango maduro',true);
INSERT INTO articulo (nombre,precio_venta,descripcion,estado)
VALUES ('Lulo',30000,'1 kg de lulo',true);
INSERT INTO articulo (nombre,precio_venta,descripcion,estado)
VALUES ('Fresa',40000,'1 kg de Fresa',true);
INSERT INTO articulo (nombre,precio_venta,descripcion,estado)
VALUES ('Naranja',80000,'1 kg de naranja',true);
INSERT INTO articulo (nombre,precio_venta,descripcion,estado)
VALUES ('Papaya',70000,'1 kg de mango papaya',true);

INSERT INTO cliente (nombre,tipo_documento, num_documento,direccion,telefono,email,estado)
VALUES('Julian Gelvez','CC','10000000','Bogota manzana 11 calle falsa 123','3101234567','julian@fruver.com',true);
INSERT INTO cliente (nombre,tipo_documento, num_documento,direccion,telefono,email,estado)
VALUES('Marcos Roa','CC','23000000','Bogota manzana','3101545465','marcos@fruver.com',true);
INSERT INTO cliente (nombre,tipo_documento, num_documento,direccion,telefono,email,estado)
VALUES('luis Jaramillo','CC','34500000','Bogota','31016768677','luis@fruver.com',true);
INSERT INTO cliente (nombre,tipo_documento, num_documento,direccion,telefono,email,estado)
VALUES('Mariana Velez','CC','25600000','Bogota','310187686','mariana@fruver.com',true);

INSERT INTO venta (idcliente,idusuario,idarticulo,descripcion,cantidad,total)
VALUES (1,1,1,'MANGO TOMY',2,100000);

INSERT INTO cotizaciones(idcliente,idusuario,valor)
VALUES(1,1, 40000);

INSERT INTO detalles_cotizacion (id_cotizacion,idarticulo,cantidad,subtotal,descuento,costo_envio,total)
VALUES(1,1,2,100000,0.2,10000,90000)
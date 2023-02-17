Create table rol(
       idrol SMALLSERIAL primary key,
       nombre varchar(50) not null unique,
       descripcion varchar(256) not null,
       estado BOOL default true
);

create table usuario(
       idusuario SMALLSERIAL primary key,
       idrol integer ,
       nombre varchar(100) not null,
       tipo_documento varchar(20) not null,
       num_documento varchar(20) not null Unique,
       direccion varchar(70) not null,
       telefono varchar(20) not null,
       email varchar(50) not null,
       estado BOOL default true,
       FOREIGN KEY (idrol) REFERENCES rol(idrol) ON DELETE CASCADE
);

create table login(
	idlogin SMALLSERIAL primary key,
	idusuario integer,
	idrol integer,
	usuario varchar (50)unique,
       contrasenia varchar (64) ,
	FOREIGN KEY (idusuario) REFERENCES usuario (idusuario) ON DELETE CASCADE,
	FOREIGN KEY (idrol) REFERENCES rol (idrol) ON DELETE CASCADE
	
);

create table articulo(
       idarticulo SMALLSERIAL primary key,     
       nombre varchar(100) not null,
       precio_venta decimal(11,2) not null,
       descripcion varchar(256) not null  unique,
       estado 	BOOL default true       
);

create table cliente(
       idcliente SMALLSERIAL primary key ,
       nombre varchar(100) not null,
       tipo_documento varchar(20) not null,
       num_documento varchar(20) not null,
       direccion varchar(70) not null,
       telefono varchar(20) not null,
       email varchar(50) not null,
       estado BOOL default true
);

create table venta(
       idventa SMALLSERIAL primary key ,
       idcliente integer not null,
       idusuario integer not null,
	idarticulo integer not null,
	descripcion varchar(50),
	cantidad integer not null,     
       total decimal (11,2) not null,   
       FOREIGN KEY (idcliente) REFERENCES cliente (idcliente) ON DELETE CASCADE,
       FOREIGN KEY (idarticulo) REFERENCES articulo (idarticulo) ON DELETE CASCADE,
       FOREIGN KEY (idusuario) REFERENCES usuario (idusuario) ON DELETE CASCADE       
);

CREATE TABLE cotizaciones (
       id_cotizacion serial PRIMARY KEY,
       idcliente integer NOT NULL,
       idusuario integer NOT NULL,
       valor integer not null,
       FOREIGN KEY (idcliente) REFERENCES cliente (idcliente) ON DELETE CASCADE,
       FOREIGN KEY (idusuario) REFERENCES usuario (idusuario) ON DELETE CASCADE
);

CREATE TABLE detalles_cotizacion (
       iddetalle serial PRIMARY KEY,
       id_cotizacion integer NOT NULL,
       idarticulo integer NOT NULL,
       cantidad integer NOT NULL,
       subtotal decimal(11,2) NOT NULL,
       descuento decimal(2,2) NOT NULL,
       costo_envio decimal(11,2) NOT NULL,
       total decimal(11,2) NOT NULL,
       FOREIGN KEY (idarticulo) REFERENCES articulo (idarticulo) ON DELETE CASCADE,
       FOREIGN KEY (id_cotizacion) REFERENCES cotizaciones (id_cotizacion) ON DELETE CASCADE	
);
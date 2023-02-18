import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, Form } from "reactstrap";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { nanoid } from 'nanoid'
import notify from '../../../utils/notify';

const DATA = { id_cotizacion: 0, cliente: "", products: [], idcliente: 0 }
const CLIENT = [{ idcliente: 0, nombre: '' }];
const ARTICULOS = [{ idarticulo: 0, nombre: '', precio_venta: 0, descripcion: '', estado: true }]

const API = 'http://localhost:3001/cotizacion';

const Edit = ({ isOpen, toggle, id, idUser }) => {
    const [data, setData] = useState(DATA);
    const [clients, setClients] = useState(CLIENT);
    const [articulos, setArticulo] = useState(ARTICULOS)
    const [listaProductos, setListaProductos] = useState([])
    const [selClient, setSelClient] = useState(false);

    useEffect(() => {
        if (id) {
            mount()
        }
    }, [id]);

    //FUNCION PARA GENERAR LISTA DE CLIENTES, ARTICULOS,COTIZACION
    const mount = async () => {
        await getCLients();
        await getArticulos();
        await getCotizacion();
    }

    //FUNCION PARA TRAER UNA COTIZACION POR MEDIO DE UN PARAMETRO
    const getCotizacion = async () => {
        const res = await axios.get(`${API}/${id}`);
        if (res) {
            setData(res.data || DATA);
            setListaProductos(res.data.products || []);
            setSelClient(res.data.idcliente || 0)
            const select = document.getElementById('client');
            select.value = res.data.idcliente;
        }
    }

    //FUNCIO PARA TRAER LA LISTA DE ARTICULOS
    const getArticulos = async () => {
        const res = await axios.get("http://localhost:3001/articulo");
        setArticulo([{}, ...res.data] || []);
    }
  //FUNCIO PARA TRAER LA LISTA DE CLIENTES
    const getCLients = async () => {
        const res = await axios.get("http://localhost:3001/cliente");
        setClients(res ? [{}, ...res.data] : []);
    }
  //FUNCIO PARA CAMBIAR EL ARTICULO
    const changeArt = (id, idFactura) => {//RECIBIMOS COMO PARAMETRO EL ID DEL ARTICULO Y EL ID DE LA FACTURA
        const articulo = articulos.find(item => item.idarticulo == id);
        const data = listaProductos.map(
            item => item.iddetalle == idFactura
                ? {
                    ...item,
                    idarticulo: id || 0,
                    cantidad: 1,
                    subtotal: id ? articulo.precio_venta : 0,
                    total: id ? articulo.precio_venta * 1 : 0,
                    producto: id ? articulo.nombre : ''
                }
                : item
        )
        setListaProductos(data);
        document.getElementById(`cantidad_${idFactura}`).value = 1;
    }
//FUNCION PARA CAMBIAR LA CANTIDAD
    const changeCant = (value, idFactura) => {
        const data = listaProductos.map(
            item => item.iddetalle == idFactura
                ? { ...item, cantidad: value, total: item.subtotal * value }
                : item
        )
        setListaProductos(data);
    }
//FUNCION PARA AÑADIR FILA PARA UN NUEVO ARTICULO
    const addRow = () => {
        const row = {
            id_cotizacion: data.id_cotizacion,
            iddetalle: nanoid(),
            cantidad: 0,
            total: 0,
            subtotal: 0,
            idarticulo: 0,
            descuento: 0,
            costo_envio: 0
        }
        setListaProductos([...listaProductos, row])
    }

    const removeRow = (id) => {
        const data = listaProductos.filter(item => item.iddetalle != id)
        setListaProductos(data)
    }
//FUNCION PARA ENVIAR EL FORMULARIO YA EDITADO
    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            articulos: listaProductos,
            id_cotizacion: data.id_cotizacion,
            idclient: selClient
        };
        const res = await axios.put('http://localhost:3001/cotizacion', payload);
        if (res) {
            notify();
            toggle();
           
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} size='lg'>
            <Form onSubmit={handleSubmit}>
                <ModalHeader toggle={toggle}>Editar</ModalHeader>
                <div className='d-flex px-2 pt-3 justify-content-end'>
                    <div>
                        <Input
                            type="select"
                            name="select"
                            id="client"
                            onChange={(e) => setSelClient(e.target.value)}
                        >
                            {
                                clients.map(item => (
                                    <option key={item.nombre} value={item.idcliente}>
                                        {item.nombre}
                                    </option>
                                ))
                            }
                        </Input>
                    </div>
                    <Button className='rounded mx-2' onClick={() => addRow()}>
                        <AiFillPlusCircle />
                    </Button>
                </div>
                <ModalBody>
                    <div className="form-group">
                        <table
                            className="table"
                            id="table"
                            style={{ marginTop: 60, background: "white" }}
                        >
                            <thead className='bg-secondary text-white'>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center"> Articulo</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-center">Precio Unitario</th>
                                    <th className="text-center">Precio Total</th>
                                    <th className="text-center">Borrar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaProductos.map((item, key) => (
                                    <tr
                                        key={"factura_".concat(item.iddetalle)}
                                        id={"factura_".concat(item.iddetalle)}
                                    >
                                        <th className="pt-3">{key + 1}</th>
                                        <th>
                                            <Input
                                                required={true}
                                                type="select"
                                                name="articulo"
                                                defaultValue={item.idarticulo}
                                                onChange={(e) => {
                                                    changeArt(e.target.value, item.iddetalle)
                                                }}
                                            >
                                                {articulos.map((item) => (
                                                    <option
                                                        key={`articulo_${item.idarticulo}`}
                                                        value={item.idarticulo}
                                                    >
                                                        {item.nombre}
                                                    </option>
                                                ))}
                                            </Input>
                                        </th>
                                        <th>
                                            <div className='justify-content-center d-flex'>
                                                <Input
                                                    min={1}
                                                    required={true}
                                                    type="number"
                                                    name="cantidad"
                                                    className='w-50'
                                                    id={`cantidad_${item.iddetalle}`}
                                                    defaultValue={item.cantidad}
                                                    onChange={(e) => {
                                                        changeCant(e.target.value, item.iddetalle)
                                                    }}
                                                />
                                            </div>
                                        </th>
                                        <th className="pt-3"> {Number(item.subtotal)} </th>
                                        <th className="pt-3">{Number(item.total)} </th>
                                        <th>
                                            <Button
                                                className="eLiminar"
                                                color='danger'
                                                id="eliminar"
                                                onClick={() => removeRow(item.iddetalle)}
                                            >
                                                <AiFillDelete />
                                            </Button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
                        Actualizar
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Form>
        </Modal >
    )
}

export default Edit
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './factura.css';
import { Button } from 'reactstrap';
import { cop } from '../../utils/i18';
import notify from '../../utils/notify';
import { useNavigate } from "react-router-dom";

const DATA = {
    id_cotizacion: 0, valor: 0, vendedor: "", cliente: "", client_email: '', products: []
}

const API = 'http://localhost:3001/cotizacion';
const API_NOTIFICACION = 'http://localhost:3001/notificaciones/cotizacion';

const Factura = () => {
    const [data, setData] = useState(DATA);
    const { id } = useParams();

    useEffect(() => {
        mount()
    }, []);

    const mount = async () => {
        const res = await axios.get(`${API}/${id}`);
        setData(res ? res.data : DATA)
    }

    const sendEmail = async () => {
        const button = document.getElementById('button_send')
        document.getElementsByTagName('noscript')[0].style.display='none'
        button.style.display = 'none'
        const facturaDigital = document.getElementsByTagName('html')[0];
        const res = await axios.post(API_NOTIFICACION, { html: facturaDigital.outerHTML });
        if (res) {
            notify();
        }
        button.style.display = 'block'
    }
    const navigate=useNavigate();

    function atras() {
      navigate("/cotizaciones")  
   
    }

    return (
        <div id='factura_component' className="col-6">
          <div className='enviar'>
          <div className='d-flex justify-content-start m-3'>
                <Button
                    className="btn btn-outline-secondary"
                    id='button_send'                  
                    outline
                    onClick={() => sendEmail()}
                >
                    Enviar Correo
                </Button>
            </div>
          
            <div className='d-flex justify-content-start m-3'>
                <Button
                 className="btn btn-outline-secondary"
                    id='button_send'                  
                    outline
                    onClick={() => atras()}
                >Cotizaciones
                    
                </Button>
            </div>
            </div>
            <h3>Factura de venta</h3>
            <h4>CRM PRODCUTS SA</h4>
                        <p>Av. Winston Churchill</p>
                        <p>Plaza Orleans 3er. nivel</p>
                        <p>local 312</p>
                        <hr />
            <div className="row fact-info mt-3">
                <div className="col-3">
                    <h5>Facturar a</h5>
                    <p>{data.vendedor}</p>
                </div>
                <div className="col-3">
                    <h5>Enviar a</h5>
                    <p>{data.cliente}</p>
                </div>
                <div className="col-3">
                    <h5>N° de factura</h5>
                    <h5>Fecha</h5>
                    <h5>Vence</h5>
                </div>
                <div className="col-3">
                    <h5>{data.id_cotizacion}</h5>
                    <p>{moment(new Date).format('DD/MM/YYYY')}</p>
                    <p>{moment(new Date).add(15, 'days').format('DD/MM/YYYY')}</p>
                </div>
            </div>
            <div className="row my-5">
                <table className="table table-borderless factura">
                    <thead>
                        <tr>
                            <th>Cant.</th>
                            <th>Descripcion</th>
                            <th>Precio Unitario</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.products.map((item, key) => (
                                <tr key={`product_${key}`}>
                                    <td>{item.cantidad}</td>
                                    <td>{item.producto}</td>
                                    <td>{item.subtotal}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Total</th>
                            <th>{cop(data.valor)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div id="footer_fa">
                <div className="col-12 mt-3">
                    <h4>Condiciones y formas de pago</h4>
                    <p>El pago se debe realizar en un plazo de 15 dias.</p>
                    <p>
                        Banco de Bogota
                        <br />
                        IBAN: 4558-4535-4253-42
                        <br />
                        Código SWIFT: BB84856SF
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Factura
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./factura.css";
import { Button } from "reactstrap";
import { cop } from "../../utils/i18";
import notify from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle} from "react-icons/ai";

const DATA = {
  id_cotizacion: 0,
  valor: 0,
  vendedor: "",
  cliente: "",
  client_email: "",
  products: [],
};

const API = "http://localhost:3001/cotizacion";
const API_NOTIFICACION = "http://localhost:3001/notificaciones/cotizacion";

const Factura = () => {
  const [data, setData] = useState(DATA);
  const { id } = useParams();

  useEffect(() => {
    mount();
  },);

  const mount = async () => {
    const res = await axios.get(`${API}/${id}`);
    setData(res ? res.data : DATA);
  };

  const sendEmail = async () => {
    const button = document.getElementById("button_send");
    document.getElementsByTagName("noscript")[0].style.display = "none";
    button.style.display = "none";
    const facturaDigital = document.getElementsByTagName("html")[0];
    const res = await axios.post(API_NOTIFICACION, {
      html: facturaDigital.outerHTML,
    });
    if (res) {
      notify();      
      atras();
    }
    
  };

  const navigate = useNavigate();

  function atras() {
    navigate("/cotizaciones");
  }

  return (

    <div className="containerfactura">

    <div className="container_factura">
        <div id="factura_component">

            <div className="botoncerrar">
            
              <Button 
              variant="outline-primary"   
              id="cerrarC"  outline onClick={() => atras()}>
              <AiFillCloseCircle/>
              </Button>
            </div> 

            <div className="info-local">         
               
                    <p><strong><h3>Factura de Venta </h3></strong>
                    <br/>
                    CRM PRODCUTS SA
                    <br/>
                    Av. Winston Churchill
                    <br/>
                    Plaza Orleans 3er. nivel
                    <br/>
                    local 312</p>              
              
            </div>

            <hr/>
            <div className="info-cli">
                 <div className="info-cliente">     
                <tr >
                    <th className="info-cliente"><strong>Facturar a: </strong>
                    <p> {data.vendedor}</p></th>
                    <th></th>
                    <th className="info-cliente"><strong>Enviar a: </strong>
                    <p> {data.cliente} </p></th>
                    <th></th>
                    <th className="info-cliente"><strong>N° de factura: </strong>
                        <p>{data.id_cotizacion}</p></th>
                                 
                </tr>            
                
                <tr>
                <th className="info-cliente"><strong>Fecha:</strong>
                <p>{moment(new Date()).format("DD/MM/YYYY")}</p></th>
                <th></th>
                <th className="info-cliente"><strong>Vence:</strong>
                <p>{moment(new Date()).add(15, "days").format("DD/MM/YYYY")}</p></th>
                </tr>     
            </div>
            </div>  
          

            <div id="factura_de">
            <table className="table table-striped border border-secondary factura">
                <thead>
                <tr>
                    <th>
                    <strong>Cant.</strong>
                    </th>
                    <th>
                    <strong>Descripcion</strong>
                    </th>
                    <th>
                    <strong>Precio Unitario</strong>
                    </th>
                    <th>
                    <strong>Importe</strong>
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.products.map((item, key) => (
                    <tr key={`product_${key}`}>
                    <td>{item.cantidad}</td>
                    <td>{item.producto}</td>
                    <td>{item.subtotal}</td>
                    <td>{item.total}</td>
                    </tr>
                ))}
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
            <div className="enviar">
            <Button
              variant="outline-primary"      
               id="button_send"               
                outline
                onClick={() =>sendEmail()}
            >
                Enviar Correo
            </Button>
            </div>

            <div id="footer_fa" className="d-flex justify-content-center">
            <div className="col-10 mt-4">
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
    </div>
  </div>
  );
};

export default Factura;

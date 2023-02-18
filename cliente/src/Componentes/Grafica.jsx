import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"


const Grafica = (props) => { 
  const url = "http://localhost:3001/usuario";
 

  //para listar los ususarios
  const [usuario, setUsuario] = useState([]);//generar la lista usuarios
 


  //funcion para ver la lista de usuarios
  const listarUsuario = async () => {
    const res = await axios.get(url);
    if (res) {
      setUsuario(res.data || []);
      
    }
  };
  useEffect(() => {
    listarUsuario();
   
  }, []);

 
  const navigate=useNavigate();

    function atras() {
      navigate("/homea")  
   
    }


  return (
    <div className="container-sm">
      <header style={{ color: "white", marginTop: 20, marginBottom:20}}>
      <h2>Grafica</h2>           
      </header>    

     
      <table
        className="table" id="table"
        style={{ marginTop: 60, background: "white"}}
      >
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Rol</th>
            <th className="text-center">Nombre</th>
          
          </tr>
        </thead>

        <tbody>
          {usuario.map((item, key) => (
            <tr key={key}>
              <th key={key} className="text-center">{key+1} </th>
              <th className="text-center">{item.nombre_rol}  </th>
              <th className="text-center">{item.nombre}</th>
           
            </tr>
          ))}
        </tbody>
      </table>   
           
     </div>
    );




    
};

export default Grafica

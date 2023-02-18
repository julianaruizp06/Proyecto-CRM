import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLocalStorage, types } from "../utils/localStorage";

function Login(props) {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ usuario: "", contrasenia: "" });

  //lo que hace esta funcion es asignarle a la variable datos, todo lo que cambie en datos sera reflejado en la vista
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };

  //me maneja el envio del formularop asyn , lo detengo y en la codicion valido el los datos que no deje loe espacios en blanco, utilizo el axios
  // y por medio del post lo envio a "http://localhost:3001/usuario/login"

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("no enviar");
    } else {
      let res = await axios.post("http://localhost:3001/login", datos);
      const data = res.data;
      const user = {
        name: data.nDatos.userId,
        pass: data.nDatos.contrasenia,
        id: data.nDatos.id,
        rol: data.idrol
      };
      props.setUser(user);     
      setLocalStorage(types.USER, user) 
      if (res.data.respuesta === true) {
        localStorage.setItem("tokenjwt", res.data.nDatos.token);
        if (res.data.idrol === 1) {
          navigate("/homea");
        } else {
          navigate("/homeu");
        }
      } else {
        console.log("Datos incorrectos");
      }
    }
  };

  return (
    <section className="h-100">
      <div className="container h-100" style={{ marginTop: 80 }}>
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1
                  className="fs-4 card-title fw-bold mb-4"
                  style={{ marginTop: 40,  }}
                >
                  Login
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate={true}
                  autoComplete="off"
                >
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email"></label>
                    <input
                      id="email"
                      type="text"
                      onChange={handleInputChange}
                      defaultValue={datos.usuario}
                      className="form-control"
                      name="usuario"
                      required
                      autoFocus
                    />
                    <div className="invalid-feedback">Usuario inválido</div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="password">
                        Contraseña
                      </label>
                      <a href="/" className="float-end">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <input
                      id="password"
                      type="password"
                      onChange={handleInputChange}
                      defaultValue={datos.contrasenia}
                      className="form-control"
                      name="contrasenia"
                      required
                    />
                    <div className="invalid-feedback">
                      Contraseña es requirida
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="form-check-input"
                      />
                      <label htmlFor="remember" className="form-check-label">
                        Recordarme
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary ms-auto">
                      <i className="bi bi-box-arrow-in-right"></i> Ingresar
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Todos los derechos reservados &copy; 2021
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

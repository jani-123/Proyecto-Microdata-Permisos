import React from "react";
import { signOut } from "../../actions/actions";
import user3 from '../EmployeFirstView/img/user.png';
import {Col } from 'react-bootstrap';
import { NavLink, Redirect } from "react-router-dom";
import userportada from '../EmployeFirstView/img/user2.png';
import logoportada from '../EmployeFirstView/img/logo_portada.png';
import "../RequestEmploye/RequestEmploye.css";

const DetailEmploye = ({ successLogin, user, permisos, selectIdDetalle }) => { 
  return (
    <div>
      {!successLogin && <Redirect to="/" />}
      <input type="checkbox" className="checkbox" id="menu-toogle" />
      <label for="menu-toogle" className="menu-toogle"></label>
      <nav className="nav">
        <center>
          <img src={user3} alt="" />
          <h3>{user.nombres}</h3>
          <div className="menu">
            <NavLink to="/RequestEmploye"><button className="botones">Solicitud del Movimiento del Personal</button></NavLink>
            <NavLink to="/HistoryEmploye"><button className="botones"> Historial de incidencias</button></NavLink>
            <button id="close" onClick={signOut}>Cerrar Sesion</button>
          </div>
        </center>
      </nav>
      <Col className="detalles" lgOffset={3} lg={7} xs={10} xsOffset={1}>

        <Col xs={12} md={12}>
          <Col className="header" lg={12} xs={12}>
            <Col lg={6} xs={12}>
              <img className="imagen_portada" src={userportada} alt="" />
              <p className="titulo_portada">Bienvenido <br />{user.nombres}</p>
            </Col>
            <Col lg={6} xsHidden id="logoPortada">
              <img className="logo_portada" src={logoportada} alt="" />
            </Col>

          </Col>

          <Col xs={12} md={12} className="info-details">
            {

              user.movimiento.map((item, index) => {
                console.log(user.movimiento);
                if (item.id === selectIdDetalle) {
                  return (
                    <div>
                      <h4>Solicitado por: {user.nombres}</h4>
                      <h4>Fecha/Hora Salida {item.fechaSalida}</h4>
                      <h4>Fecha/Hora Retorno {item.fechaRetorno}</h4>
                      <h4>Tipo de permiso: {item.tipoOcurrencia}</h4>
                      <h4>Motivo: {item.motivo}</h4>
                      <h4>Tipo: No</h4>
                      <hr />
                    </div>
                  )
                }
              })
            }
          </Col>
          <Col xs={12} md={12} className="otorgado text-right">
            <h4>Permiso aprobado por Ing. Robert Arisaca</h4>
            <br />
            <h4>Fecha: 12/12/17</h4>
          </Col>
        </Col>

      </Col>

      <div className="triangle"></div>
    </div>
  );
};

export default DetailEmploye;
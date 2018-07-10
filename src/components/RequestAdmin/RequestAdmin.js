import React from "react";
import { Table, Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel, ButtonToolbar } from 'react-bootstrap';
import userportada from '../EmployeFirstView/img/user2.png';
import logoportada from '../EmployeFirstView/img/logo_portada.png';
import { NavLink, Redirect } from "react-router-dom";
import admin from '../EmployeFirstView/img/admin_woman.png';
import { signOut } from "../../actions/actions";

const RequestAdmin = ({ successLogin, user }) => {
  return (
    <div>
      <Col lg={12}>
        {!successLogin && <Redirect to="/" />}
        <input type="checkbox" className="checkbox-admin" id="menu-toogle" />
        <label for="menu-toogle" className="menu-toogle-admin"></label>
        <nav className="nav-admin">
          <center>
            <img src={admin} alt="" />
            <h3>{user.nombres}</h3>
            <div className="menu-admin">
              <NavLink to="/HistoryAdmin"><button className="botones-admin"> Historial de incidencias</button></NavLink>
              <NavLink to="/ReportAdmin"><button className="botones-admin">Reporte de Incidencia</button></NavLink>
              <button id="close-admin" onClick={signOut}>Cerrar Sesion</button>
            </div>
          </center>
        </nav>

        <Col className="historial-admin" lgOffset={3} lg={7} xs={10} xsOffset={1}>
          <Col className="header" lg={12} xs={12}>
            <Col lg={6} xs={12}>
              <img className="imagen_portada" src={admin} alt="" />
              <p className="titulo_portada">Bienvenido <br />{user.nombres}</p>
            </Col>
            <Col lg={6} xsHidden id="logoPortada"><img className="logo_portada" src={logoportada} alt="" /></Col>

          </Col>

          <div className="border-request">
            <form>
              <Col xs={12} md={12}>
                <h2>Solicitud de Movimiento de Personal</h2>
                <h4>Solicitado por: {user.nombres}</h4>
                <h4>Fecha/Hora Salida 07/04/17 - 08:00 a.m.</h4>
                <h4>Fecha/Hora Retorno 07/04/17 - 10:00 a.m.</h4>
                <h4>Tipo de permiso: Personal</h4>
                <h4>Motivo: Cita Médica</h4>
                <h4>Tipo: Compensación</h4>
                <hr />
                <div className="text-center">
                  <NavLink to='/ReportAdmin'><Button bsSize="large">Aprobar <i class="fa fa-check" aria-hidden="true"></i></Button></NavLink>
                  <NavLink to='/ReportAdmin'><Button bsSize="large">Denegar <i class="fa fa-times" aria-hidden="true"></i></Button></NavLink>
                </div>
              </Col>

            </form>
          </div>
        </Col>
      </Col>
      <div className="triangle"></div>
    </div>
  );
};

export default RequestAdmin;
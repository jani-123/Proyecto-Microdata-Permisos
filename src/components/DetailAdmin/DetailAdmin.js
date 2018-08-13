import React from "react";
import { signOut } from "../../actions/actions";
import admin from '../EmployeFirstView/img/admin_woman.png';
import { Col, } from 'react-bootstrap';
import userportada from '../EmployeFirstView/img/user2.png';
import logoportada from '../EmployeFirstView/img/logo_portada.png';
import { NavLink, Redirect } from "react-router-dom";

const DetailAdmin = ({ successLogin, user , permisos , selectIdPermisos}) => {
  console.log("linea 10:", selectIdPermisos);
  return (
    <div> 
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

        <Col xs={12} md={12}>
          <Col className="header" lg={12} xs={12}>
            <Col lg={6} xs={12}>
              <img className="imagen_portada" src={userportada} alt="" />
              <p className="titulo_portada">{user.nombres}</p>
            </Col>
            <Col lg={6} xsHidden id="logoPortada">
              <img className="logo_portada" src={logoportada} alt="" />
            </Col>

          </Col>

          <Col xs={12} md={12} className="info-details">
          {
            
            permisos.map((item,index)=>{
              if(index === selectIdPermisos){
                return (
                  <div>
                    <h4>Solicitado por: {item.nombres}</h4>
                    <h4>Fecha/Hora Salida {item.fechaSalida}</h4>
                    <h4>Fecha/Hora Retorno {item.fechaRetorno}</h4>
                    <h4>Tipo de permiso: {item.tipoOcurrencia}</h4>
                    <h4>Motivo: {item.motivo}</h4>
                    <h4>Compensacion de Horas: {item.compensacion ? "No" : "Si"}</h4>
                    <h4>Aprobado: {item.respuestas ? "No" : "Si"}</h4>
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

export default DetailAdmin;
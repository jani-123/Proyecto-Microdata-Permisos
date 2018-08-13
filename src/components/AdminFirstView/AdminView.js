import React from "react";
import './AdminView.css';
import admin from '../EmployeFirstView/img/admin_woman.png';
import microdata from '../EmployeFirstView/img/logo_microdata.png';
import { signOut } from "../../actions/actions";
import { NavLink, Redirect } from "react-router-dom";
import { Col } from 'react-bootstrap';

const FirstViewAdmin = ({ successLogin , user}) => {
  return (
    <div>
      <Col lg={12}>
        {!successLogin && <Redirect to="/" />}
        <input type="checkbox" className="checkbox-admin" id="menu-toogle" />
        <label htmlFor="menu-toogle" className="menu-toogle-admin"></label>
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

        <Col className="microdata-admin" lgOffset={3} lg={7} xs={10} xsOffset={1} >
          <img src={microdata} alt="logo_microdata" width="100%" />
        </Col>
      </Col>
      <div className="triangle"></div>

    </div>
  
  );
};

export default FirstViewAdmin;
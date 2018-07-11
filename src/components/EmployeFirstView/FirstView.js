import React from "react";
import "./FirstView.css";
import user0 from './img/user.png';
import microdata from './img/logo_microdata.png'; 
import { signOut } from "../../actions/actions";
import { NavLink, Redirect } from "react-router-dom";
import { Col} from 'react-bootstrap';

const FirstViewEmploye = ({ successLogin, user }) => {
  return (
    <div>
      <Col lg={12}>
        {!successLogin && <Redirect to="/" />}
        <input type="checkbox" className="checkbox" id="menu-toogle" />
        <label for="menu-toogle" className="menu-toogle"></label>
        <nav className="nav">
          <center>
            <img src={user0} alt="" />
            <h3>{user.nombres}</h3>
            <div className="menu"> 
              <NavLink to="/RequestEmploye"><button className="botones">Solicitud del Movimiento del Personal</button></NavLink>
              <NavLink to="/HistoryEmploye"><button className="botones"> Historial de incidencias</button></NavLink>
              <button id="close" onClick={signOut}>Cerrar Sesion</button>
            </div>
          </center>
        </nav>
        <Col className="microdata" lgOffset={3} lg={6} xs={8} xsOffset={1}>
          <img src={microdata} alt="logo_microdata" width="100%" />
        </Col>
      </Col>
      <Col>
        <div className="triangle"></div>
      </Col>
    </div>

  );
};

export default FirstViewEmploye;

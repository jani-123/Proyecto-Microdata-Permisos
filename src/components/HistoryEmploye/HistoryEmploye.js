
import React, { Fragment } from "react";
import {
  Button,
  Col
} from 'react-bootstrap';
/*import BootstrapTable from 'react-bootstrap-table-next';*/
import user3 from '../EmployeFirstView/img/user.png';
import { NavLink, Redirect } from "react-router-dom";
import { signOut, change } from "../../actions/actions";
import '../RequestEmploye/RequestEmploye.css';
import userportada from '../EmployeFirstView/img/user2.png';
import logoportada from '../EmployeFirstView/img/logo_portada.png';

const HistoryEmploye = ({ successLogin, user, movimientos }) => {
  console.log("linea 17:", movimientos);
  return (
    <div>
      <Col lg={12}>
        {!successLogin && <Redirect exact to="/#" />}
        <input type="checkbox" className="checkbox" id="menu-toogle" />
        <label htmlFor="menu-toogle" className="menu-toogle"></label>
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

        <Col className="solicitud" lgOffset={3} lg={7} xs={10} xsOffset={1}>
          <Col className="header" lg={12} xs={12}>
            <Col lg={6} xs={12}>
              <img className="imagen_portada" src={userportada} alt="" />
              <p className="titulo_portada">Bienvenido <br />{user.nombres}</p>
            </Col>
            <Col lg={6} xsHidden id="logoPortada">
              <img className="logo_portada" src={logoportada} alt="" />
            </Col>
            <Col className="historial" xs={12} md={12}>
              <h2>Historial de ocurrencias</h2>
            </Col>
            <Col xs={12} md={12}>
              <h1>Historial</h1>
              <table> 
                <tbody>
                  {movimientos.map((item, index) => {
                    return (
                      <Fragment>
                        <tr key={index}>
                          <td>{item.fechaSalida}</td>
                          <td>{item.tipoOcurrencia}</td>
                          <td>{item.estado}</td>
                          <td><NavLink to='/DetailEmploye' onClick={() => {
                            change(index);
                          }}><Button>Ver más</Button></NavLink></td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>

            </Col>
          </Col>
        </Col>
        <div className="triangle"></div>
      </Col>
    </div>
  );
};

export default HistoryEmploye;
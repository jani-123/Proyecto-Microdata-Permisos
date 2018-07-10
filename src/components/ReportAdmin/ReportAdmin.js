import { Table, Col} from 'react-bootstrap';
import "./ReportAdmin.css";
import { NavLink, Redirect } from "react-router-dom";
import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import logoportada from '../EmployeFirstView/img/logo_portada.png';
import admin from '../EmployeFirstView/img/admin_woman.png';
import { signOut } from "../../actions/actions";

class Test extends Component {
  constructor(props) {
    super(props);
     
  }
  render() {
    return (
      <div className="text-center report-admin">

        <Table id="table-to-xls" responsive>
        {
          this.props.permisos.map((items, index) =>{
            return(
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                </tr>
              <tbody>
                <tr>
                  <td>{this.props.user.nombres}</td>
                  <td>{items.fechaSalida}</td>
                  <td>{items.tipoOcurrencia}</td>
                  <td>Aprobado</td>
                </tr>
              </tbody>
              </thead>
            )
          })
        }
        </Table>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn-export"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Exportar" />
      </div>
    );
  }
}

const ReportAdmin = ({ successLogin, user , permisos }) => {
  return (
    <div>
      {!successLogin && <Redirect to="/" />}
     
      <Col lg={12}>
      
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
          <Col xs={12} md={12}>
            <Test permisos={permisos} user={user} />
          </Col>

        </Col>
      </Col>
      <div className="triangle"></div>
    </div>


  );
};

export default ReportAdmin;
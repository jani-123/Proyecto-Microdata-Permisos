import React from "react";
import { Table, Button, Col, FormGroup, FormControl} from 'react-bootstrap';
import { NavLink, Redirect } from "react-router-dom";
import { signOut,changeView } from "../../actions/actions";
import admin from '../EmployeFirstView/img/admin_woman.png';
import logoportada from '../EmployeFirstView/img/logo_portada.png';
import './HistoryAdmin.css';
import '../EmployeFirstView/FirstView.css';
const HistoryAdmin = ({ successLogin, user , permisos}) => {
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
            <Col lg={6} xsHidden id="logoPortada">
              <img className="logo_portada" src={logoportada} alt="" />
            </Col>
          </Col>
          <Col className="historial" xs={12} md={12}>
            <h2>Historial de ocurrencias</h2>
            <form>
              <Col xs={12} lg={12}>
                <label >Búsqueda</label>
                  
                    <FormGroup controlId="formControlsSelect">
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">Aprobado</option>
                        <option value="other">Denegado</option>
                        <option value="other">Solicitado</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col xs={12} lg={12}>
                    <FormGroup>
                      <FormControl type="text" placeholder="Ocurrencia: Cita médica" />
                    </FormGroup>
                  </Col>
            </form>
    
           <Col lg={12}>
            <Table responsive>
              {
                permisos.map((item,index)=>{
                  return(
                    <thead>
                      <tr>
                        <th>FechaSalida</th>
                        <th>FechaRetorno</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td>{item.fechaSalida}</td>
                          <td>{item.fechaRetorno}</td>
                          <td>{item.tipoOcurrencia}</td>
                          <td>{item.estado}</td>
                          <td><NavLink to='/RequestAdmin' className="btn btn-primary" onClick={() => {
                            changeView(index);}}>Observar solicitud</NavLink></td>
                          <td><NavLink to='/DetailAdmin' onClick={() => {
                            changeView(index);
                          }}><Button>Ver detalles</Button></NavLink></td>
                        </tr>
                      </tbody>
                    </thead>
                  )
                })
              }
            </Table>
                  </Col>
          </Col>
        </Col>
        <div className="triangle"></div>
      </Col>
    </div>
  );
};

export default HistoryAdmin;
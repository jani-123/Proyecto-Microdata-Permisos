import React from "react";
import { Col} from 'react-bootstrap';
import logoportada from '../EmployeFirstView/img/logo_portada.png';
import { NavLink, Redirect } from "react-router-dom";
import admin from '../EmployeFirstView/img/admin_woman.png';
import { signOut , approvedPermission} from "../../actions/actions";

const RequestAdmin = ({ successLogin, user, selectIdPermisos, permisos}) => {
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
                          <h4>Estado: No</h4>
                          <label>Observaciones</label>
                          <textarea className="form-control" rows="3" onChange={e =>
                            this.observaciones = e.currentTarget.value}></textarea>
                          <hr />
                          <div className="text-center">
                            <button id="Aprobado" onClick={(e) => {
                            approvedPermission(true, this.observaciones, selectIdPermisos);}}>Aprobar Permiso<i className="fa fa-check" aria-hidden="true"></i></button>
                            <button id="Aprobado" onClick={(e) => {
                            approvedPermission(false , this.observaciones, selectIdPermisos);}}>Desaprobar Permiso<i className="fa fa-check" aria-hidden="true"></i></button>
                          </div>
                        </div>
                      )
                    }
                    
                  })
              }
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
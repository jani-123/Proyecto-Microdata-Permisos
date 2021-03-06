import React from "react";
import "./App.css";
import Login from "./components/Login/Login.js";
import FirstViewEmploye from "./components/EmployeFirstView/FirstView.js";
import RequestEmploye from "./components/RequestEmploye/RequestEmploye.js";
import DetailEmploye from "./components/DetailEmploye/DetailEmploye.js";
import HistoryEmploye from "./components/HistoryEmploye/HistoryEmploye.js";

import DetailAdmin from "./components/DetailAdmin/DetailAdmin.js";
import FirstViewAdmin from "./components/AdminFirstView/AdminView.js";
import ReportAdmin from "./components/ReportAdmin/ReportAdmin.js";
import RequestAdmin from "./components/RequestAdmin/RequestAdmin.js";
import HistoryAdmin from "./components/HistoryAdmin/HistoryAdmin.js";
 
import { connect } from "redux-zero/react";
import { HashRouter, Switch, Route } from "react-router-dom"; 

const MicroDataApp = ({ successLogin, user, date, ocurrencias, permisos, selectIdPermisos, selectIdDetalle, movimientos, constID,permisosAceptados}) => {
  return <HashRouter>
    <Switch>
      <Route exact path="/" render={() => <Login successLogin={successLogin} user={user} />} />
      <Route path="/Employe" render={() => <FirstViewEmploye successLogin={successLogin} user={user} />} />
      <Route path="/RequestEmploye" render={() => <RequestEmploye successLogin={successLogin} user={user} ocurrencias={ocurrencias} movimientos={movimientos}/>} />
      <Route path="/DetailEmploye" render={() => <DetailEmploye successLogin={successLogin} user={user} selectIdDetalle={selectIdDetalle} movimientos={movimientos}/>} />
      <Route path="/HistoryEmploye" render={() => <HistoryEmploye successLogin={successLogin} user={user} movimientos={movimientos}/>} />

      <Route path="/Admin" render={() => <FirstViewAdmin  successLogin={successLogin} user={user}/>} />  
      <Route path="/ReportAdmin" render={() => <ReportAdmin successLogin={successLogin} user={user} permisosAceptados={permisosAceptados} />} />
      <Route path="/RequestAdmin" render={() => <RequestAdmin successLogin={successLogin} user={user} permisos={permisos}  selectIdPermisos={selectIdPermisos} constID={constID}/>} />
      <Route path="/DetailAdmin" render={() => <DetailAdmin successLogin={successLogin} user={user} permisos={permisos} selectIdPermisos={selectIdPermisos}/>} />
      <Route path="/HistoryAdmin" render={() => <HistoryAdmin successLogin={successLogin} user={user} permisos={permisos} />} />
    </Switch>
  </HashRouter>;
};
const mapToProps = ({ successLogin, user, date, ocurrencias, permisos, selectIdPermisos, selectIdDetalle, movimientos, constID,permisosAceptados}) => ({ successLogin, user, date, ocurrencias, permisos, selectIdPermisos, selectIdDetalle, movimientos, constID,permisosAceptados});
export default connect(mapToProps)(MicroDataApp);

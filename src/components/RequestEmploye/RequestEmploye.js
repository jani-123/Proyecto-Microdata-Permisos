import React from "react";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Button,

} from 'react-bootstrap';

import "./RequestEmploye.css";
import { NavLink, Redirect } from "react-router-dom";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { signOut, addDataEmploye } from "../../actions/actions";
import 'react-datepicker/dist/react-datepicker.css';
import user1 from '../EmployeFirstView/img/user.png';
import userportada from '../EmployeFirstView/img/user2.png';
import logoportada from '../EmployeFirstView/img/logo_portada.png';

class MyDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    this.props.onDate(date)
  }

  render() {
    return <DatePicker
      selected={this.state.startDate}
      onChange={this.handleChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="LLL"
    />
  }
}

const RequestEmploye = ({ successLogin, user, ocurrencias, movimientos}) => {
  const begin = date => {
    this.fechaSalida = date.toString();
  }
  const end = date => {
    this.fechaRetorno = date.toString();
  }

  return (
    <div>
      <Col lg={12}>
        {!successLogin && <Redirect exact to="/#" />}
        <input type="checkbox" className="checkbox" id="menu-toogle" />
        <label htmlFor="menu-toogle" className="menu-toogle"></label>
        <nav className="nav">
          <center>
            <img src={user1} alt="" />
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

          </Col>

          <div className="border-request">
            <form onSubmit={e => {
              e.preventDefault();
              addDataEmploye(
                this.fechaSalida, this.fechaRetorno, this.motivoInput, this.seletinput.checked, this.ocurrenciaSelect);
            }}>
              <Col className="request" xs={12} md={12}>
                <h2>Solicitud de Movimiento de Personal</h2>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Seleccione Una ocurrencia</ControlLabel>
                  <FormControl componentClass="select" placeholder="select" onChange={e =>
                    this.ocurrenciaSelect = e.currentTarget.value

                  }>
                    {
                      ocurrencias.map((item, index) => {
                        return (
                          <option key={index} value={item.ocurrencia} >{item.ocurrencia}</option>
                        )
                      })
                    }
                  </FormControl>
                </FormGroup>

                <Row>
                  <Col xs={12} md={6}>
                    <Row>
                      <Col xs={9} md={9}>
                        <label>Fecha/Hora de Salida</label><br />
                        <MyDate className="mydate" onDate={begin} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={12} md={6}>
                    <Row>
                      <Col xs={9} md={9}>
                        <label>Fecha/Hora de Retorno</label><br />
                        <MyDate className="mydate" bsSize="large" onDate={end} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <br />
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Motivo</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="textarea" onChange={e => this.motivoInput = e.target.value} />
                </FormGroup>
                <FormGroup>
                  <Checkbox className="checkSelect" inputRef={ref => { this.seletinput = ref; }} >Por Compensacion de horas</Checkbox>
                </FormGroup>
                <Button type="submit" className="enviar">
                  Enviar
                </Button>

              </Col>
            </form>
          </div>
        </Col>
      </Col>
      <div className="triangle"></div>
    </div>
  );
};

export default RequestEmploye;
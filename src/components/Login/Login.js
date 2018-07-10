import React from "react";
import { SignIn } from "../../actions/actions";
import "./login.css";
import foto from './img/fondo.png';
import logo from './img/logo1.png';
import { Grid, Row, Col, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { NavLink, Redirect } from "react-router-dom";

const Login = ({ successLogin, user }) => {
  console.log("user", user);
  console.log("user", successLogin);
  return (
    <div id="login">
      <Col lgOffset={4} lg={4} xsOffset={1} xs={10} className="formulario">
        <img src={logo} />
        {
          successLogin ?
            <Redirect to={user.tipoUser === "admin" ? '/Admin' : '/Employe'}></Redirect>
            :
            <form onSubmit={e => {
              e.preventDefault();
              console.log(this.emailInput);
              console.log(this.passwordInput);
              SignIn(this.emailInput, this.passwordInput); 
            }}>
              <FormGroup>
                <InputGroup className="input">
                  <FormControl id="n" type="email" placeholder="Add Email" onChange={e => this.emailInput = e.target.value} required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input">
                  <FormControl id="n" type="password" placeholder="Password" onChange={e => this.passwordInput = e.target.value} required />
                </InputGroup>
              </FormGroup>
              <Button type="submit" className="boton">ACCEDER</Button>
            </form>
        }
      </Col>
      <div className="triangle"></div>

    </div>


  );
};

export default Login;

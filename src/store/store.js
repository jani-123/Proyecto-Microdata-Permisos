import createStore from "redux-zero";

const Permisos = [
  {ocurrencia: 'Comisiones de servicio' },
  {ocurrencia: 'Descanso medico'},
  {ocurrencia: 'Capacitaciones'},
  {ocurrencia: 'Falta injustificada'}, 
  {ocurrencia: 'Permiso a Essalud'},
  {ocurrencia: 'Vacaciones'},
  {ocurrencia: 'Licencia por fallecimiento'},
]
const initialState = {
  successLogin: false,
  selectIdPermisos: 0,
  selectIdDetalle: 0,
  user: {
    id: null,
    nombres: null,
    email: null,
    tipoUser: null,
    movimiento: null
  },
  ocurrencias: Permisos,
  solicitaPermiso: [],
  permisos : [], 
  historialPermisos : [],
  date: new Date(),
  
  active:false
};

const store = createStore(initialState);
export default store;

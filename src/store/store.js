import createStore from "redux-zero";

const Permisos = [
  {ocurrencia: 'Comisiones de servicio' },
  {ocurrencia: 'Descanso medico'},
  {ocurrencia: 'Capacitaciones'},
  {ocurrencia: 'Falta injustificada'}, 
  {ocurrencia: 'Permiso a Essalud'},
  {ocurrencia: 'Vacaciones'},
  {ocurrencia: 'Licencia por fallecimiento'},
];

const initialState = {
  successLogin: false,
  selectIdPermisos: 0,
  selectIdDetalle: 0,// usa para el detalle del permiso
  user: { // para el usuario
    id: null,
    nombres: null,
    email: null,
    tipoUser: null,
  },
  ocurrencias: Permisos, // para lista de casos de permisos
  movimientos: [], // para los permisos-movimiento
  permisos: [],
  date: new Date(), // fecha
  active:false // login
};

const store = createStore(initialState);
export default store;

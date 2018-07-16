import store from "../store/store";
import { auth, database } from "../firebase.js";

export function SignIn(user, pass) {
  auth.signInWithEmailAndPassword(user, pass)
} 

export function signOut() {
  auth.signOut();
  store.setState({
    successLogin: false,
    user: {
      id: "", 
      email: ""
    }
  });
}

auth.onAuthStateChanged(user => {

  if (user) {
    console.log("user", user);
    database
      .ref("users/" + user.uid)
      .once("value")
      .then(res => {
        const fullUserInfo = res.val();
        console.log("full info ", fullUserInfo);
        store.setState({
          successLogin: true,
          user: {
            id: user.uid,
            nombres: fullUserInfo.nombres,
            email: fullUserInfo.email,
            tipoUser: fullUserInfo.tipoUser,
            movimiento: fullUserInfo.movimiento
          }
        });

       
      });
  }
});

export const addDataEmploye = (fechaSalida, fechaRetorno, motivoInput, seletinput, ocurrenciaSelect)=> {
  console.log("actions line 75: ",fechaSalida,fechaRetorno,motivoInput,seletinput,ocurrenciaSelect);
  console.log("linea 47",store.getState())
  
  let list = [...store.getState().solicitaPermiso];
  
  console.log("linea 49", store.getState())
  let ids;
  console.log("line 49: " , list.length);
  if (list !== undefined) {
    ids = list.length;
  }
  
  const objetPermiso = {
    id: ids,
    tipoOcurrencia: ocurrenciaSelect,
    fechaSalida: fechaSalida,
    fechaRetorno: fechaRetorno,
    motivo: motivoInput,
    compensacion: seletinput,
    estado: false,
    jefeRRHH: null
  }
  
  database
    .ref("users/" + store.getState().user.id + "/movimiento/" + objetPermiso.id)
    .set(objetPermiso);
}

export const changeView = id => {
  store.setState({
    selectIdPermisos: id
  });
};

export const change = id => {
  store.setState({
    selectIdDetalle: id
  });
};

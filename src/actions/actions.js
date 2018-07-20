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

/*export function SignIn(user, pass) {
  auth.signInWithEmailAndPassword(user, pass).then(userObj => {
    database
      .ref("users/" + userObj.uid)
      .once("value")
      .then(res => {
        const fullUserInfo = res.val();
        console.log("full info ", fullUserInfo);
        store.setState({
          user: {
            id: userObj.uid,
            nombres: fullUserInfo.nombres,
            email: fullUserInfo.email,
            tipoUser: fullUserInfo.tipoUser,
          }
        });
          readDataPermiso();
      });
  });
}*/
/*auth.onAuthStateChanged(user => {
 
  if (user) {
    console.log("user", user);
    let usersRef = database.ref("/users");
    let userRef = usersRef.child(user.uid);
    store.setState({
      successLogin: true
    });
  }
});*/
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
          }
        });
          readDataPermiso();
      });
  }
});

export const addDataEmploye = (fechaSalida, fechaRetorno, motivoInput, seletinput, ocurrenciaSelect)=> {
  let list = store.getState().movimientos;
  let ids;
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

function readDataPermiso() {
  database.ref("users/" + store.getState().user.id + "/movimiento/").on("value", res => {
      let newMovimiento = [];
      res.forEach(snap => {
        const nexMovimiento = snap.val();
        newMovimiento.push({
          id: nexMovimiento.id,
          tipoOcurrencia: nexMovimiento.tipoOcurrencia,
          fechaSalida: nexMovimiento.fechaSalida,
          fechaRetorno: nexMovimiento.fechaRetorno,
          motivo: nexMovimiento.motivo,
          compensacion: nexMovimiento.compensacion,
          estado: nexMovimiento.estado,
          jefeRRHH: nexMovimiento.jefeRRHH
        })
      });
      store.setState({
        movimientos: newMovimiento
      });
    });
}
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
          if (fullUserInfo.tipoUser === 'admin') {
          let permisos = [];
          database.ref("/users").once("value").then(res => {
            res.forEach(snap => {
              let worker = snap.val()
              console.log(worker);
              const nombres = worker.nombres;
              const email = worker.email;
              const tipo = worker.tipoUser;
              if (tipo !== 'admin' && worker.movimiento) {
                console.log("movimiento", worker );
                  
                worker.movimiento.forEach(item => {
                  console.log("12", item);
                  console.log("data", item.estado);
                  if (!item.estado) {
                    console.log("condicion", item.estado)
                    permisos.push(Object.assign(item, {
                      nombres,
                      email
                    }))
                  }
                }) 
              }
            });
            store.setState({
              permisos: permisos
            });
          })
        }
      });
  }
});

export const addDataEmploye = (fechaSalida, fechaRetorno, motivoInput, seletinput, ocurrenciaSelect)=> {
  let list = store.getState().movimientos;
  let ids;
  if (list !== undefined) {
    ids = list.length;
  }
  let estado = []
  const objetPermiso = {
    id: ids,
    tipoOcurrencia: ocurrenciaSelect,
    fechaSalida: fechaSalida,
    fechaRetorno: fechaRetorno,
    motivo: motivoInput,
    compensacion: seletinput,
    estado:estado
  }

  database
    .ref("users/" + store.getState().user.id + "/movimiento/" + objetPermiso.id)
    .set(objetPermiso);
}

export const changeView = id => {
  console.log("linea 126:" , id)
  store.setState({
    selectIdPermisos: id
  });
};

export const change = id => {
  store.setState({
    selectIdDetalle: id
  });
};

export const approvedPermission = (valor,observacion,idPermisos) => {
  console.log(valor,observacion,idPermisos);
  let list = [...store.getState().movimientos];
  let ids = 0;
  if (list !== undefined) {
    ids = list[idPermisos].estado.length;
  }
  const estado = {
    id: ids,
    estado: valor,
    observacion: observacion
  };

  database
    .ref(
      "users/" +
        store.getState().user.id +
        "/movimiento/" +
        list[idPermisos].id +
        "/estado/" +
        estado.id
    )
    .set(estado);
};

function readDataPermiso() {
  database.ref("users/" + store.getState().user.id + "/movimiento/").on("value", res => {
      let newMovimiento = [];
      res.forEach(snap => {
        const nexMovimiento = snap.val();
        let arrObservacion = [];
        database.ref("users/" + store.getState().user.id + "/movimiento/" + nexMovimiento.id + "/estado/").on("value", res =>{
          res.forEach(snap => {
              arrObservacion.push({
                id: arrObservacion.id,
                estado: arrObservacion.valor,
                observacion: arrObservacion.observacion
              })
          })
        })
        newMovimiento.push({
          id: nexMovimiento.id,
          tipoOcurrencia: nexMovimiento.tipoOcurrencia,
          fechaSalida: nexMovimiento.fechaSalida,
          fechaRetorno: nexMovimiento.fechaRetorno,
          motivo: nexMovimiento.motivo,
          compensacion: nexMovimiento.compensacion,
          estado: arrObservacion
        })
      });
      store.setState({
        movimientos: newMovimiento
      });
    });
}
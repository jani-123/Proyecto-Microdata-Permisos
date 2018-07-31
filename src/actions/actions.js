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
                console.log("linea 75: ",worker);
                const nombres = worker.nombres;
                const email = worker.email;
                const tipo = worker.tipoUser;
                if (tipo !== 'admin' && worker.movimiento) {
                  console.log("linea 80: ", worker );
                    
                  worker.movimiento.forEach(item => {
                    console.log("linea 83: ", item);
                    console.log("linea  84: ", item.active);
                    if (!item.active) {
                      console.log("linea 86: ", item.active)
                      permisos.push(Object.assign(item, {
                        nombres,
                        email
                      }))
                      console.log("linea 91: ", permisos)
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
  
  const objetPermiso = {
    id: ids,
    tipoOcurrencia: ocurrenciaSelect,
    fechaSalida: fechaSalida,
    fechaRetorno: fechaRetorno,
    motivo: motivoInput,
    compensacion: seletinput,
    active: false,
    porAprobar:[],
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
   let newPermisos = [...store.getState().permisos];
  let ids = 0;
  if (newPermisos !== undefined) {
    ids = newPermisos[idPermisos].porAprobar.length;
  }
  const porAprobarse = {
    id: ids,
    estado: valor,
    observacion: observacion
  };
  
  store.setState({
    active: false
  });
  database
    .ref(
      "users/" +
        store.getState().user.id +
        "/permisos/" +
        newPermisos[idPermisos].id +
        "/porAprobar/" +
        porAprobarse.id
    )
    .set(porAprobarse);
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
          active: nexMovimiento.active,
          porAprobar: arrObservacion
        })
      });
      store.setState({
        movimientos: newMovimiento
      });
    });
}
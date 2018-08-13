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
              console.log("linea 64:",permisos);
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
  let objetPermiso = {
    id: ids,
    tipoOcurrencia: ocurrenciaSelect,
    fechaSalida: fechaSalida,
    fechaRetorno: fechaRetorno,
    motivo: motivoInput,
    compensacion: seletinput,
    active: false,
    respuestas: false,
  };
 console.log("linea 90: ", objetPermiso);
  database
    .ref("users/" + store.getState().user.id + "/movimiento/" + objetPermiso.id)
    .set(objetPermiso);
    console.log("linea 94: ", objetPermiso);
     console.log("linea 95:",store.getState());
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
   console.log("linea 112: ", newPermisos);
   let newId = newPermisos[idPermisos].length;

  let objectAprobar = {
    id: newPermisos[idPermisos].id,
    nombres:newPermisos[idPermisos].nombres,
    email: newPermisos[idPermisos].email,
    tipoOcurrencia: newPermisos[idPermisos].tipoOcurrencia,
    fechaSalida: newPermisos[idPermisos].fechaSalida,
    fechaRetorno: newPermisos[idPermisos].fechaRetorno,
    motivo: newPermisos[idPermisos].motivo,
    compensacion: newPermisos[idPermisos].compensacion,
    active: newPermisos[idPermisos].active,
    respuestas: newPermisos[idPermisos].respuestas,
    Observado:[{ 
        id: newPermisos[idPermisos].id,
        estado: valor,
        observacion: observacion,
    }],
  };
  console.log("linea 134:",objectAprobar);
  store.setState({
    active: false
  });
  database
    .ref("users/" + store.getState().user.id + "/permisos/" + objectAprobar.id)
    .set(objectAprobar);
    
   
};

function readDataPermiso() {
  database.ref("users/" + store.getState().user.id + "/movimiento/").on("value", res => {
      let arrMovimiento = [];
      res.forEach(snap => {
        const nexMovimiento = snap.val();
        arrMovimiento.push({
          id: nexMovimiento.id,
          tipoOcurrencia: nexMovimiento.tipoOcurrencia,
          fechaSalida: nexMovimiento.fechaSalida,
          fechaRetorno: nexMovimiento.fechaRetorno,
          motivo: nexMovimiento.motivo,
          compensacion: nexMovimiento.compensacion,
          active: nexMovimiento.active,
          respuestas: nexMovimiento.respuestas
        })
      });
      store.setState({
        movimientos: arrMovimiento
      });
    });
}
/*function readDataPermiso() {
  database.ref("users/" + store.getState().user.id + "/movimiento/").on("value", res => {
      let newMovimiento = [];
      res.forEach(snap => {
        const nexMovimiento = snap.val();
        let arrObservacion = [];
        database.ref("users/" + store.getState().user.id + "/movimiento/" + nexMovimiento.id + "/respuestas/").on("value", res =>{
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
          respuestas: arrObservacion
        })
      });
      store.setState({
        movimientos: newMovimiento
      });
    });
}*/
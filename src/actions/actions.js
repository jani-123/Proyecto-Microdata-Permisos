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
    database
      .ref("users/" + user.uid)
      .once("value")
      .then(res => {
        const fullUserInfo = res.val();
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
                const nombres = worker.nombres;
                const email = worker.email;
                const tipo = worker.tipoUser;
                if (tipo !== 'admin' && worker.movimiento) {
                  worker.movimiento.forEach(item => {
                    if (!item.active) {
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

export const approvedPermission = (valor,observacion,idPermisos,constID) => {
  let newPermisos = [...store.getState().permisos];
  let objectAprobar = {
    id: constID,
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
  store.setState({
    active: false,
    constID: constID += 1
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
  database.ref("users/" + store.getState().user.id + "/permisos/").on("value", res => {
      let arrPermisos = [];
      res.forEach(snap => {
        const nexPermisos = snap.val();
        let arrObservado = [];
        database.ref("users/" + store.getState().user.id + "/permisos/" + nexPermisos.id + "/Observado/").on("value", res =>{
          res.forEach(snap => {
            const nexObservado = snap.val();
              arrObservado.push({
                id: nexObservado.id,
                estado: nexObservado.estado,
                observacion: nexObservado.observacion
              })
          })
        })
        arrPermisos.push({
          id: nexPermisos.id,
          nombres:nexPermisos.nombres,
          email: nexPermisos.email,
          tipoOcurrencia: nexPermisos.tipoOcurrencia,
          fechaSalida: nexPermisos.fechaSalida,
          fechaRetorno: nexPermisos.fechaRetorno,
          motivo: nexPermisos.motivo,
          compensacion: nexPermisos.compensacion,
          active: nexPermisos.active,
          respuestas: nexPermisos.respuestas,
          Observado: arrObservado
        })
      });
      store.setState({
        permisosAceptados: arrPermisos
      });
    });
}

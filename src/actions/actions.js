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
    //let usersRef = database.ref("/users");
    //let userRef = usersRef.child(user.uid);
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

export function addDataEmploye(fechaSalida, fechaRetorno, motivoInput, seletinput, ocurrenciaSelect) {
  console.log("actions line 75: ",fechaSalida,fechaRetorno,motivoInput,seletinput,ocurrenciaSelect);
  let list = store.getState().solicitaPermiso;
  let ids;
    ids = list.length;
  
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
  list.push(objetPermiso);
  store.setState({
    solicitaPermiso: list
  })

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

/*function readDataBoard() {
  database.ref("users/" + store.getState().user.id + "/boards/").on("value", res => {
      let arrBoard = [];
      res.forEach(snap => {
        const boardVal = snap.val();
        console.log("on",boardVal);
        let arrList = [];
        database.ref("users/" + store.getState().user.id + "/boards/" + boardVal.id + "/noteList/").on("value", res => {
          res.forEach(snap => {
            const listVal = snap.val();
            console.log("sisalej..",listVal);
            let arrCard = [];
            database.ref("users/" + store.getState().user.id + "/boards/" + boardVal.id + "/noteList/" + listVal.id + "/cards/").on("value", res =>{
              res.forEach(snap => {
                const cardVal = snap.val();
                arrCard.push(cardVal);
              })
            })
            arrList.push({
              id: listVal.id,
              subtitle: listVal.subtitle,
              cards: arrCard,
              change: listVal.change
            })
          })
        })
        arrBoard.push({
          id: boardVal.id,
          title: boardVal.title,
          noteList: arrList
        })
      });
      store.setState({
        boards: arrBoard
      });
    });
}*/
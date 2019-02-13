export class Api {
  cont() {
    let res = fetch("http://contacts-api.azurewebsites.net/api/contacts/", {
      method: "get"
    });
    return res;
  }

  contAdd(){
    // let res = fetch("http://contacts-api.azurewebsites.net/api/contacts/", {
    //   method: "get"
    // })
    // return res;
  }

  contDel(id) {
    let res = fetch("http://contacts-api.azurewebsites.net/api/contacts/" + id, {
      method: "delete"
    });
    return res;
  }
}

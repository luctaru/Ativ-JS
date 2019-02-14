export class Api {
  cont() {
    let res = fetch("http://contacts-api.azurewebsites.net/api/contacts?limit=25", {
      method: "get"
    });
    return res;
  }

  contSearch(id){
    let res = fetch("http://contacts-api.azurewebsites.net//api/contacts/"+ id, {
        method: "get"
      });
      return res;
  }

  contAdd(id, c){
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

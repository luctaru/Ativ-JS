export class Api {

    async cont() {
        const res = await fetch('http://contacts-api.azurewebsites.net/api/contacts?limit=30');
        const data = await res.json();
        window.state = {
            ...window.state,
            contacts: data,
            loading: false
        }
    }

  async contSearch(id){
    const res = await fetch("http://contacts-api.azurewebsites.net//api/contacts/"+ id);
    const data = await res.json();
    window.state = {
        ...window.state,
        filter: data,
        loading: false
    }
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

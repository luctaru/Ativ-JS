export class Api {

    async cont(skip) {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts?limit=10&skip=${skip}`);
        const data = await res.json();
        window.state = {
            ...window.state,
            contacts: data,
            loading: false
        }
    }

  async contSearch(id){
    const res = await fetch("http://contacts-api.azurewebsites.net/api/contacts/"+ id);
    const data = await res.json();
    window.state = {
        ...window.state,
        filter: data,
        loading: false
    }
  }

  async contAdd(data){
    let res = await fetch("http://contacts-api.azurewebsites.net/api/contacts/", {
      method: "post",
      headers: {'Accept': 'application/json', 'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    console.log(res);
  }

  async contEdit(data, id){
    let res = await fetch("http://contacts-api.azurewebsites.net/api/contacts/" + id, {
      method: "put",
      headers: {'Accept': 'application/json', 'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    console.log(res);
  }

  async contDel(id) {
    let res = await fetch("http://contacts-api.azurewebsites.net/api/contacts/" + id, {
      method: "delete"
    });
  }
}

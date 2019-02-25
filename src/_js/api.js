export class Api {
    async cont() {
        const res = await fetch(
            `http://contacts-api.azurewebsites.net/api/contacts`
        );
        const data = await res.json();
        const favData = [];
        data.map(item => {
            if (item.isFavorite) {
                favData.push(item);
            }
        });

        window.state = {
            ...window.state,
            contacts: data,
            favorites: favData,
            loading: false
        };
    }

    async contSearch(id) {
        const res = await fetch(
            "http://contacts-api.azurewebsites.net/api/contacts/" + id
        );
        const data = await res.json();
        window.state = {
            ...window.state,
            filter: data,
            loading: false
        };
    }

    async contAdd(data) {
        const res = await fetch(
            "http://contacts-api.azurewebsites.net/api/contacts/",
            {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        console.log(res);
    }

    async contEdit(data, id) {
        console.log(data);
        const res = await fetch(
            "http://contacts-api.azurewebsites.net/api/contacts/" + id,
            {
                method: "put",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        console.log(res);
    }

    async contDel(id) {
        const res = await fetch(
            "http://contacts-api.azurewebsites.net/api/contacts/" + id,
            {
                method: "delete"
            }
        );
        console.log(res);
    }
}

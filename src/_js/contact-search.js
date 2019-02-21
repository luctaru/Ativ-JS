import { Api } from "./api.js";
import {renderEdit} from "./edit.js"
import {renderPrin} from "./contact-list.js"
const api = new Api();

export const renderSearch = async (id, arr) => {

    await api.contSearch(id);

    document.getElementById("search-box").style.display = "none";
    document.getElementById("edit-list").style.display = "initial";

    const cont = window.state.filter;

    const section = document.getElementById("prin-section");

    let aux;

    if(cont.gender == 'f'){
        aux = 'Female';
    }
    else{
        aux = 'Male';
    }

    function markup(){
        const m = `<div class="div-top">
        <div class="div-mid">
            <p><img style="width:150px" src="${cont.info.avatar}"></p>
        </div>
        <div class="div-mid">
            <p>${cont.firstName} ${cont.lastName}</p>
            <p>${aux}</p>
            <p>${cont.email}</p>
        </div>
    </div>

    <div class="div-top" id="div-end">
        <div class="div-mid">
            <p>${cont.info.company}</p>
            <p>${cont.info.address}</p>
            <p>${cont.info.phone}</p>
        </div>
    </div>

    <div class="div-foot">
        <p>Comentário:</p>
        <p>${cont.info.comments}
        </p>
    </div>`;
    return m;
    }

    section.insertAdjacentHTML('beforeend', markup());

    document.getElementById("edit-list").addEventListener("click", () => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        renderEdit();
    })

    document.getElementById("rm-list").addEventListener("click", async() => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        await api.contDel(cont.id);
    })

}

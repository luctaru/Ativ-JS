import { Api } from "./api.js";
import { renderSearch } from "./contact-search.js";

const api = new Api();

export const renderList = async () => {
    await api.cont();

    function markupTr(z, ary) {
        const m = `
        <tr class="userRow">
            <td class="col1" style="display:none">${ary[z].id}</td>
            <td class="col0"><input class="check" type="checkbox" />
            </td>
            <td class="col4">
                <input class="star" type="checkbox"/>
            </td>
            <td>${ary[z].firstName}
            </td>
            <td class="col2">${ary[z].lastName}
            </td>
            <td class="col3">${ary[z].email}
            </td>
        </tr>`;
        return m;
    }

    function markupTable() {
        const m = `
        <table id="prin-table">
            <tr id="fRow">
            <td class="col0"><input class="check" type="checkbox" />
            <td colspan="2">Nome</td>
            <td class="col2">Sobrenome</td>
            <td class="col3">E-mail</td>
            </tr>
        </table>`;
        return m;
    }

    function markupBtn() {
        const m = `
        <input id="bMore" class="btn" type="button" value="Mais..."/>`;
        return m;
    }

    function markupFav() {
        const m = `
        <table id="fav-table">
            <tr id="fRow">
            <td class="col0"><input class="check" type="checkbox" />
            <td colspan="2">Nome</td>
            <td class="col2">Sobrenome</td>
            <td class="col3">E-mail</td>
            </tr>
        </table>`;
        return m;
    }

    function renderPrin() {
        const arr = [...window.state.contacts];
        const section = document.getElementById("prin-section");
        section.innerHTML = markupTable();
        section.innerHTML += markupBtn();

        for (let c = 0; c < arr.length; c++) {

            let aux = document.getElementById("prin-table");
            aux.innerHTML += markupTr(c, arr);
        }


        let star = [...document.getElementsByClassName("star")];
        for (let c = 0; c < arr.length; c++) {
            if (arr[c].isFavorite) {
                star[c].setAttribute("checked", "yes");
            }
        }
        let tr = [...document.getElementsByClassName("userRow")];

        for (let c = 10; c < arr.length; c++) {
            tr[c].style.display = "none";
        }

        let user = [...document.getElementsByClassName("col1")];

        // for(let c = 0; c < arr.length; c++){
        //     user[c].addEventListener('click', () => {
        //         const section = document.getElementById("prin-section");
        //         section.innerHTML = ``;
        //         renderSearch(user[c].innerHTML, arr);
        //     })
        // }

        let btnCont = 10;
        let btnContAux = btnCont + 10;

        document.getElementById("bMore").onclick = function() {
            for (let c = btnCont; c < btnContAux; c++) {
                if (typeof tr[c] === "undefined") {
                    section.innerHTML += `<p id = "final-row">ACABOU SEUS CONTATOS</p>`;
                    document.getElementById("bMore").style.display = "none";
                    break;
                } else {
                    tr[c].style.display = "table-row";
                }
            }
            btnCont = btnCont + 10;
            btnContAux = btnCont + 10;
        };
    }

    renderPrin();

    function renderFav(){
        const arr = [...window.state.contacts];
        const section = document.getElementById("prin-section");
        section.innerHTML = markupTable();
        section.innerHTML += markupBtn();

        for (let c = 0; c < arr.length; c++) {
            let aux = document.getElementById("prin-table");
            if(arr[c].isFavorite){
                aux.innerHTML += markupTr(c, arr);
            }
        }

        let star = [...document.getElementsByClassName("star")];
        for(let c = 0; c < arr.length; c++){
            if(typeof star[c] !== "undefined"){
                star[c].setAttribute("checked", "yes");
            }
        }

        let tr = [...document.getElementsByClassName("userRow")];

        for (let c = 10; c < arr.length; c++) {
            if(typeof star[c] !== "undefined"){
                tr[c].style.display = "none";
            }
        }

        let btnCont = 10;
        let btnContAux = btnCont + 10;

        document.getElementById("bMore").onclick = function() {
            for (let c = btnCont; c < btnContAux; c++) {
                if (typeof tr[c] === "undefined") {
                    section.innerHTML += `<p id = "final-row">ACABOU SEUS CONTATOS</p>`;
                    document.getElementById("bMore").style.display = "none";
                    break;
                } else {
                    tr[c].style.display = "table-row";
                }
            }
            btnCont = btnCont + 10;
            btnContAux = btnCont + 10;
        };
    }

    document.getElementById("all-list").addEventListener('click', () => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        renderPrin();
    })

    document.getElementById("fav-list").addEventListener('click', () => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        renderFav();
    })

   }

import { Api } from "./api.js";
import { renderSearch } from "./contact-search.js";

const api = new Api();

export const renderList = async () => {
    await api.cont();

    function markupTr(z, ary) {
        const m = `
        <tr class="userRow">
            <td class="col0" style="display:none">${ary[z].id}</td>
            <td class="col1"><input class="check" type="checkbox" />
            </td>
            <td class="col2">
                <input class="star" type="checkbox"/>
            </td>
            <td class="col3">${ary[z].firstName}
            </td>
            <td class="col4">${ary[z].lastName}
            </td>
            <td class="col5">${ary[z].email}
            </td>
        </tr>`;
        return m;
    }

    function markupTable() {
        const m = `
        <table id="prin-table">
            <tr id="fRow">
            <td class="col1"><input class="check" type="checkbox" />
            <td colspan="2">Nome</td>
            <td class="col4">Sobrenome</td>
            <td class="col5">E-mail</td>
            </tr>
        </table>`;
        return m;
    }

    function markupBtn() {
        const m = `
        <input id="bMore" class="btn" type="button" value="Mais..."/>`;
        return m;
    }

    function markupFav(ary) {
        const m = `

        <tr class="userRow">
            <td class="col0" style="display:none">${ary.id}</td>
            <td class="col1"><input class="check" type="checkbox" />
            </td>
            <td class="col2">
                <input class="star" type="checkbox"/>
            </td>
            <td class="col3">${ary.firstName}
            </td>
            <td class="col4">${ary.lastName}
            </td>
            <td class="col5">${ary.email}
            </td>
        </tr>`;
        return m;
    }

    function search() {
        // const { contacts, filter, loading } = window.state;
        // const contactsMatch = contacts.filter(c =>
        //     new RegExp(filter).test(c.firstName)
        // );

        //     const tb = document.getElementById("prin-table")

        // for (const contact of contactsMatch) {
        //     tb.insertAdjacentHTML('beforeend', markupFav(contact)) ;
        // }

        document.getElementById("iSearch").onkeyup = ({
            target: { value }
        }) => {
            window.state = {
                ...window.state,
                filter: value
            };
            console.log(window.state.filter)
        };
    }



    const arry = [...window.state.contacts];

    function renderPrin(arr) {
        document.getElementById("edit-list").style.display = "none";
        document.getElementById("searchForm").style.display = "initial";


        const section = document.getElementById("prin-section");
        section.insertAdjacentHTML("beforeend", markupTable());
        section.insertAdjacentHTML("beforeend", markupBtn());

        for (let c = 0; c < arr.length; c++) {
            let aux = document.getElementById("prin-table");
            aux.insertAdjacentHTML("beforeend", markupTr(c, arr));
        }

        let star = [...document.getElementsByClassName("star")];
        for (let c = 0; c < arr.length; c++) {
            if (arr[c].isFavorite) {
                star[c].setAttribute("checked", "yes");
            }
            star[c].onchange = function() {
                if (!star[c].checked) {
                    arr[c].isFavorite = false;

                } else {
                    arr[c].isFavorite = true;
                }
            };
        }

        let tr = [...document.getElementsByClassName("userRow")];

        for (let c = 10; c < arr.length; c++) {
            tr[c].style.display = "none";
        }

        let userId = [...document.getElementsByClassName("col0")];
        let userName = [...document.getElementsByClassName("col3")];

        for (let c = 0; c < arr.length; c++) {
            userName[c].addEventListener("click", () => {
                const section = document.getElementById("prin-section");
                section.innerHTML = ``;
                renderSearch(userId[c].innerHTML, arr);
            });
        }

        let btnCont = 10;
        let btnContAux = btnCont + 10;

        document.getElementById("bMore").onclick = function() {
            for (let c = btnCont; c < btnContAux; c++) {
                if (typeof tr[c] === "undefined") {
                    section.insertAdjacentHTML(
                        "beforeend",
                        '<p id = "final-row">ACABOU SEUS CONTATOS</p>'
                    );
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

    renderPrin(arry);


    function checkFav(arry){
        const favArr = [];
        for (let c = 0; c < arry.length; c++) {
            if (arry[c].isFavorite) {
                favArr.push(arry[c]);
            }
        }
        return favArr;
    }

    document.getElementById("all-list").addEventListener("click", () => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        renderPrin(arry);
    });

    document.getElementById("fav-list").addEventListener("click", () => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        const fArr = checkFav(arry);
        renderPrin(fArr);

    });

    search();
};

// var x = document.getElementsByTagName("footer")[0];

        // window.onscroll = function() {
        //     if(x.scrollHeight - x.scrollTop === x.clientHeight){
        //         console.log(x.scrollHeight)
        //         console.log(x.scrollTop)
        //         console.log(x.clientHeight)
        //     }

        // }

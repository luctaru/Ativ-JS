import { Api } from "./api.js";
import { renderSearch } from "./contact-search.js";
import { renderAdd } from "./add.js";
import bstar from "../_img/blankstar-icon.png";
import ystar from "../_img/star-icon.png";
import { renderNav } from "./nav.js";

const api = new Api();

const markupTr = (z, ary) => {
    const m = `
    <tr class="userRow">
        <td class="col0" style="display:none">${ary[z].id}</td>
        <td class="col1">
            <input class="check" type="checkbox" />
        </td>
        <td class="col2">
            <img class="star" src="${bstar}"/>
        </td>
        <td class="col3">${ary[z].firstName}
        </td>
        <td class="col4">${ary[z].lastName}
        </td>
        <td class="col5">${ary[z].email}
        </td>
    </tr>`;
    return m;
};

const markupTable = () => {
    const m = `
    <table id="prin-table">
        <tr id="fRow">
        <th><input id="check-all" class="check" type="checkbox" /></th>
        <th colspan="2">Nome</th>
        <th class="col4">Sobrenome</th>
        <th class="col5">E-mail</th>
        </tr>
    </table>`;
    return m;
};

const markupBtn = () => {
    const m = `
    <input id="bMore" class="btn" type="button" value="Mais..."/>`;
    return m;
};

const search = () => {
    // const { contacts, filter, loading } = window.state;
    // const contactsMatch = contacts.filter(c =>
    //     new RegExp(filter).test(c.firstName)
    // );

    //     const tb = document.getElementById("prin-table")

    // for (const contact of contactsMatch) {
    //     tb.insertAdjacentHTML('beforeend', markupFav(contact)) ;
    // }

    // document.getElementById("iSearch").onkeyup = ({
    //     target: { value }
    // }) => {
    //     window.state = {
    //         ...window.state,
    //         filter: value
    //     };
    //     console.log(window.state.filter);
    // };
    document.getElementById("iSearch").onkeyup = () =>{
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("iSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("prin-table");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
        }
    }

};

export const renderPrin = arr => {
    document.getElementById("edit-list").style.display = "none";
    document.getElementById("iSearch").style.display = "initial";
    document.getElementById("add-list").style.display = "initial";
    document.getElementById("rm-list").style.display = "initial";

    const section = document.getElementById("prin-section");
    //table and 'more' button insertion
    section.insertAdjacentHTML("beforeend", markupTable());
    section.insertAdjacentHTML("beforeend", markupBtn());

    //contacts insertion
    for (let c = 0; c < arr.length; c++) {
        let aux = document.getElementById("prin-table");
        aux.insertAdjacentHTML("beforeend", markupTr(c, arr));
    }

    //checking if contact is favorite and changing star
    let star = [...document.getElementsByClassName("star")];
    for (let c = 0; c < arr.length; c++) {
        if (arr[c].isFavorite) {
            star[c].src = ystar;
        }
        star[c].addEventListener("click", () => {
            if (arr[c].isFavorite) {
                star[c].src = bstar;
                arr[c].isFavorite = false;
            } else {
                star[c].src = ystar;
                arr[c].isFavorite = true;
            }
        });
    }

    let tr = [...document.getElementsByClassName("userRow")];

    let checkbox = [...document.getElementsByClassName("check")];

    //first checkbox changing all of them when clicked
    document.getElementById("check-all").addEventListener("change", () => {
        if (!document.getElementById("check-all").checked) {
            for (let c = 0; c < checkbox.length; c++) {
                checkbox[c].checked = false;
            }
            document.getElementById("check-all").checked = false;
            for (let m = 0; m < tr.length; m++) {
                const a = tr[m].getElementsByTagName("td");
                for (let n = 1; n < a.length; n++) {
                    a[n].setAttribute("style", "background-color:#efdae6");
                }
            }
        } else if (document.getElementById("check-all").checked) {
            document.getElementById("check-all").checked = true;
            for (let c = 0; c < checkbox.length; c++) {
                checkbox[c].checked = true;
            }
            for (let m = 0; m < tr.length; m++) {
                const a = tr[m].getElementsByTagName("td");
                for (let n = 1; n < a.length; n++) {
                    a[n].setAttribute("style", "background-color:#ACADBC");
                }
            }
        }
    });

    let tr2 = [0, ...document.getElementsByClassName("userRow")];

    //changing specific checkbox when clicked
    for (let c = 1; c < checkbox.length; c++) {
        checkbox[c].addEventListener("change", () => {
            if (!checkbox[c].checked) {
                checkbox[c].checked = false;
                const tdCheck = [...tr2[c].getElementsByTagName("td")];
                for (let n = 1; n < tdCheck.length; n++) {
                    tdCheck[n].setAttribute(
                        "style",
                        "background-color: #efdae6"
                    );
                }
            } else if (checkbox[c].checked) {
                checkbox[c].checked = true;
                const tdCheck = [...tr2[c].getElementsByTagName("td")];
                for (let n = 1; n < tdCheck.length; n++) {
                    tdCheck[n].setAttribute(
                        "style",
                        "background-color: #ACADBC"
                    );
                }
            }
        });
    }

    //hiding contacts from second page and beyond
    for (let c = 10; c < arr.length; c++) {
        tr[c].style.display = "none";
    }

    let userId = [...document.getElementsByClassName("col0")];
    let userName = [...document.getElementsByClassName("col3")];

    //adding event to render the contact info
    for (let c = 0; c < arr.length; c++) {
        userName[c].addEventListener("click", () => {
            const section = document.getElementById("prin-section");
            section.innerHTML = ``;
            renderSearch(userId[c].innerHTML, arr);
        });
    }

    let btnCont = 10;
    let btnContAux = btnCont + 10;

    //button to show more 10 contacts
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
};

export const renderList = async () => {
    await api.cont();

    const arry = [...window.state.contacts];

    document.getElementById("all-list").addEventListener("click", () => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        favornot = false;
        renderPrin(arry);
    });

    document.getElementById("fav-list").addEventListener("click", () => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        const fArr = checkFav(arry);
        favornot = true;
        renderPrin(fArr);
    });

    document.getElementById("add-list").addEventListener("click", () => {
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        renderAdd();
    });

    document.getElementById("rm-list").addEventListener("click", async () => {
        let checkbox = [...document.getElementsByClassName("check")];
        let userId = [0, ...document.getElementsByClassName("col0")];
        for (let c = 1; c < checkbox.length; c++) {
            if (checkbox[c].checked) {
                await api.contDel(userId[c].innerHTML);
            }
        }
        await api.cont();
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        const arry2 = [...window.state.contacts];
        const fArr = checkFav(arry2);
        if (favornot) {
            renderPrin(fArr);
        } else {
            renderPrin(arry2);
        }
    });

    //render principal table
    renderPrin(arry);

    //making a array of favorites
    function checkFav(arry) {
        const favArr = [];
        for (let c = 0; c < arry.length; c++) {
            if (arry[c].isFavorite) {
                favArr.push(arry[c]);
            }
        }
        return favArr;
    }

    let favornot = false;

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

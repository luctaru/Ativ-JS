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
    document.getElementById("iSearch").onkeyup = () => {
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
    };
};

const st = arr => {
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
};

const chAll = () => {
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
};

const chOne = () => {
    let tr2 = [0, ...document.getElementsByClassName("userRow")];

    let checkbox = [...document.getElementsByClassName("check")];
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
};

const contInfo = () => {
    let t = document.getElementById("prin-table");
    let contId = t.getElementsByClassName("col0");
    let contName = t.getElementsByClassName("col3");
    for (let c = 0; c < contName.length; c++) {
        contName[c].addEventListener("click", () => {
            const section = document.getElementById("prin-section");
            section.innerHTML = ``;
            renderSearch(contId[c].innerHTML);
        });
    }
};

//making an array of favorites
const checkFav = arry => {
    const favArr = [];
    for (let c = 0; c < arry.length; c++) {
        if (arry[c].isFavorite) {
            favArr.push(arry[c]);
        }
    }
    return favArr;
};

export const renderPrin = arr => {
    document.getElementById("edit-list").style.display = "none";
    document.getElementById("search-box").style.display = "initial";
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

    st(arr);

    chAll();

    chOne();

    contInfo();

};

const bt = () => {
    //button to show more 10 contacts

    let skip = 10;

    document.getElementById("bMore").addEventListener("click", async () => {
        skip += 10;
        await api.cont(skip);
        const arrAux = [];
        const favAux = [];
        window.state.contacts.map(item => {
            arrAux.push(item);
            if(item.isFavorite){
                favAux.push(item);
            }
        });
        console.log(arrAux);
            for (let c = 0; c < arrAux.length; c++) {
                let aux = document.getElementById("prin-table");
                aux.insertAdjacentHTML("beforeend", markupTr(c, arrAux));
            }

        chAll();

        chOne();
        contInfo();
    });
};

export const renderList = async () => {
    await api.cont(10);

    const arry = [...window.state.contacts];
    console.log(arry);
    const handleOnScroll = async () => {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight;
        const clientHeight =
            document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom =
            Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom && end == false) {
            console.log("final");
            skip += 10;
            const data = await api.cont(skip);
            console.log(data);
            data.map(item => {
                arrAux.push(item);
            });
            // if (typeof tr === "undefined") {
            //     section.insertAdjacentHTML(
            //         "beforeend",
            //         '<p id = "final-row">ACABOU SEUS CONTATOS</p>'
            //     );
            //     document.getElementById("bMore").style.display = "none";
            //     end = true;
            // }
        }
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        renderPrin(arrAux);
    };

    //window.addEventListener("scroll", () => handleOnScroll());

    document.getElementById("all-list").addEventListener("click", () => {
        const section = document.getElementById("prin-section");
        document.getElementById("search-box").style.display = "initial";
        section.innerHTML = ``;
        favornot = false;
        localStorage.setItem("bool", false);
        renderPrin(window.state.contacts);
        bt();
    });

    document.getElementById("fav-list").addEventListener("click", async() => {
        const section = document.getElementById("prin-section");
        document.getElementById("search-box").style.display = "initial";
        section.innerHTML = ``;
        let fArr = checkFav(window.state.contacts);
        console.log(fArr)
        console.log(fArr.length)
        if(fArr.length < 10){
            console.log("entrou")
            await api.cont(10);
            fArr = [...checkFav(window.state.contacts)];
        }
        //console.log(JSON.stringify(fArr));
        favornot = true;
        localStorage.setItem("bool", true);
        localStorage.setItem("favA", JSON.stringify(fArr));
        renderPrin(fArr);
        bt();
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
        await api.cont(10);
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        const fArr = checkFav(window.state.contacts);
        if (favornot) {
            renderPrin(fArr);
        } else {
            renderPrin(window.state.contacts);
        }
    });

    //render principal table
    if (localStorage.getItem("bool") === "true") {
        renderPrin(JSON.parse(localStorage.getItem("favA")));
        bt();
    } else if (localStorage.getItem("bool") === "false") {
        renderPrin(arry);
        bt();
    }

    let favornot = false;

    search();
};

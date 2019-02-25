import { Api } from "./api.js";
import { renderSearch } from "./contact-search.js";
import { renderAdd } from "./add.js";
import bstar from "../_img/blankstar-icon.png";
import ystar from "../_img/star-icon.png";

const api = new Api();

const markupTr = (z, ary) => {
    const m = `
    <tr class="userRow">
        <td class="col6" style="display:none">${ary[z].isFavorite}</td>
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
    document.getElementById("searchButton").addEventListener("click", () => {
        const input = document.getElementById("iSearch");
        const filter = input.value.toUpperCase();

        if (filter == "" || filter == null) {
            alert("PLEASE FILL THE FIELD WITH A NAME FOR THE SEARCH");
        } else {
            const favArr = window.state.favorites;
            const arr = window.state.contacts;
            if (localStorage.getItem("bool") === "true") {
                const searchContacts = favArr.filter(c =>
                    new RegExp(filter, "ig").test(
                        `${c.firstName} ${c.lastName}`.toLowerCase()
                    )
                );
                const chunks = chunkArr(searchContacts);
                renderPrin(chunks[0]);
                bt(chunks);
            } else {
                const searchContacts = arr.filter(c =>
                    new RegExp(filter, "ig").test(
                        `${c.firstName} ${c.lastName}`.toLowerCase()
                    )
                );
                const chunks = chunkArr(searchContacts);
                renderPrin(chunks[0]);
                bt(chunks);
            }
        }
    });
};

const st = (arr, si) => {
    //checking if contact is favorite and changing star
    const star = [...document.getElementsByClassName("star")];
    for (let c = 0; c < arr.length; c++) {
        if (arr[c].isFavorite) {
            star[si].src = ystar;
        } else {
            star[si].src = bstar;
        }
        si++;
    }
};

const chAll = () => {
    const tr = [...document.getElementsByClassName("userRow")];

    const checkbox = [...document.getElementsByClassName("check")];

    //first checkbox changing all of them when clicked
    document.getElementById("check-all").addEventListener("change", () => {
        if (!document.getElementById("check-all").checked) {
            for (let c = 0; c < checkbox.length; c++) {
                checkbox[c].checked = false;
            }
            document.getElementById("check-all").checked = false;
            for (let m = 0; m < tr.length; m++) {
                const a = tr[m].getElementsByTagName("td");
                for (let n = 2; n < a.length; n++) {
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
                for (let n = 2; n < a.length; n++) {
                    a[n].setAttribute("style", "background-color:#ACADBC");
                }
            }
        }
    });
};

const chOne = () => {
    const tr2 = [0, ...document.getElementsByClassName("userRow")];

    const checkbox = [...document.getElementsByClassName("check")];
    //changing specific checkbox when clicked
    for (let c = 1; c < checkbox.length; c++) {
        checkbox[c].addEventListener("change", () => {
            if (!checkbox[c].checked) {
                checkbox[c].checked = false;
                const tdCheck = [...tr2[c].getElementsByTagName("td")];
                for (let n = 2; n < tdCheck.length; n++) {
                    tdCheck[n].setAttribute(
                        "style",
                        "background-color: #efdae6"
                    );
                }
            } else if (checkbox[c].checked) {
                checkbox[c].checked = true;
                const tdCheck = [...tr2[c].getElementsByTagName("td")];
                for (let n = 2; n < tdCheck.length; n++) {
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
    const t = document.getElementById("prin-table");
    const contId = t.getElementsByClassName("col0");
    const contName = t.getElementsByClassName("col3");
    for (let c = 0; c < contName.length; c++) {
        contName[c].addEventListener("click", () => {
            const section = document.getElementById("prin-section");
            section.innerHTML = ``;
            renderSearch(contId[c].innerHTML);
        });
    }
};

export const renderPrin = arr => {
    const section = document.getElementById("prin-section");
    section.innerHTML = ``;

    document.getElementById("edit-list").style.display = "none";
    document.getElementById("search-box").style.display = "initial";
    document.getElementById("add-list").style.display = "initial";
    document.getElementById("rm-list").style.display = "initial";

    //table and 'more' button insertion
    section.insertAdjacentHTML("beforeend", markupTable());
    section.insertAdjacentHTML("beforeend", markupBtn());

    for (let c = 0; c < arr.length; c++) {
        const aux = document.getElementById("prin-table");
        aux.insertAdjacentHTML("beforeend", markupTr(c, arr));
    }

    st(arr, 0);

    const star = document.getElementsByClassName("star");
    for (let c = 0; c < arr.length; c++) {
        star[c].addEventListener("click", async () => {
            if (arr[c].isFavorite) {
                star[c].src = bstar;
                arr[c].isFavorite = false;

                const send = {
                    firstName: arr[c].firstName,
                    lastName: arr[c].lastName,
                    email: arr[c].email,
                    gender: arr[c].gender,
                    isFavorite: arr[c].isFavorite,
                    company: arr[c].info.company,
                    avatar: arr[c].info.avatar,
                    address: arr[c].info.address,
                    phone: arr[c].info.phone,
                    comments: arr[c].info.comments
                };
                await api.contEdit(send, arr[c].id);
            } else {
                star[c].src = ystar;
                arr[c].isFavorite = true;
                const send = {
                    firstName: arr[c].firstName,
                    lastName: arr[c].lastName,
                    email: arr[c].email,
                    gender: arr[c].gender,
                    isFavorite: arr[c].isFavorite,
                    company: arr[c].info.company,
                    avatar: arr[c].info.avatar,
                    address: arr[c].info.address,
                    phone: arr[c].info.phone,
                    comments: arr[c].info.comments
                };
                await api.contEdit(send, arr[c].id);
            }
        });
    }
    //stEvent();

    chAll();

    chOne();

    contInfo();
};

const bt = chunks => {
    //button to show more 10 contacts
    let i = 1;
    let si = 10;
    const section = document.getElementById("prin-section");
    document.getElementById("bMore").addEventListener("click", async () => {
        if (typeof chunks[i] === "undefined") {
            section.insertAdjacentHTML(
                "beforeend",
                '<p id = "final-row">ACABOU SEUS CONTATOS</p>'
            );
            document.getElementById("bMore").style.display = "none";
        } else {
            for (let c = 0; c < chunks[i].length; c++) {
                const aux = document.getElementById("prin-table");
                aux.insertAdjacentHTML("beforeend", markupTr(c, chunks[i]));
            }

            st(chunks[i], si);

            const star = document.getElementsByClassName("star");
            const arry = chunks[i];
            for (let c = si, x = -1; c < star.length; c++) {
                star[c].addEventListener("click", async () => {
                    if (arry[x].isFavorite) {
                        star[c].src = bstar;
                        arry[x].isFavorite = false;

                        const send = {
                            firstName: arry[x].firstName,
                            lastName: arry[x].lastName,
                            email: arry[x].email,
                            gender: arry[x].gender,
                            isFavorite: arry[x].isFavorite,
                            company: arry[x].info.company,
                            avatar: arry[x].info.avatar,
                            address: arry[x].info.address,
                            phone: arry[x].info.phone,
                            comments: arry[x].info.comments
                        };
                        await api.contEdit(send, arry[x].id);
                    } else {
                        star[c].src = ystar;
                        arry[x].isFavorite = true;
                        const send = {
                            firstName: arry[x].firstName,
                            lastName: arry[x].lastName,
                            email: arry[x].email,
                            gender: arry[x].gender,
                            isFavorite: arry[x].isFavorite,
                            company: arry[x].info.company,
                            avatar: arry[x].info.avatar,
                            address: arry[x].info.address,
                            phone: arry[x].info.phone,
                            comments: arry[x].info.comments
                        };
                        await api.contEdit(send, arry[x].id);
                    }
                });
                x++;
            }

            //stEvent();

            chAll();

            chOne();

            contInfo();

            i++;
            si += 10;
        }
    });
};

const chunkArr = arr => {
    let i, j, temparray;
    const chunk = 10;
    const chunks = [];
    for (i = 0, j = arr.length; i < j; i += chunk) {
        temparray = arr.slice(i, i + chunk);
        chunks.push(temparray);
    }
    return chunks;
};

export const renderList = async () => {
    const section = document.getElementById("prin-section");
    if (window.state.loading) {
        section.insertAdjacentHTML("beforeend", "<h1>LOADING</h1>");
    }

    await api.cont();

    if (window.state.loading) {
        section.insertAdjacentHTML("beforeend", "<h1>LOADING</h1>");
    } else {
        const section = document.getElementById("prin-section");
        section.innerHTML = "";
        const chunks = chunkArr(window.state.contacts);

        document.getElementById("edit-list").style.display = "none";
        document.getElementById("search-box").style.display = "initial";
        document.getElementById("add-list").style.display = "initial";
        document.getElementById("rm-list").style.display = "initial";

        section.insertAdjacentHTML("beforeend", markupTable());
        section.insertAdjacentHTML("beforeend", markupBtn());

        document.getElementById("all-list").addEventListener("click", () => {
            document.getElementById("search-box").style.display = "initial";
            localStorage.setItem("bool", false);
            renderPrin(chunks[0]);
            bt(chunks);
        });

        document
            .getElementById("fav-list")
            .addEventListener("click", async () => {
                const section = document.getElementById("prin-section");
                document.getElementById("search-box").style.display = "initial";
                section.innerHTML = ``;
                localStorage.setItem("bool", true);
                await api.cont();
                const chunksFav = chunkArr(window.state.favorites);
                renderPrin(chunksFav[0]);
                bt(chunksFav);
            });

        document.getElementById("add-list").addEventListener("click", () => {
            const section = document.getElementById("prin-section");
            section.innerHTML = ``;
            renderAdd();
        });

        document
            .getElementById("rm-list")
            .addEventListener("click", async () => {
                const checkbox = [...document.getElementsByClassName("check")];
                const userId = [0, ...document.getElementsByClassName("col0")];
                for (let c = 1; c < checkbox.length; c++) {
                    if (checkbox[c].checked) {
                        await api.contDel(userId[c].innerHTML);
                    }
                }
                await api.cont();
                const chunksFav = chunkArr(window.state.favorites);
                const section = document.getElementById("prin-section");
                section.innerHTML = ``;
                const chunksAux = chunkArr(window.state.contacts);
                if (localStorage.getItem("bool") === "true") {
                    const aux = chunksFav;
                    renderPrin(aux[0]);
                    bt(aux);
                } else {
                    renderPrin(chunksAux[0]);
                    bt(chunks);
                }
            });

        //contacts insertion
        if (localStorage.getItem("bool") === "true") {
            const chunksFav = chunkArr(window.state.favorites);
            const aux = chunksFav;
            renderPrin(aux[0]);
            bt(aux);
        } else {
            renderPrin(chunks[0]);
            bt(chunks);
        }

        search();
    }
};

import { Api } from "./api.js";
const api = new Api();

export const renderList = () => {

    function markupTr(z, ary){
        const m = `
        <tr class="userRow">
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

    function favBtn(){
        document.getElementById("fav-list").onclick = function(){
            for (i = 1; i <= 10; i++) {
                table.innerHTML += markupTr(i, arr);
            }
            let y = i;
            document.getElementById("bMore").onclick = function() {
                while(y < y + 10) {
                    console.log(y)
                    if (typeof arr[y] === "undefined") {
                        document.getElementById("bMore").style.display = "none";
                        section.innerHTML += `<p id = "final-row">ACABOU OS SEUS CONTATOS</p>`;
                        break;
                    }

                    else if(y % 10 == 0){
                        table.innerHTML += markupTr(y, arr);
                        y++;
                        break;
                    }

                    else{
                        table.innerHTML += markupTr(y, arr);
                    }
                    y++;
                }
            };
        }
    }

    api.cont()
        .then(function(response) {
            response.json().then(function(result) {
                const array = result.map(element => element);
                const arr = [0, ...array];
                const section = document.getElementById("prin-section");
                const markupTable = `
                    <table id="prin-table">
                        <tr id="fRow">
                        <td class="col0"><input class="check" type="checkbox" />
                        <td colspan="2">Nome</td>
                        <td class="col2">Sobrenome</td>
                        <td class="col3">E-mail</td>
                        </tr>
                    </table>`;
                const markupBtn = `
                    <input id="bMore" type="button" value="Mais..."/>`;
                section.innerHTML = markupTable;
                section.innerHTML += markupBtn;

                const table = document.getElementById("prin-table");
                let i;
                for (i = 1; i <= 10; i++) {
                    table.innerHTML += markupTr(i, arr);
                }
                let y = i;
                document.getElementById("bMore").onclick = function() {
                    while(y < y + 10) {
                        console.log(y)
                        if (typeof arr[y] === "undefined") {
                            document.getElementById("bMore").style.display = "none";
                            section.innerHTML += `<p id = "final-row">ACABOU OS SEUS CONTATOS</p>`;
                            break;
                        }

                        else if(y % 10 == 0){
                            table.innerHTML += markupTr(y, arr);
                            y++;
                            break;
                        }

                        else{
                            table.innerHTML += markupTr(y, arr);
                        }
                        y++;
                    }
                };
            });
        })
        .catch(function(err) {
            console.error(err);
        });
};

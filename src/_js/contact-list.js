import { Api } from "./api.js";
import star from "../_img/star.png";

const api = new Api();

export const renderList = () => {
  api.cont()
    .then(function(response) {
      response.json().then(function(result) {
        const section = document.getElementById("prin-section");
        const markupTable = `
        <table id="prin-table">
            <tr id="fRow">
            <td class="col0"><input class="check" type="checkbox" />
            <td colspan="2">Nome</td>
            <td class="col2">Sobrenome</td>
            <td class="col3">E-mail</td>
            </tr>
        </table>
        <input id="bMore" type="button" value="Mais..." />`;
        section.innerHTML = markupTable;
        const array = result.map(element => element);
        for(let i = 0; i < 10; i++){
            const table = document.getElementById("prin-table");
          const x = `<tr class="userRow">
                  <td class="col0"><input class="check" type="checkbox" />
                  </td>
                  <td class="col4">
                      <input class="star-check" type="checkbox" />
                      <label><img class="star-img" src="${star}" /></label>
                  </td>
                  <td>${array[i].firstName}
                  </td>
                  <td class="col2">${array[i].lastName}
                  </td>
                  <td class="col3">${array[i].email}
                  </td>
              </tr>`;
          table.innerHTML += x;
        }
      });
    })
    .catch(function(err) {
      console.error(err);
    });
};

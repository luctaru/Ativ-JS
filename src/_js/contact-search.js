import { Api } from "./api.js";
import star from "../_img/star.png";

const api = new Api();

export const renderSearch = () => {

  api.cont()
    .then(function(response) {
      response.json().then(function(result) {
        const array = result.map(element => element);
        api.contSearch()

      });
    })
    .catch(function(err) {
      console.error(err);
    });
};

{/* <div class="div-top">
                <div class="div-mid">
                    <p><img id="cont-img" src="_img/cont-logo.png"></p>
                </div>
                <div class="div-mid">
                    <p>Pessoa1 Sobrenome1</p>
                    <p>Masculino</p>
                    <p><img src="_img/calendar-icon.png" /> 03/06/1996 </p>
                    <p><img src="_img/mail-icon.png" /> pessoa@forlogic.net</p>
                </div>
            </div>

            <div class="div-top" id="div-end">
                <div class="div-mid">
                    <p><img src="_img/building-icon.png" /> Company A</p>
                    <p><img src="_img/local-icon.png" /> Rua dos Bobos n° 0</p>
                    <p>Cornélio Procópio - PR</p>
                    <p><img src="_img/phone-icon.png" /> (xx)xxxx-xxxx</p>
                </div>
            </div>

            <div class="div-foot">
                <p>Comentário:</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </p>
            </div> */}

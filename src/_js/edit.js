import { Api } from "./api.js";
import { format } from "util";

const api = new Api();

export const renderEdit = async () => {
    document.getElementById("search-box").style.display = "none";
    document.getElementById("edit-list").style.display = "none";
    document.getElementById("rm-list").style.display = "initial";
    document.getElementById("add-list").style.display = "none";

    const section = document.getElementById("prin-section");

    let filter = window.state.filter;

    function markup() {
        const m = `<form method="POST" id="form-add">
        <fieldset id="iPerson">
            <legend>Dados Pessoais</legend>
            <p><img style="width:150px" id="add-img" src="${filter.info.avatar}">
            </p>
            <p><label for="iName">Nome:</label><br />
                <input class="input-form" type="text" name="nNome" id="iNome" size="35" maxlength="35"
                 value="${filter.firstName}"/>
            </p>
            <p><label for="iSurname">Sobrenome:</label><br />
                <input class="input-form" type="text" name="nSurname" id="iSurname" size="35" maxlength="35"
                value="${filter.lastName}"/>
            </p>
            <p>Sexo:<br /><br />
                <input type="radio" name="nGenre" id="iMale" />
                <label for="iMale">Masculino</label><br />
                <input type="radio" name="nGenre" id="iFemale" />
                <label for="iFemale">Feminino</label>
            </p>
            <p><label for="iEmail">E-mail:</label><br />
                <input class="input-form" type="email" name="nEmail" id="iEmail" size="35" maxlength="40"
                value="${filter.email}"/>
            </p>
            <p><label for="iPhone">Telefone:</label><br />
                <input class="input-form" type="text" name="nPhone" id="iPhone" size="35" maxlength="40"
                value="${filter.info.phone}"/>
            </p>
        </fieldset>

        <fieldset id="iAddress">
            <legend>Endereço</legend>
            <p><label for="iComp">Empresa: </label><br />
                <input class="input-form" type="text" name="nComp" id="iComp" size="35" max="50"
                value="${filter.info.company}"/>
            </p>
            <p><label for="iStreet">Logradouro: </label><br />
                <input class="input-form" type="text" name="nStreet" id="iStreet" size="35" max="80"/>
            </p>
            <p><label for="iNum">Número: </label><br />
                <input class="input-form" type="number" name="nNum" id="iNum" min="0" max="99999" />
            </p>
            <p><label for="iState">Estado: </label><br />
                <input class="input-form" type="text" name="nState" id="iState" maxlength="40" size="35"/>
            </p>
            <p><label for="iCity">Cidade: </label><br />
                <input class="input-form" type="text" name="nCity" id="iCity" maxlength="40" size="35"/>
            </p>
        </fieldset>

        <fieldset id="iComment">
            <legend>Anotações</legend>
            <p><label for="iMsg">Comentário: </label><br />
                <textarea name="nMsg" id="iMsg" cols="35" rows="5">${filter.info.comments}</textarea>
            </p>
        </fieldset>

        <button class="ani-button" type="submit" id="send-btn">
            <span><i>Salvar</i></span>
        </button>
    </form>`;
        return m;
    }

    section.insertAdjacentHTML("beforeend", markup());

    const radios = document.getElementsByName("nGenre");
    if (filter.gender == 'm'){
        radios[0].setAttribute("checked", "yes");
    } else{
        radios[1].setAttribute("checked", "yes");
    }

    if(filter.info.address != null){
        const auxNum = filter.info.address.split(" ", 1);
    const aux = filter.info.address.split(",");
    const aux2 = aux[0];
    const aux3 = aux2.split(" ")
    const auxStreet = aux3[1] + ' ' + aux3[2];

    document.getElementById("iNum").setAttribute("value", auxNum);
    document.getElementById("iStreet").setAttribute("value", auxStreet);
    document.getElementById("iState").setAttribute("value", aux[1])
    document.getElementById("iCity").setAttribute("value", aux[2])
    }


    // const name = document.getElementById("iName");
    // const surname = document.getElementById("iSurname");
    // const email = document.getElementById("iEmail");
    // const phone = document.getElementById("iPhone");
    // const comp = document.getElementById("iComp");
    // const street = document.getElementById("iStreet");
    // const num = document.getElementById("iNum");
    // const state = document.getElementById("iState");
    // const city = document.getElementById("iCity");


};


import { Api } from "./api.js";
import cicon from "../_img/cont-logo.png";

const api = new Api();

export const renderAdd = async () => {
    document.getElementById("search-box").style.display = "none";
    document.getElementById("edit-list").style.display = "none";
    document.getElementById("rm-list").style.display = "none";
    document.getElementById("add-list").style.display = "none";

    const section = document.getElementById("prin-section");

    function markup() {
        const m = `<form method="POST" id="form-add">
        <fieldset id="iPerson">
            <legend>Dados Pessoais</legend>
            <p><img id="add-img" src="${cicon}">
            </p>
            <p><label for="iName">Nome:</label><br />
                <input class="input-form" type="text" name="nNome" id="iNome" size="35" maxlength="35" />
            </p>
            <p><label for="iSurname">Sobrenome:</label><br />
                <input class="input-form" type="text" name="nSurname" id="iSurname" size="35" maxlength="35" />
            </p>
            <p>Sexo:<br /><br />
                <input type="radio" name="nGenre" id="iMale" />
                <label for="iMale">Masculino</label><br />
                <input type="radio" name="nGenre" id="iFemale" />
                <label for="iFemale">Feminino</label>
            </p>
            <p><label for="iEmail">E-mail:</label><br />
                <input class="input-form" type="email" name="nEmail" id="iEmail" size="35" maxlength="40" />
            </p>
            <p><label for="iPhone">Telefone:</label><br />
                <input class="input-form" type="text" name="nPhone" id="iPhone" size="35" maxlength="40">
            </p>
        </fieldset>

        <fieldset id="iAddress">
            <legend>Endereço</legend>
            <p><label for="iComp">Empresa: </label><br />
                <input class="input-form" type="text" name="nComp" id="iComp" size="35" max="50" />
            </p>
            <p><label for="iStreet">Logradouro: </label><br />
                <input class="input-form" type="text" name="nStreet" id="iStreet" size="35" max="80" />
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
                <textarea name="nMsg" id="iMsg" cols="35" rows="5"></textarea>
            </p>
        </fieldset>

        <button class="ani-button" type="submit" id="send-btn">
            <span><i>Salvar</i></span>
        </button>
    </form>`;
        return m;
    }

    section.insertAdjacentHTML("beforeend", markup());



    function validate() {
        const name = document.getElementById("iName");
        const surname = document.getElementById("iSurname");
        const radios = document.getElementsByName("nGenre");
        const email = document.getElementById("iEmail");
        const phone = document.getElementById("iPhone");
        const comp = document.getElementById("iComp");
        const street = document.getElementById("iStreet");
        const num = document.getElementById("iNum");
        const state = document.getElementById("iState");
        const city = document.getElementById("iCity");

        if (
            (name.value == null || name.value == "",
            surname.value == null || surname.value == "",
            email.value == null || email.value == "",
            comp.value == null || comp.value == "",
            street.value == null || street.value == "",
            num.value == null || num.value == "",
            state.value == null || state.value == "",
            city.value == null || city.value == "")
        ) {
            alert("Please Fill All Required Field");
            return false;
        }
        const formValid = false;

        const i = 0;
        while (!formValid && i < radios.length) {
            if (radios[i].checked) formValid = true;
            i++;
        }

        if (!formValid){
            alert("Must check some option!");
            return formValid;
        }

        if(!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone.value)){
            alert("Please Fill The Phone Field Correctly");
            return false;
        }
    }

    function send(bool){

        const genAux = '';

        const name = document.getElementById("iName").value;
        const surname = document.getElementById("iSurname").value;
        const radios = document.getElementsByName("nGenre");
        if (radios[0].checked){
            genAux = 'm'
        } else{
            genAux = 'f'
        }
        const email = document.getElementById("iEmail").value;
        const phone = document.getElementById("iPhone").value;
        const comp = document.getElementById("iComp").value;
        const street = document.getElementById("iStreet").value;
        const num = document.getElementById("iNum").value;
        const state = document.getElementById("iState").value;
        const city = document.getElementById("iCity").value;
        const msg = document.getElementById("iMsg").value;

        const address = num + street + state + city;

        if(bool){
            const send = {
                "firstName": name,
                "lastName": surname,
                "email": email,
                "gender": genAux,
                "isFavorite": false,
                "company": comp,
                "avatar": "string",
                "address": address,
                "phone": phone,
                "comments": msg
            }
        }
    }

    const name = document.getElementById("iName");
    const surname = document.getElementById("iSurname");
    const radios = document.getElementsByName("nGenre");
    const email = document.getElementById("iEmail");
    const phone = document.getElementById("iPhone");
    const comp = document.getElementById("iComp");
    const street = document.getElementById("iStreet");
    const num = document.getElementById("iNum");
    const state = document.getElementById("iState");
    const city = document.getElementById("iCity");

    // document.getElementById("send-btn").addEventListener("click", () => {
    //     if()
    // });
};
{
    /*  */
}

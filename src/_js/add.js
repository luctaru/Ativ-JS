import { Api } from "./api.js";
import cicon from "../_img/cont-logo.png";
import {renderImg} from "./img.js";
import { renderList } from "./contact-list.js";

const api = new Api();

const img = renderImg();

export const validate = () =>{
    const name = document.getElementById("iName");
    name.addEventListener("click", () =>{
        name.setAttribute("style", "box-shadow: none");
    });
    const surname = document.getElementById("iSurname");
    surname.addEventListener("click", () =>{
        surname.setAttribute("style", "box-shadow: none");
    });
    const radios = document.getElementsByName("nGenre");
    for(let c = 0; c < radios.length; c++){
        radios[c].addEventListener("click", () =>{
            radios[c].setAttribute("style", "box-shadow: none");
        });
    }
    const email = document.getElementById("iEmail");
    email.addEventListener("click", () =>{
        email.setAttribute("style", "box-shadow: none");
    });
    const phone = document.getElementById("iPhone");
    phone.addEventListener("click", () =>{
        phone.setAttribute("style", "box-shadow: none");
    });
    const comp = document.getElementById("iComp");
    comp.addEventListener("click", () =>{
        comp.setAttribute("style", "box-shadow: none");
    });
    const street = document.getElementById("iStreet");
    street.addEventListener("click", () =>{
        street.setAttribute("style", "box-shadow: none");
    });
    const num = document.getElementById("iNum");
    num.addEventListener("click", () =>{
        num.setAttribute("style", "box-shadow: none");
    });
    const state = document.getElementById("iState");
    state.addEventListener("click", () =>{
        state.setAttribute("style", "box-shadow: none");
    });
    const city = document.getElementById("iCity");
    city.addEventListener("click", () =>{
        city.setAttribute("style", "box-shadow: none");
    });

    if (name.value == null || name.value == "" || name.value.length < 3) {
        alert("Please Fill All Required Field with 3 or More Characters");
        name.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }

    if(surname.value == null || surname.value == "" || surname.value.length < 3){
        alert("Please Fill All Required Field with 3 or More Characters");
        surname.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }

    if(email.value == null || email.value == "" || email.value.length < 3){
        alert("Please Fill All Required Field with 3 or More Characters");
        email.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }

    if(comp.value == null || comp.value == "" || comp.value.length < 3){
        alert("Please Fill All Required Field with 3 or More Characters");
        comp.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }

    if(street.value == null || street.value == "" || street.value.length < 2){
        alert("Please Fill All Required Field with 3 or More Characters");
        street.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }

    if(num.value == null || num.value == ""){
        alert("Please Fill All Required Field with 3 or More Characters");
        num.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }

    if(state.value == null || state.value == "" || state.value.length < 2){
        alert("Please Fill All Required Field with 3 or More Characters");
        state.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }

    if(city.value == null || city.value == "" || city.value.length < 2){
        alert("Please Fill All Required Field with 3 or More Characters");
        city.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }

    let formValid = false;

    let i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;
    }

    if (!formValid){
        alert("Must check some option!");
        radios[0].setAttribute("style", "box-shadow: 2px 2px 2px red");
        radios[1].setAttribute("style", "box-shadow: 2px 2px 2px red");
        return formValid;
    }

    if(!/[0-9]/im.test(phone.value) || phone.value == ""
    || phone.value == null || phone.value.length < 3){
        alert("Please Fill The Phone Field Correctly");
        phone.setAttribute("style", "box-shadow: 2px 2px 2px red");
        return false;
    }
    return true;
}

export const send = async(bool, img) =>{

    let genAux = '';

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

    const address = num + ' ' + street + ', ' + state + ', ' + city;

    if(bool){
        let send = {
            "firstName": String(name),
            "lastName": String(surname),
            "email": String(email),
            "gender": String(genAux),
            "isFavorite": false,
            "company": String(comp),
            "avatar": String(img),
            "address": String(address),
            "phone": String(phone),
            "comments": String(msg)
        }
        await api.contAdd(send);
        window.state = {
            ...window.state,
            filter: send
        }
        const section = document.getElementById("prin-section");
        section.innerHTML = ``;
        renderList();
    }
    else{
        console.log("erro")
    }
}

const markup = () =>{
    const m = `<div id="form-add">
    <fieldset id="iPerson">
        <legend>Dados Pessoais</legend>
        <p><img id="add-img" src="${cicon}">
        </p>
        <p><label for="iName">Nome:</label><br />
            <input class="input-form" type="text" name="nName" id="iName" size="35" maxlength="35" />
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

    <button class="ani-button" id="send-btn">
        <span><i>Salvar</i></span>
    </button>
</div>`;
    return m;
}

export const renderAdd = async () => {
    document.getElementById("search-box").style.display = "none";
    document.getElementById("edit-list").style.display = "none";
    document.getElementById("rm-list").style.display = "none";
    document.getElementById("add-list").style.display = "none";

    const section = document.getElementById("prin-section");

    section.insertAdjacentHTML("beforeend", markup());

    document.getElementById("add-img").addEventListener("click", () =>{
        document.getElementById("add-img").setAttribute("style", "width: 200px");
        document.getElementById("add-img").setAttribute("src", renderImg());
    })

    document.getElementById("send-btn").addEventListener("click", () => {
        send(validate(), img);
    });
};

import sicon from '../_img/search-icon.png'

export const renderNav = async () => {
    function markup() {
        const m = `
            <nav id="org">
                <h2>Contatos:</h2>
                <ul>
                    <li class="list" id="all-list">Todos</li>
                    <li class="list" id="fav-list">Favoritos
                    </li>
                    <li class="list" id="add-list">Adicionar
                    </li>
                    <li class="list" id="rm-list">Deletar</li>
                    <li class="list" id="edit-list">Editar</li>
                </ul>
            </nav>

            <div id="search-box">
                <img id="search-icon" src="${sicon}"/>
                <input type="text" name="nSearch" id="iSearch" size="50" maxlength="50"
                    placeholder="Digite o nome do contato..." />
            </div>`;

            return m;
    }

    document.getElementById("root").insertAdjacentHTML('afterbegin', markup());


};

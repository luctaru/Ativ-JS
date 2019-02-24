import './_css/style.css'
import './_css/cont.css'
import './_css/form.css'
import {renderList} from './_js/contact-list.js'
import { renderNav } from './_js/nav.js';

window.state = {
    loading: true,
    filter: '',
    contacts: [],
    favorites: []
}

renderNav();
renderList();


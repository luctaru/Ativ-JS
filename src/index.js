import './_css/style.css'
import './_css/cont.css'
import {renderList} from './_js/contact-list.js'
import { renderNav } from './_js/nav.js';

window.state = {
    loading: true,
    filter: '',
    contacts: []
}

renderNav();
renderList();


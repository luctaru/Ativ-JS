import './_css/style.css'
import {renderList} from './_js/contact-list.js'

window.state = {
    loading: true,
    filter: '',
    contacts: []
}

renderList();


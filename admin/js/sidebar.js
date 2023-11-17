import { sidebar } from "../../components/admin/adminSideBar.js"

const bar = document.getElementById('bar')
const loadBar = document.createElement('span');
loadBar.innerHTML = sidebar
bar.append(loadBar)

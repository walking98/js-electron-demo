const path = require('path')
const {ipcRenderer, app, Menu, Tray} = require('electron')

const add = document.querySelector("#put-in-tray")
add.onclick = () => {
  //todo how to call main process func ???
  alert('todo')
}
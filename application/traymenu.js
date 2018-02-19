const electron = require('electron');
const { app, BrowserWindow, Menu, MenuItem } = electron;

const traytemplate = [
  {label: 'Item1', sublabel:'alma', type: 'radio'},
  {label: 'Item2', type: 'radio'},
  {label: 'Item3', type: 'radio', checked: true},
  {label: 'Item4', type: 'radio'}
]


module.exports = traytemplate
console.time('init')

const electron = require('electron');
const url = require('url');
const path = require('path');

const debug = require('./application/debug');


const { app, BrowserWindow, Menu, Tray } = electron;

const template = require('./application/menu');
const traytemplate = require('./application/traymenu');

let mainWindow;
let willQuitApp = false;

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'windows', 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}))

	mainWindow.on('close', (e) => {
    if (willQuitApp) {
      mainWindow = null;
    } else {
      e.preventDefault();
      mainWindow.hide();
    }
  });

	
	
  const contextMenu = Menu.buildFromTemplate(traytemplate)
  tray = new Tray('./IconTemplate.png')
  tray.setToolTip(app.getName())
  tray.setContextMenu(contextMenu)

	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

})

app.on('activate', () => {
	mainWindow.show()
});


app.on('before-quit', () => willQuitApp = true);




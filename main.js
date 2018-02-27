const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const express = require('express')();
const url = require('url');
const path = require('path');

const debug = require('./application/debug');

const router = require('./helpers/router')

let template = require('./application/menu');
let traytemplate = require('./application/traymenu');

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


	
	template = template(mainWindow)
	traytemplate = traytemplate(mainWindow)
	
  const contextMenu = Menu.buildFromTemplate(traytemplate)
  tray = new Tray('./Statics/Files/Images/TrayIcon/TrayIcon.png')
  tray.setToolTip(app.getName())
  tray.setContextMenu(contextMenu)
  tray.setTitle('Toucan')


	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

})


app.on('activate', () => {
	mainWindow.show();
});



app.on('before-quit', () => willQuitApp = true);



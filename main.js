const { app, BrowserWindow, Menu, Tray, ipcMain, dialog } = require('electron');
const express = require('express')();
const url = require('url');
const path = require('path');
const Store = require('electron-store')
const store = new Store()
const router = require('./helpers/router')

const debug = require('./application/debug');
let template = require('./application/menu');
let traytemplate = require('./application/traymenu');
let actions = require('./application/actions');

let mainWindow;
let addLoaderWindow;
let willQuitApp = false;

store.set('unicorn', {unicorn: '🦄'})

const createWindow = (props, window) => {
	window = new BrowserWindow(props);

	window.loadURL(url.format({
		pathname: path.join(__dirname, 'windows', 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}))
}



app.on('ready', () => {

	let storedProjects

	storedProjects = store.get('projects')

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
	
	

	const updateMenus = (projects) => {

		let _template = template(mainWindow, actions((_projects) => updateMenus(_projects)), projects)
		let _traytemplate = traytemplate(mainWindow)

		const contextMenu = Menu.buildFromTemplate(_traytemplate)
	  tray = new Tray('./Statics/Files/Images/TrayIcon/TrayIcon.png')
	  tray.setToolTip(app.getName())
	  tray.setContextMenu(contextMenu)
	  tray.setTitle('Toucan')

		const menu = Menu.buildFromTemplate(_template)
		Menu.setApplicationMenu(menu)
	}
	
	updateMenus(storedProjects)
  

})

app.on('activate', () => {
	mainWindow.show();
});

app.on('before-quit', () => willQuitApp = true);






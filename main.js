const { app, BrowserWindow, Menu, Tray, ipcMain, dialog } = require('electron');
const ipc = require('ipc');
const express = require('express')();
const url = require('url');
const path = require('path');
const Store = require('electron-store');
const store = new Store();
const { spawn } = require('child_process');
const sizeOf = require('image-size');
const router = require('./helpers/router');

const debug = require('./application/debug');
const getAllFiles = require('./application/getAllFiles');
let template = require('./application/menu');
let traytemplate = require('./application/traymenu');
let actions = require('./application/actions');

let tray

let mainWindow;
let addLoaderWindow;
let willQuitApp = false;

const updateProjects = (projects, window) => {
	let _template = template(
		window, 
		actions((_projects) => updateProjects(_projects)), 
		projects);
	const menu = Menu.buildFromTemplate(_template);
	Menu.setApplicationMenu(menu);

	let _traytemplate = traytemplate(
		window,
		actions((_projects) => updateProjects(_projects)),
		projects);
	const contextMenu = Menu.buildFromTemplate(_traytemplate);
  tray = new Tray('./Statics/Files/Images/TrayIcon/TrayIcon.png');
  // tray.setToolTip(app.getName())
  tray.setContextMenu(contextMenu);
  tray.setTitle('Toucan');
	mainWindow.webContents.send('projects', projects);
}

const createWindow = (props, window) => {
	window = new BrowserWindow(props);

	window.loadURL(url.format({
		pathname: path.join(__dirname, 'windows', 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}));
};

app.on('ready', () => {
	let storedProjects = store.get('projects') ? store.get('projects') : [];

	const ls = spawn('echo', ['-lh', '/usr']);

	mainWindow = new BrowserWindow({
		'minHeight': 600,
  	'minWidth': 900,
  	'height': 600,
  	'width': 900,
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'windows', 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('close', (e) => {
    if (willQuitApp) {
      mainWindow = null;
    } else {
      e.preventDefault();
      mainWindow.hide();
    }
  });

	ipcMain.on('ready', () => {
		mainWindow.webContents.send('projects', 
			storedProjects ? storedProjects : [], 
			storedProjects.length > 0 && getAllFiles(storedProjects[0].folder));
	});

	ipcMain.on('project:select', (e, project) => {
		console.log(project, getAllFiles(project.folder))
		mainWindow.webContents.send('project:select', project, getAllFiles(project.folder))
	})

	ipcMain.on('project:remove', (e, id) => {
		let Projects = store.get('projects') ? store.get('projects') : [];
		Projects.splice(Projects.findIndex(elem => elem.id === id), 1)
		store.set('projects', Projects)

		mainWindow.webContents.send('projects', Projects);
	})

	ipcMain.on('image:inspect', (e, path) => {
		console.log(path)
		console.log(sizeOf(path))
	})

	updateProjects(storedProjects, mainWindow);
	mainWindow.webContents.send('project:select', storedProjects[0], getAllFiles(storedProjects[0].folder))
})

app.on('activate', () => {
	mainWindow.show();
});

app.on('before-quit', () => willQuitApp = true);






const electron = require('electron');
const { app, BrowserWindow, Menu, MenuItem } = electron;

const router = require('../helpers/router')

const trayProject = require('../helpers/trayProject')

const traytemplate = (window) => {
	let template = [
	  trayProject('Test Project', 001, '2017-10-02', '1.000Kb', (id) => {console.log('Server toggle')}, (id) => router(window, '/körte'), 3000),
	  trayProject('Test Project 2', 002, '2017-10-02', '1.000Kb', (id) => {console.log('Server toggle')}, (id) => router(window, '/körte'), null),
	]

	return template
}


module.exports = traytemplate
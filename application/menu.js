const electron = require('electron');
const { app, BrowserWindow, Menu, dialog } = electron;
const Store = require('electron-store');
const store = new Store();

const project = require('../helpers/project')
const webpackProject = require('../helpers/webpackProject')

const liveServer = require('./liveServer')

const router = require('../helpers/router')


const template = (window, actions, projects) => {

  const menu = [
    {
      label: 'Projects',
      submenu: [
        {type: 'separator'},
        {
          label: 'Add directory to project',
          accelerator: 'CommandOrControl+Shift+A',
          click: () => actions.addDirToProjects()
        },
        {type: 'separator'},
        {
          label: 'Manage Projects',
          accelerator: 'CommandOrControl+Shift+M',
          click: () => console.log(store.get('unicorn'))
        },
      ]
    },
    {
      label: 'Webpack',
      submenu: [
        webpackProject(
          'Test project', 
          001, 
          (id) => console.log(`Starting wp for ${id}`), 
          true, 
          (id) => console.log(`Toggle file watch for ${id}`), 
          (id) => console.log(`Manage config for: ${id}`)
        ),
        {type: 'separator'},
        {
          label: 'Manage presets',
          click: () => console.log(`Manage wp presets`)
        },
        {type: 'separator'},
        {
          label: 'Current version',
          submenu: [
            {
              label: '1.0.0',
              type: 'radio',
              checked: true
            },
            {
              label: '3.0.0',
              type: 'radio',
              checked: false
            }
          ]
        },
        {
          label: 'Search for updates',
          click: () => {console.log('Webpack update')}
        },
        {type: 'separator'},
        {
          label: 'Webpack API',
          click: () => { require('electron').shell.openExternal('https://webpack.js.org/') }
        },
        {
          label: 'Learn more',
          click: () => { require('electron').shell.openExternal('https://lets-code.hu/')}
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    }
  ]

  let projectsMenu = []
  for (var i = 0; i < projects.length; i++) {
    menu[0].submenu.unshift(
      project(
        projects[i].name, 
        projects[i].id, 
        projects[i].modified,
        (projects[i].size / 1024 ).toFixed(2) + 'Kb', (id) => liveServer.start(0, 1), (id) => liveServer.stop(0)))
  }


  if (process.platform === 'darwin') {
    menu.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })

    // Window menu
    menu[5].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }

  return menu
}


module.exports = template
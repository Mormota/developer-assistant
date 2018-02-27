const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

const project = require('../helpers/project')
const webpackProject = require('../helpers/webpackProject')

const router = require('../helpers/router')

const template = (window) => {

  const menu = [
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'Projects',
      submenu: [
        project('Test Project', 001, '2017-10-02', '1.000Kb', (id) => {console.log('Server toggle')}, (id) => router(window, '/körte')),
        {type: 'separator'},
        {
          label: 'Add directory to project',
          accelerator: 'CommandOrControl+Shift+A',
        },
        {
          label: 'Open Project',
          accelerator: 'CommandOrControl+Shift+O',
        },
        {type: 'separator'},
        {
          label: 'Manage Projects',
          accelerator: 'CommandOrControl+Shift+M'
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

    // Edit menu
    menu[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    )

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
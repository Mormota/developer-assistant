const trayProject = (label, id, lastModified, size, servertoggle, click, liveserver) => {
  let server
  let serverStatus = liveserver
  let browserOpen
  if(!liveserver || liveserver === null){
    server = 'Start live server'
    serverStatus = null
    browserOpen = null
  } else {
    server = `Server running on port ${liveserver}`
    serverStatus = liveserver
  }

  let template = {
    label: label,
    click: () => click(id),
    submenu: [
      {
        label: server,
        click: () => servertoggle(id)
      },
      {type: 'separator'},
      {
        label: 'Open projects folder',
        click: () => {console.log('open folder')}
      },
      {
        label: 'Manage project',
        click: () => click(id)
      },
      {
        label: 'Setup webpack',
        click: () => {console.log(`Setup webpack for ${label}-${id}`)}
      },
      {type: 'separator'},
      {
        label: `Size: ${size}`,
        enabled: false
      },
      {
        label: `Last modified: ${lastModified}`,
        enabled: false
      }
    ] 
  }


  if(serverStatus !== null){
    template.submenu.splice(1, 0, {
        label: 'Open in browser',
        click: () => require('electron').shell.openExternal(`http://localhost:${serverStatus}`)
      })
  }

  return template
}

module.exports = trayProject
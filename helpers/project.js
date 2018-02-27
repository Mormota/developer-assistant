

const project = (label, id, lastModified, size, servertoggle, click, remove, liveserver) => {
  let server
  let serverStatus = liveserver
  if(!liveserver || liveserver === null){
    server = 'Start live server'
    serverStatus = null
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
      },
      {type: 'separator'},
      {
        label: 'Remove project',
        click: () => remove(id)
      }
    ] 
  }


  return template
}

module.exports = project
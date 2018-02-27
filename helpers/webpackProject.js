const webpackProject = (label, id, start, wathcing, toggleWatch, manageConfig) => {

	let template = {
        label: label,
        submenu: [
          {
            label: 'Start webpack',
            click: () => start(id)
          },
          {
            label: 'Watch files',
            type: 'checkbox',
            checked: wathcing || false,
            click: () => toggleWatch(id)
          },
          {
            label: 'Manage config',
            click: () => manageConfig(id)
          }
        ]
      }
	return template
}

module.exports = webpackProject
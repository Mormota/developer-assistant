const { dialog } = require('electron');
const Store = require('electron-store');
const store = new Store();
const uuid = require('uuid/v4');
const getSize = require('get-folder-size');

const actions = (callback) => {
	return {
		addDirToProjects: () => {

			const projectFolder = dialog.showOpenDialog({properties: ['openDirectory']})[0]

			let project = {
				name: projectFolder.split('/').reverse()[0],
				folder: projectFolder,
				id: uuid(),
				modified: new Date()
			}

			getSize(projectFolder, (err, size) => {
				if(err) return err;
				
				project.size = size

				let projects = store.get('projects')

				if(projects) {
					projects.push(project)
				} else {
					projects = [project]
				}

				store.set('projects', projects)

				callback(projects)

			})
		},
	}
}

module.exports = actions
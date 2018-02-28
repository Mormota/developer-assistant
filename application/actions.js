const { dialog } = require('electron');
const Store = require('electron-store');
const store = new Store();
const uuid = require('uuid/v4');
const getSize = require('get-folder-size');

const actions = (callback) => {
	return {
		addDirToProjects: () => {
			const projectFolder = dialog.showOpenDialog({properties: ['openDirectory']})[0];
			let projects = store.get('projects');	
			let project = {
				name: projectFolder.split('/').reverse()[0],
				folder: projectFolder,
				id: uuid(),
				modified: new Date()
			};

			getSize(projectFolder, (err, size) => {
				if(err) return err;
				
				project.size = size;

				if(projects) {
					projects.push(project);
				} else {
					projects = [project];
				}

				store.set('projects', projects);
				callback(projects);
			})
		},
		removeProject: (id) => {
			let projects = store.get('projects');

			projects.splice(projects.indexOf((project) => project.id === id), 1);

			store.set('projects', projects);
			callback(projects);
		}
	}
}

module.exports = actions
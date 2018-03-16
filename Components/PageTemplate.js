import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import ProjectItem from './Static/ProjectItem'

import Subdir from './Templates/Subdir'

import notifier from '../helpers/notifier';
import Image from './helpers/extension';

export default class Template extends Component {
	constructor(props){
		super(props);
		this.state = {
			projects: [],
			current: null,
			currentProject: undefined
		}
	}

	handleSelect = (project) => {
		ipcRenderer.send('project:select', project)
		ipcRenderer.once('project:select', (e, response, files) => {
			console.log({ response, files })
			this.setState({ current: project.id, currentProject: { response, files }})
		})
	}

	actions = {
		removeProject: (id) => {
			const confirm = confirm('Are u sure about dat?')
			if(confirm === true) {
				
			}

			ipcRenderer.send('project:remove', (id))
		}
	}

	render() {

		const actions = {
			removeProject: (id) => {
				ipcRenderer.send('project:remove', id)
			}
		}

		const projects = this.state.projects

		ipcRenderer.on('router', (e, route) => {
			this.props.history.push(route);
		})

		

		return (
			<div className="main-window">
				<div className="header">
					Header
				</div>
				<div className="main-container">
					<div className="side">
						{
							this.state.projects.map(project => <ProjectItem 
									current={this.state.current} 
									key={project.id} 
									project={project}
									select={this.handleSelect}
									actions={actions}
								/>)
						}
					</div>
					<div className="main">
						{
							this.state.currentProject && this.state.currentProject.files.map((file, i) => {
									if(file.type === 'file'){
										return <div key={i}>{file.label}</div>
									} else if(file.type === 'directory') {
										return <Subdir label={file.label} files={file.files} />
									}
								}
							)
						}
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		ipcRenderer.send('ready');
		ipcRenderer.on('projects', (e, projects, files, alma, körte) => {
			console.log(projects, files, alma, körte)
			this.setState({ projects, current: projects[0].id, currentProject: { files } });
		});
	}
}

import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import ProjectItem from './Static/ProjectItem'

import notifier from '../helpers/notifier';

export default class Template extends Component {
	constructor(props){
		super(props);
		this.state = {
			projects: [],
			current: 0
		}
	}

	handleSelect = (current) => {
		this.setState({ current })
	}

	render() {

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
							this.state.projects.map((project, i) => <ProjectItem 
									number={i} 
									current={this.state.current === i} 
									key={project.id} 
									project={project}
									select={this.handleSelect}
								/>)
						}
					</div>
					<div className="main">Main</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		ipcRenderer.send('ready');
		ipcRenderer.on('projects', (e, projects) => {
			console.log(projects)
			this.setState({ projects });
		});
	}
}

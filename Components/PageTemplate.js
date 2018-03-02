import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import notifier from '../helpers/notifier';

export default class Template extends Component {
	constructor(props){
		super(props);
		this.state = {
			projects: []
		}
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
							this.state.projects.map(project => (
									<div className="project" key={project.id}>
										<span className="label">{project.name}</span>
									</div>
								))
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
			this.setState({ projects });
		});
	}
}

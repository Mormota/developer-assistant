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
				<div className="side">
					<div className="side-header"></div>
					<div className="side-nav">
						{
							projects.map(project => <span>{project.name}</span>)
						}
					</div>
				</div>
				<div className="main">
					<div className="main-header">
						{this.props.header}
					</div>
					<div className="main-main">
						{this.props.children}
					</div>
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

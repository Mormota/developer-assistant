import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import notifier from '../helpers/notifier';

export default class Template extends Component {
	render() {
		const history = this.props.history
		ipcRenderer.on('router', (e, route) => {
			history.push('/körte')
		})
		return (
			<div className="main-window">
				<div className="side">
					<div className="side-header"></div>
					<div className="side-nav"></div>
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
}

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Files from './Routes/Files'

export default class Routes extends Component {
	render() {
		console.log(this.context)
		const project = this.context.currentProject
		return (
			<div>
				<Route exact path="/" render={({ history }) => <Files files={project ? project.files : []} />}/>
				<Route path="/körte" render={({ history }) => <div>Körte<span onClick={() => history.push('/')}>To Alma</span></div>}/>
			</div>
		);
	}
}

Routes.contextTypes = {
	current: PropTypes.string,
	currentProject: PropTypes.object,
	projects: PropTypes.array
}

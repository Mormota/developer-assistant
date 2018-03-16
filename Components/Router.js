require('../Statics/Styling/main.sass');

import { ipcRenderer } from 'electron';

import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';

import Template from './PageTemplate';
import Routes from './Routes';

import notifier from '../helpers/notifier';
import debug from '../helpers/debug';

export default class Router extends Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route render={({ history }) => (
						<Template history={history} header={(
								<div>HEADER</div>
							)} >
							<Routes />
						{/*<Route path="*" render={({ history }) => console.log(this.props.location.pathname)} />*/}
						</Template>
					)} />
	      </Switch>
      </HashRouter>
		);
	}
}

// <span onClick={() => notifier({title: 'Title', content: 'Content', subtitle: 'ALma'})}>Notification</span>

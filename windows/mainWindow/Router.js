import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import notifier from '../../helpers/notifier';
import debug from '../../helpers/debug';

export default class Router extends Component {
	render() {
		//notifier({title: 'Title', content: 'Content', subtitle: 'ALma'}, () => alert('Notification clicked'))
		debug(['location:',window.location.pathname.includes('.html')])
		return (
			<HashRouter>
				<Switch>
					<div>
					<span onClick={() => notifier({title: 'Title', content: 'Content', subtitle: 'ALma'}, () => alert('Notification clicked'))}>Notification</span>
					<Route exact path="/" render={({ history }) => <div>alma <span onClick={() => history.push('/körte')}>To körte</span></div>}/>
					<Route path="/körte" render={({ history }) => <div>Körte<span onClick={() => history.push('/')}>To Alma</span></div>}/>
					{/*<Route path="*" render={({ history }) => console.log(this.props.location.pathname)} />*/}
					</div>
	      </Switch>
      </HashRouter>
		);
	}
}

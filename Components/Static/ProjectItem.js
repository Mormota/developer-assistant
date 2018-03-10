import React, { Component } from 'react';


export default class ProjectItem extends Component {

	handleSelect = () => this.props.select(this.props.number)

	render() {
		const project = this.props.project
		return (
			<div className={this.props.current === true ? 'ProjectItem current' : 'ProjectItem'} onClick={this.handleSelect}>
				<div className="status running" />
				<span className="label">{project.name}</span>
				{
					this.props.current && (
						<div className="ProjectSide">
							<div className="webpack">
								<img src={'../Statics/Files/Images/webpack-icon.svg'}/>
							</div>
							<div className="webpack">
								<div className="dots">
									<img src={'../Statics/Files/Images/dots.svg'}/>
								</div>
							</div>
							<div className="toolbarHandler"></div>
						</div>
						)
				}
			</div>
		);
	}
}

import React, { Component } from 'react';


export default class ProjectItem extends Component {
	constructor() {
		super();
		this.state = {
			toolbar: false
		}
	};


	handleSelect = () => this.props.select(this.props.number);
	handleToolbar = () => this.setState({ toolbar: !this.state.toolbar });

	render() {
		const project = this.props.project
		return (
			<div className={this.props.current === true ? 'ProjectItem current' : 'ProjectItem'} onClick={this.handleSelect}>
				<div className="status running" />
				<span className="label">{project.name}</span>
				{
					this.props.current && (
						<div className="ProjectSide">
							<span className="indicator"/>

							<div className="webpack">
								<img src={'../Statics/Files/Images/webpack-icon.svg'}/>
							</div>
							<div className="webpack">
								<div className="dots" onClick={this.handleToolbar}>
									<img src={'../Statics/Files/Images/dots.svg'}/>
								</div>
							</div>
								{
									this.state.toolbar &&	<div className="toolbarHandler">
										<img src={'../Statics/Files/Images/ToolbarContainer.svg'} alt=""/>
										

										<div className="toolbarContent">
											<div>Start webpack</div>
											<img id="highlight" className='highlight' src={'../Statics/Files/Images/ToolbarHighlight.svg'} alt=""/>
											<div>Start Node.js Server</div>
			                <div>Open npm config</div>
			                <div>Bug tracker</div>
			                <div>Setup Liveserver</div>
			                <div>Check for errors</div>
			                <div>Analize project</div>
			                <div>Remove project</div>
										</div>
									</div>

								}
							</div>
						)
				}
			</div>
		);
	}
}

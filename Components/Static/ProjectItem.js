import React, { Component } from 'react';


export default class ProjectItem extends Component {
	constructor() {
		super();
		this.state = {
			toolbar: false
		}
	};


	handleSelect = () => this.props.current !== this.props.project.id && this.props.select(this.props.project);

	handleToolbar = () => {
		this.setState({ toolbar: true })
		setTimeout(() => {window.addEventListener('click', this.hideToolbar)}, 100)	
	};

	hideToolbar = (e) => {
		this.setState({ toolbar: false })
		setTimeout(() => window.removeEventListener('click',this.hideToolbar), 100)
	};

	render() {
		const project = this.props.project
		let current = this.props.current == project.id
		return (
			<div className={current === true ? 'ProjectItem current' : 'ProjectItem'} onClick={this.handleSelect}>
				<div className="status running" />
				<span className="label">{project.name}</span>
				{
					current && (
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
										<img style={{position: 'relative', zIndex: 1}} src={'../Statics/Files/Images/ToolbarContainer.svg'} alt=""/>
										

										<div className="toolbarContent">
											<div>Start webpack</div>
											<img id="highlight" className='highlight' src={'../Statics/Files/Images/ToolbarHighlight.svg'} alt=""/>
											<div>Start Node.js Server</div>
			                <div>Open npm config</div>
			                <div>Bug tracker</div>
			                <div>Setup Liveserver</div>
			                <div>Check for errors</div>
			                <div>Analize project</div>
			                <div onClick={() => this.props.actions.removeProject(project.id)}>Remove project</div>
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

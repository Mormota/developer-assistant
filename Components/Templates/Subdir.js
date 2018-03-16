import React, { Component } from 'react';

export default class Subdir extends Component {
	constructor() {
		super();
		this.state = {
			collapsed: true
		}
	}
	render() {
		const files = this.props.files
		const label = this.props.label

		console.log(files)

		return (
			<div onClick={() => {
				console.log('collapsed', this.state.collapsed)
				this.setState({ collapsed: !this.state.collapsed })
			}}>
				{label} - Dir
				{
					(this.state.collapsed === false && files) && files.map((file, i) => {
						if(file.type === 'file'){
							return <div key={i}>{file.label}</div>
						} else if(file.type === 'directory') {
							return <Subdir key={i} label={file.label} files={file.files}/>
						}
					})
				}
			</div>
		);
	}
}

Subdir.defaultProps = {
	files: []
}

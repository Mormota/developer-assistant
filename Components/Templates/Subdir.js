import React, { Component } from 'react';
import Image from '../helpers/extension';

import File from './File'
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
			<div className={`file subdir`} >
				<img src={`../Statics/Files/Images/extensions/file_type_dir.png`} alt=""/>
				<span onClick={() => {
					console.log('collapsed', this.state.collapsed)
					this.setState({ collapsed: !this.state.collapsed })
				}} className="label">{label}</span>
				<div style={{position: 'relative'}}>
					{
						(this.state.collapsed === false && files) && files.map((file, i) => {
							if(file.type === 'file'){
								return <File key={i} file={file} />
							} else if(file.type === 'directory') {
								return <Subdir key={i} label={file.label} files={file.files}/>
							}
						})
					}
				</div>
			</div>
		);
	}
}

Subdir.defaultProps = {
	files: []
}

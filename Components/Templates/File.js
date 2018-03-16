import React, { Component } from 'react';
import Image from '../helpers/extension';
import { ipcRenderer } from 'electron';

export default class File extends Component {
	open() {
		console.log('File')
		ipcRenderer.send('image:inspect', this.props.file.path)
	}
	render() {
		const file = this.props.file
		return (
			<div className={`file`}>
				<span className="label" onDoubleClick={this.open.bind(this)}>{file.label}</span>
				<img src={`../Statics/Files/Images/extensions/${Image(file.label)}.png`} alt=""/>
			</div>
		);
	}
}

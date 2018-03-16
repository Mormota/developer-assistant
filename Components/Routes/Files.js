import React, { Component } from 'react';
import File from '../Templates/File';
import Subdir from '../Templates/Subdir';

export default class Files extends Component {
	render() {
		const files = this.props.files
		return (
			<div>
				{
					files.map((file, i) => {
						if(file.type === 'file'){
							return <File key={i} file={file} />
						} else if(file.type === 'directory'){
							return <Subdir key={i} label={file.label} files={file.files} />
						}
					})
				}
			</div>
		);
	}
}

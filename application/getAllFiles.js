const fs = require('fs')
const readdir = require('readdir-absolute');

const getAllFiles = (directory, nodeModules, git) => {
	const showNode = nodeModules ? true : false
	const showGit = git ? true : false
	let response = []
	const files = fs.readdirSync(directory)

	files.forEach(file => {
		if(fs.lstatSync(directory + '/' + file).isDirectory()){
			let dirFiles
			if((file === 'node_modules' && showNode === false)) {
				dirFiles = null
			} else if((file === '.git' && showGit === false)) {
				dirFiles = null
			} else{
				dirFiles = getAllFiles(directory + '/' + file)
			}
			response.push({label: file, type: 'directory', files: dirFiles})
		} else {
			response.push({label: file, type: 'file'})
		}
	})
	return response


	// readdir(directory, (err, files) => {
	// 	console.log(directory, err, files)
	// })

	 // response
}

module.exports = getAllFiles
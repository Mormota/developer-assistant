const icons = {
	'c': 'c',
	'cc': 'cpp',
	'cpp': 'cpp',
	'css': 'css',
	'csv': 'csv',
	'net': 'dotnet',
	'ttf': 'font',
	'otf': 'font',
	'woff': 'font',
	'woff2': 'font',
	'gitignore': 'git',
	'html': 'html',
	'png': 'image',
	'jpg': 'image',
	'jpeg': 'image',
	'tiff': 'image',
	'bmp': 'image',
	'js': 'js',
	'json': 'json',
	'less': 'less',
	'md': 'markdown',
	'pdf': 'pdf',
	'php': 'php',
	'ppt': 'powerpoint',
	'pug': 'pug',
	'py': 'python',
	'scss': 'scss',
	'sass': 'sass',
	'svg': 'svg',
	'directory': 'dir'
}

const file = 'default'
const Image = (extension) => {
	if(extension !== 'webpack.config.js' && extension !== 'packages.json'){
		extension = extension.split('.').reverse()[0]
		const image = icons[extension] ? icons[extension] : file
		return 'file_type_' + image
	} else {
		if(extension === 'webpack.config.js') return 'file_type_webpack'
		if(extension === 'packages.json') return 'file_type_npm'
	}		
	
}

export default Image

console.log(Image('webpack.config.js'))
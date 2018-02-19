const sounds = {
	notification: '../windows/mainWindow/static/files/sounds/intuition.mp3'
}

const notifier = ({ title, content, image, reply, subtitle, silent, sound }, callback) => {
	let notification = Notification.requestPermission((permission) => {
		let _silent = false
		if(sound || silent === true){
			_silent = true
		}
    if(permission == "granted"){
        new Notification(title, {
        	icon:image, 
        	subtitle: subtitle || null,
        	body:content,
        	image: image || null,
        	hasReply: true, 
        	silent: _silent
        })
    };
  });
  if(sound){
  	var audio = new Audio(sounds[sound]);
		audio.play();
  }
}

module.exports = notifier
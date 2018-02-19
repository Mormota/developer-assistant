function onProgress (progress) {
  // Use values 0 to 1, or -1 to hide the progress bar
  mainWindow.setProgressBar(progress || -1) // Progress bar works on all platforms
}

// When work completes while the app is in the background, show a badge
var numDoneInBackground = 4
function onDone () {
  var dock = electron.app.dock // Badge works only on Mac
  if (!dock || mainWindow.isFocused()) return
  numDoneInBackground++
  dock.setBadge('' + numDoneInBackground)
}
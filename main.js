const video = document.querySelector('video')
const greeting = document.getElementById('greeting')
const greeting2 = document.getElementById('greeting2')
video.addEventListener('play', function () {
  greeting.innerText = 'fuck you'
  greeting2.innerText = 'no bragle here'
})

video.addEventListener('pause', function () {
  greeting.innerText = 'bragle is soooooooooooooooo epic'
  greeting2.innerText = 'trollar'
})




const context = new AudioContext()
const videoSource = context.createMediaElementSource(video)
const analyser = context.createAnalyser() //we create an analyser
analyser.smoothingTimeConstant = .9
analyser.fftSize = 512 //the total samples are half the fft size.
videoSource.connect(analyser)
analyser.connect(context.destination)

function heartbeat() {
  var array = new Uint8Array(analyser.fftSize)
  analyser.getByteTimeDomainData(array)

  var average = 0
  var max = 0
  for (let i = 0; i < array.length; i++) {
    const a = Math.abs(array[i] - 128)
    average += a
    max = Math.max(max, a)
  }

  average /= array.length

  const size = average / 70
  video.style.transform = `scale(${Math.max(size, 1)})`
  setTimeout(heartbeat, 100)
}

heartbeat()

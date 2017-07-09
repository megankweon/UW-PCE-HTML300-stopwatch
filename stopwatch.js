// button controls
const start = document.querySelector('button.start')
const stop = document.querySelector('button.stop')
const lap = document.querySelector('button.lap')
const reset = document.querySelector('button.reset')


// DOM elements that I need to update
const lapList = document.querySelector('#lapList')
const stopwatchTime = document.querySelector('#stopwatchTime')

// constants that shouldn't ever change
const laps = []
const intervalRate = 10 // update the stopwatch every 10 milliseconds

// values that will change pretty often
let intervalId = null
let currentTimer = 0
let rawTime = 0


// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}

// start the stopwatch by creating a new interval
// we'll store the interval id so we can manipulate the interval later
function stopwatchStart (event) {
  event.preventDefault()
  console.log('started!')

  // every 10 milliseconds, update the stopwatch
  intervalId = setInterval(stopwatchUpdate, intervalRate)
}

// adds the interval to the stopwatch time since the last "tick"
// then update the DOM with the new stopwatch time
function stopwatchUpdate () {
  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

// stops the stopwatch by clearing the interval
function stopwatchStop (event) {
  event.preventDefault()
  console.log('stopped!')
  clearInterval(intervalId)
}


// adds new laps as it clicks the 'lap' button
function newLap(event){
  event.preventDefault()
  console.log('New Lap!')
  let newText = document.getElementById('stopwatchTime').innerHTML
  document.getElementById('lapList').innerHTML =
  document.getElementById('lapList').innerHTML + newText + "\\ \n";
}



// resets the stopwatch and update the Dom to 0
function stopwatchReset(event) {
  event.preventDefault()
  console.log('reset!')
  clearInterval(intervalId)
  rawTime = 0
  document.getElementById('stopwatchTime').innerHTML = "00:00.00"
  document.getElementById('lapList').innerHTML = "" // reset the lap

}



// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')

// calling the events as the click the buttons
  start.addEventListener("click", stopwatchStart)
  stop.addEventListener("click", stopwatchStop)
  lap.addEventListener("click", newLap)
  reset.addEventListener("click", stopwatchReset)

})

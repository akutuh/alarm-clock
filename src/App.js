import { useState, useEffect, useRef } from 'react'
import './app.css'
import alarmSound from './alarm_sound.mp3'

const App = () => {
  const [time, setTime] = useState()
  const [alarmTimeHours, setAlarmTimeHours] = useState(0)
  const [alarmTimeMinutes, setAlarmTimeMinutes] = useState(0)
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('0')
  const [alarm, setAlarm] = useState('')
  const [isAlarm, setIsAlarm] = useState(false)

  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      setTime(date.toLocaleTimeString())
    }, 1000)
    if (alarm === time) {
      playAlarm()
    }
  }, [time])

  const handlePlusHour = () => {
    if (alarmTimeHours < 9) {
      setAlarmTimeHours(alarmTimeHours + 1)
    } else if (alarmTimeHours === 9) {
      setHours('')
      setAlarmTimeHours(alarmTimeHours + 1)
    } else if (alarmTimeHours >= 10 && alarmTimeHours < 23) {
      setAlarmTimeHours(alarmTimeHours + 1)
    } else if (alarmTimeHours === 23) {
      setHours('0')
      setAlarmTimeHours(0)
    }
  }

  const handleMinusHour = () => {
    if (alarmTimeHours === 10) {
      setHours('0')
      setAlarmTimeHours(alarmTimeHours - 1)
    } else if (alarmTimeHours === 0) {
      setHours('')
      setAlarmTimeHours(23)
    } else {
      setAlarmTimeHours(alarmTimeHours - 1)
    }
  }

  const handlePlusMinutes = () => {
    if (
      alarmTimeMinutes < 9 ||
      (alarmTimeMinutes >= 10 && alarmTimeMinutes < 59)
    ) {
      setAlarmTimeMinutes(alarmTimeMinutes + 1)
    } else if (alarmTimeMinutes === 9) {
      setMinutes('')
      setAlarmTimeMinutes(alarmTimeMinutes + 1)
    } else if (alarmTimeMinutes === 59) {
      setMinutes('0')
      setAlarmTimeMinutes(0)
    }
  }

  const handleMinusMinutes = () => {
    if (alarmTimeMinutes === 10) {
      setMinutes('0')
      setAlarmTimeMinutes(alarmTimeMinutes - 1)
    } else if (alarmTimeMinutes === 0) {
      setMinutes('')
      setAlarmTimeMinutes(59)
    } else {
      setAlarmTimeMinutes(alarmTimeMinutes - 1)
    }
  }

  const setTimeAlarm = () => {
    if (alarmTimeHours < 10) {
      if (alarmTimeMinutes < 10) {
        setAlarm(`0${alarmTimeHours}.0${alarmTimeMinutes}.00`)
      } else {
        setAlarm(`0${alarmTimeHours}.${alarmTimeMinutes}.00`)
      }
    } else if (alarmTimeMinutes < 10) {
      setAlarm(`${alarmTimeHours}.0${alarmTimeMinutes}.00`)
    } else {
      setAlarm(`${alarmTimeHours}.${alarmTimeMinutes}.00`)
    }
    if (!isAlarm) setIsAlarm(!isAlarm)
  }

  const alarmAudio = useRef(new Audio(alarmSound))

  const playAlarm = () => {
    alarmAudio.current.play()
    alarmAudio.current.loop = true
    setIsAlarm(!isAlarm)
  }

  const resetAlarm = () => {
    alarmAudio.current.pause()
    if (isAlarm) setIsAlarm(!isAlarm)
    setAlarmTimeHours(0)
    setHours('0')
    setAlarmTimeMinutes(0)
    setMinutes('0')
  }

  return (
    <div
      className="App"
      style={{
        background: isAlarm ? 'black' : '',
        color: isAlarm ? 'white' : '',
        height: '100vh',
      }}
    >
      <header>Alarm clock</header>
      <div>
        <p>current {time}</p>
        <p className="time">
          set time <br></br> {hours}
          {alarmTimeHours}:{minutes}
          {alarmTimeMinutes}
        </p>
        <button className="time-button" onClick={handlePlusHour}>
          + hour
        </button>{' '}
        <button className="time-button" onClick={handleMinusHour}>
          - hour
        </button>{' '}
        <button className="time-button" onClick={handlePlusMinutes}>
          + minutes
        </button>
        <button className="time-button" onClick={handleMinusMinutes}>
          - minutes
        </button>
        <br></br>
        <button className="button-alarm" onClick={setTimeAlarm}>
          set alarm
        </button>
        <button className="button-reset" onClick={resetAlarm}>
          reset alert
        </button>
      </div>
    </div>
  )
}

export default App

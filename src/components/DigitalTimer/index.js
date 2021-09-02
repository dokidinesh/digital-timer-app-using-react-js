// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerStarted: false,
  initialTimeLimit: 25,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onClickReset = () => {
    clearInterval(this.timerId)
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, initialTimeLimit} = this.state
    const isTimerCompleted = timeElapsedInSeconds === initialTimeLimit * 60

    if (isTimerCompleted) {
      clearInterval(this.timerId)
      this.setState({isTimerStarted: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickStartOrPause = () => {
    const {timeElapsedInSeconds, initialTimeLimit, isTimerStarted} = this.state

    const isTimerCompleted = timeElapsedInSeconds === initialTimeLimit * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerStarted) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerStarted: !prevState.isTimerStarted,
    }))
  }

  onClickDecrease = () => {
    const {initialTimeLimit} = this.state
    if (initialTimeLimit > 1) {
      this.setState(prevState => ({
        initialTimeLimit: prevState.initialTimeLimit - 1,
      }))
    }
  }

  onClickIncrease = () => {
    this.setState(prevState => ({
      initialTimeLimit: prevState.initialTimeLimit + 1,
    }))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {initialTimeLimit, timeElapsedInSeconds} = this.state
    const totalRemaininingSeconds = initialTimeLimit * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemaininingSeconds / 60)
    const seconds = Math.floor(totalRemaininingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerStarted, initialTimeLimit, timeElapsedInSeconds} = this.state

    const startOrPauseText = isTimerStarted ? 'Pause' : 'Start'

    const startOrPauseAltText = isTimerStarted ? 'pause icon' : 'play icon'

    const timerLabel = isTimerStarted ? 'Running' : 'Paused'

    const startImgUrl =
      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const pauseImgUrl =
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const startOrPauseImgUrl = isTimerStarted ? pauseImgUrl : startImgUrl
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="digital-timer-app">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-section">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{timerLabel}</p>
            </div>
          </div>
          <div className="controls-container">
            <div className="timer-controller-section">
              <button
                type="button"
                onClick={this.onClickStartOrPause}
                className="timer-controller-button"
              >
                <img
                  className="timer-controller-icon"
                  src={startOrPauseImgUrl}
                  alt={startOrPauseAltText}
                />
                <p className="timer-controller-label">{startOrPauseText}</p>
              </button>
              <button
                type="button"
                onClick={this.onClickReset}
                className="timer-controller-button"
              >
                <img
                  alt="reset icon"
                  className="timer-controller-icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <p className="timer-controller-label">Reset</p>
              </button>
            </div>
            <div className="timer-limit-controller-section">
              <p className="limit-label">set timer limit</p>
              <div className="timer-limit-controller">
                <button
                  type="button"
                  onClick={this.onClickDecrease}
                  disabled={isButtonDisabled}
                  className="limit-controller-button"
                >
                  -
                </button>
                <div className="limit-label-and-value-container">
                  <p className="limit-value">{initialTimeLimit}</p>
                </div>

                <button
                  type="button"
                  onClick={this.onClickIncrease}
                  disabled={isButtonDisabled}
                  className="limit-controller-button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

import React, { useRef, useState, useEffect } from 'react'
import { longDateFormat } from '../dateFormat.js'
import { getPlatformImages } from '../getPlatformImages'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { loadGameDetails } from '../actions/detailsAction'
import { Link, useHistory } from 'react-router-dom'
import { smallImage } from '../util'

const Game = ({ name, released, image, id, platforms }) => {
  // Toggle scroll
  const history = useHistory()
  if (history.location.pathname === '/') {
    document.body.style.overflow = 'auto'
  } else if (history.location.pathname === `/game/${id}`) {
    document.body.style.overflow = 'hidden'
  }

  const dispatch = useDispatch()
  const gameDetailsHandler = () => {
    dispatch(loadGameDetails(id))
  }

  // State for countdown timer
  const [timerDays, setTimerDays] = useState('00')
  const [timerHours, setTimerHours] = useState('00')
  const [timerMinutes, setTimerMinutes] = useState('00')
  const [timerSeconds, setTimerSeconds] = useState('00')
  const [countdown, setCountdown] = useState(true)

  let interval = useRef()

  // Create this with redux https://stackoverflow.com/questions/48911033/creating-a-countdown-timer-with-redux
  const startTimer = () => {
    const countDownDate = new Date(released).getTime()

    interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(interval.current)
      } else {
        // Update timer
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
        setCountdown(false)
      }
    }, 1000)
  }

  useEffect(() => {
    startTimer()
  })

  return (
    <StyledGame onClick={gameDetailsHandler}>
      <Link to={`/game/${id}`}>
        <img className="game-image" src={smallImage(image, 1280)} alt={name} />
        <GameInfo>
          <Platform>
            {platforms.map((platform) => (
              <img
                src={getPlatformImages(platform.platform.name)}
                alt={platform.platform.name}
                key={platform.platform.id}
              />
            ))}
          </Platform>
          <h3 className="game-title">{name}</h3>
          <p>
            {!countdown
              ? `Releasing In: ${timerDays}d ${timerHours}h ${timerMinutes}m ${timerSeconds}s`
              : longDateFormat(released)}
          </p>
        </GameInfo>
      </Link>
    </StyledGame>
  )
}

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
  background: #fff;
  overflow: hidden;

  .game-image {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }

  p {
    font-weight: 500;
  }
`

const GameInfo = styled(motion.div)`
  margin: 1.5rem;

  .game-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Platform = styled(motion.div)`
  img {
    display: inline-block;
    margin-right: 0.5rem;
    width: 30px;
    height: 25px;
  }
`

export default Game

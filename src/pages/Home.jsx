import React, { useEffect } from 'react'
import GameDetails from '../components/GameDetails'
import Game from '../components/Game'
import { useDispatch, useSelector } from 'react-redux'
import { loadGames } from '../actions/gamesAction'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { fadeIn } from '../animations'

const Home = () => {
  let { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadGames())
  }, [dispatch])

  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games,
  )

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      {id && <GameDetails id={id} />}
      {searched.length ? (
        <div className="searched">
          <h2>Searched Games</h2>
          <Games>
            {searched.map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
                key={game.id}
                platforms={game.parent_platforms}
              />
            ))}
          </Games>
        </div>
      ) : (
        ''
      )}
      <h2>Upcoming Games</h2>
      <Games>
        {upcoming.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
            key={game.id}
            platforms={game.parent_platforms}
          />
        ))}
      </Games>
      <h2>Popular Games</h2>
      <Games>
        {popular.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
            key={game.id}
            platforms={game.parent_platforms}
          />
        ))}
      </Games>
      <h2>New Games</h2>
      <Games>
        {newGames.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
            key={game.id}
            platforms={game.parent_platforms}
          />
        ))}
      </Games>
    </GameList>
  )
}

const GameList = styled(motion.div)`
  padding: 5rem;

  h2 {
    padding: 5rem 0rem;
    color: #252525;
  }
`

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`

export default Home

import React from 'react'
import { getPlatformImages } from '../getPlatformImages'
import { longDateFormat } from '../dateFormat'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { popup } from '../animations'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { smallImage } from '../util'
import starEmpty from '../img/star-empty.png'
import starFull from '../img/star-full.png'

const GameDetails = () => {
  const history = useHistory()

  const exitDetailHandler = (e) => {
    const element = e.target

    // Go back to the Home page & make the home page scrollable
    if (element.classList.contains('shadow')) {
      document.body.style.overflow = 'auto'
      history.push('/')
    }
  }

  // Get Stars
  const getStars = () => {
    const stars = []
    const rating = Math.floor(game.rating)

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img src={starFull} alt="star" key={i}></img>)
      } else {
        stars.push(<img src={starEmpty} alt="star" key={i}></img>)
      }
    }

    return stars
  }

  const { screenshots, game, isLoading } = useSelector((state) => state.details)

  console.log(game)

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Details variants={popup} initial="hidden" animate="show">
            <Stats>
              <div className="rating">
                <h3>{game.name}</h3>
                <p>{game.rating ? `Rating: ${game.rating}` : 'No reviews'}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.parent_platforms.map((platform) => (
                    <img
                      key={platform.platform.id}
                      src={getPlatformImages(platform.platform.name)}
                      alt={platform.platform.name}
                    />
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <img
                src={smallImage(game.background_image, 1280)}
                alt={game.name}
              />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
              <div className="more-information">
                <div className="developers">
                  <h4>Developers</h4>
                  <div>
                    {game.developers.map((developer, index) => (
                      <p key={developer.id}>
                        {developer.name}
                        {index < game.developers.length - 1 ? ',\u00A0' : ''}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="rating">
                  <h4>Rating</h4>
                  <p>{game.esrb_rating.name}</p>
                </div>
                <div className="released">
                  <h4>Released</h4>
                  <p>{longDateFormat(game.released)}</p>
                </div>
                <div className="tags">
                  <h4>Tags</h4>
                  <div className="tags">
                    {game.tags.map((tag, index) => (
                      <p key={tag.id}>
                        {tag.name}
                        {index < game.tags.length - 1 ? ',\u00A0' : ''}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="website">
                  <h4>Website</h4>
                  <a href={game.website}>{game.website}</a>
                </div>
              </div>
            </Description>
            <Gallery>
              {screenshots.results.map((screenshot) => (
                <img
                  src={smallImage(screenshot.image, 1280)}
                  key={screenshot.id}
                  alt={screenshot.id}
                />
              ))}
            </Gallery>
          </Details>
        </CardShadow>
      )}
    </>
  )
}

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d74f4f;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`

const Details = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background-color: white;
  position: absolute;
  left: 10%;
  color: black;

  img {
    width: 100%;
  }
`

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`

const Info = styled(motion.div)`
  text-align: center;
`

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;

  img {
    margin-left: 3rem;
  }
`

const Media = styled(motion.div)`
  margin-top: 5rem;

  img {
    width: 100%;
  }
`

const Description = styled(motion.div)`
  margin: 5rem 0rem;

  .developers,
  .tags {
    p {
      display: inline-block;
    }
  }

  .more-information {
    margin: 2.5rem 0;

    .developers,
    .rating,
    .released,
    .tags,
    .website {
    }
  }

  h4 {
    color: #da7070;
    line-height: 2.5;
  }
`

const Gallery = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`

export default GameDetails

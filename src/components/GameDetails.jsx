import React, { useEffect } from 'react'
import { longDateFormat } from '../util'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { loadGameDetails } from '../actions/detailsAction'
import { useParams } from 'react-router-dom'
import { smallImage } from '../util'
import starEmpty from '../img/star-empty.png'
import starFull from '../img/star-full.png'

const GameDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

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

  // UseEffect
  useEffect(() => {
    if (id) {
      dispatch(loadGameDetails(id))
    }
  }, [dispatch, id])

  return (
    <>
      {!isLoading && (
        <Details>
          <Rating>
            <h1>{game.name}</h1>
            <div className="star-rating">
              <p>{game.rating ? `Rating: ${game.rating}` : 'No reviews'}</p>
              {getStars()}
            </div>
          </Rating>
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
                <p>{game.esrb_rating ? game.esrb_rating.name : ''}</p>
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
      )}
    </>
  )
}

const Details = styled(motion.div)`
  width: 100%;
  padding: 10rem 5rem;
  color: black;

  img {
    width: 100%;
  }
`

const Rating = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0rem;

  img {
    width: 2rem;
    height: 2rem;
    display: inline-block;
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

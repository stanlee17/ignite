import React, { useState } from 'react'
import { fetchSearch } from '../actions/gamesAction'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { fadeIn } from '../animations'
import logo from '../img/logo.svg'

const Nav = () => {
  const dispatch = useDispatch()
  const [textInput, setTextInput] = useState('')

  const searchGamesHandler = (e) => {
    setTextInput(e.target.value)
  }

  const submitSearch = (e) => {
    e.preventDefault()
    dispatch(fetchSearch(textInput))
    setTextInput('')
  }

  const clearSearched = () => {
    dispatch({ type: 'CLEAR_SEARCHED' })
  }

  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
      </Logo>
      <form className="search" onSubmit={submitSearch}>
        <input
          placeholder="Search games..."
          value={textInput}
          onChange={searchGamesHandler}
          type="text"
        />
      </form>
    </StyledNav>
  )
}

const StyledNav = styled(motion.nav)`
  display: flex;
  padding: 2rem 5rem;
  text-align: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;

  input {
    width: 500px;
    font-size: 1.2rem;
    font-weight: 400;
    padding: 0.7rem 1rem;
    border: 1px solid #e2e2e2;
    outline: none;
    border-radius: 5px;
  }
`

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  font-size: 1.2rem;
  color: #333;

  img {
    height: 3rem;
    width: 3rem;
  }
`

export default Nav

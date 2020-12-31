import playstation from './img/playstation.svg'
import steam from './img/steam.svg'
import xbox from './img/xbox.svg'
import nintendo from './img/nintendo.svg'
import apple from './img/apple.svg'
import gamepad from './img/gamepad.svg'

export const smallImage = (imagePath, size) => {
  if (imagePath) {
    const image = imagePath.match(/media\/screenshots/)
      ? imagePath.replace(
          'media/screenshots',
          `media/resize/${size}/-/screenshots`,
        )
      : imagePath.replace('/media/games/', `/media/resize/${size}/-/games/`)

    return image
  }
  return imagePath
}

export const longDateFormat = (dateString) => {
  const date = new Date(dateString + 'T00:00:00')

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleString('en-US', options)
}

export const getPlatformImages = (platform) => {
  switch (platform) {
    case 'PlayStation':
      return playstation
    case 'PC':
      return steam
    case 'Xbox':
      return xbox
    case 'Nintendo':
      return nintendo
    case 'iOS':
      return apple
    default:
      return gamepad
  }
}

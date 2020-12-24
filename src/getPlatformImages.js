import playstation from './img/playstation.svg'
import steam from './img/steam.svg'
import xbox from './img/xbox.svg'
import nintendo from './img/nintendo.svg'
import apple from './img/apple.svg'
import gamepad from './img/gamepad.svg'

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

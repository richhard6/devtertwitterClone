import css from 'styled-jsx/css'

import { breakpoints, colors, fonts } from '../../styles/theme'
import { addOpacityToColor } from '../../styles/utils'

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }
  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    justify-content: space-between;
  }
  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`

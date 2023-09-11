import styled from 'styled-components'

export const HomeBanner = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
`
export const BelowHeaderContainer = styled.div`
  display: flex;
  background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#181818')};
`

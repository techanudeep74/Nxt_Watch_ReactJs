import styled from 'styled-components'

export const HeaderMain = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const WebsiteLogo = styled.img`
  height: 40px;
  margin: 10px;
`

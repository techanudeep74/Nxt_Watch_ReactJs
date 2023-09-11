import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const ListContainer = styled.ul`
  list-style: none;
`

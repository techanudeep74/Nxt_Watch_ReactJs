import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.lightTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const ActiveButton = styled.button`
  color: ${props => (props.value ? '#2563eb' : '#64748b')};
  border: 0px solid transparent;
  background-color: transparent;
`
export const SaveButton = styled.button`
  background-color: transparent;
  color: '#64748b';
  border: 0px solid transparent;
`
export const SavedButton = styled.button`
  background-color: transparent;
  color: '#2563eb';
  border: 0px solid transparent;
`

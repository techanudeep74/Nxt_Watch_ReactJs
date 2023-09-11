import React from 'react'

const AppContext = React.createContext({
  lightTheme: true,
  changeTheme: () => {},
  savedList: [],
  updateSavedList: () => {},
  removeVideo: () => {},
})

export default AppContext

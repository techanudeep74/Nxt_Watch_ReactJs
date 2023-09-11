import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AppContext from './Context/AppContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetails from './components/VideoDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {savedList: [], lightTheme: true}

  changeTheme = () => {
    this.setState(prevState => ({
      lightTheme: !prevState.lightTheme,
    }))
  }

  updateSavedList = video => {
    this.setState(prevState => ({
      savedList: [...prevState.savedList, video],
    }))
  }

  removeVideo = video => {
    this.setState(prevState => ({
      savedList: prevState.savedList.filter(each => each.id !== video.id),
    }))
  }

  render() {
    const {savedList, lightTheme} = this.state
    return (
      <AppContext.Provider
        value={{
          savedList,
          lightTheme,
          changeTheme: this.changeTheme,
          updateSavedList: this.updateSavedList,
          removeVideo: this.removeVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App

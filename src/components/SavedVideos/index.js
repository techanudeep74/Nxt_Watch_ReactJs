import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedVideosList from '../SavedVideosList'
import AppContext from '../../Context/AppContext'
import {MainContainer, ListContainer} from './StyledComponents'

const SavedVideos = () => (
  <div>
    <Header />
    <div className="below-header-container">
      <Sidebar />
      <AppContext.Consumer>
        {value => {
          const {savedList, lightTheme} = value
          return (
            <MainContainer lightTheme={lightTheme} data-testid="savedVideos">
              {savedList.length > 0 ? (
                <ListContainer>
                  <h1>Saved Videos</h1>
                  {savedList.map(each => (
                    <SavedVideosList homeVideoList={each} key={each.id} />
                  ))}
                </ListContainer>
              ) : (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <h1>No Saved Videos found</h1>
                  <p>You can save your videos while watching them</p>
                </div>
              )}
            </MainContainer>
          )
        }}
      </AppContext.Consumer>
    </div>
  </div>
)
export default SavedVideos

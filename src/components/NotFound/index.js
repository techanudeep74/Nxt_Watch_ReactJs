import {Link} from 'react-router-dom'
import AppContext from '../../Context/AppContext'

const NotFound = () => (
  <AppContext.Consumer>
    {value => {
      const {lightTheme} = value
      const imageUrlNotFound = lightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <div className="not-found-container">
          <img src={imageUrlNotFound} alt="not found" className="not found" />
          <h1 className="not-found-heading">Page Not Found</h1>
          <p className="not-found-para">
            We are sorry, the page you requested could not be found. Please go
            back to homepage.
          </p>
          <Link to="/">
            <button type="button" className="home-btn">
              Go Back to Home
            </button>
          </Link>
        </div>
      )
    }}
  </AppContext.Consumer>
)

export default NotFound

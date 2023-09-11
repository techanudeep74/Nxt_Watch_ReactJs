import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {BiSun} from 'react-icons/bi'
import Popup from 'reactjs-popup'
import AppContext from '../../Context/AppContext'
import {HeaderMain, WebsiteLogo} from './StyledComponents'

import 'reactjs-popup/dist/index.css'
import './index.css'

class Header extends Component {
  executeLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {lightTheme, changeTheme} = value
          const onChangeTheme = () => {
            changeTheme()
          }
          const webLogo = lightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          const buttonIcon = lightTheme ? (
            <FaMoon size={24} />
          ) : (
            <BiSun size={24} color="#ffffff" />
          )
          return (
            <HeaderMain lightTheme={lightTheme}>
              <Link to="/">
                <WebsiteLogo src={webLogo} alt="website logo" />
              </Link>
              <div className="nav-buttons">
                <button
                  className="nav-button"
                  data-testid="theme"
                  type="button"
                  onClick={onChangeTheme}
                >
                  {buttonIcon}
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-img"
                />
                <div className="popup-container">
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="logout-button-large">
                        Logout
                      </button>
                    }
                  >
                    {close => (
                      <>
                        <div>
                          <p>Are you sure, you want to logout?</p>
                        </div>
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="logout-button-large"
                          onClick={this.executeLogout}
                        >
                          Confirm
                        </button>
                      </>
                    )}
                  </Popup>
                </div>
              </div>
            </HeaderMain>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default withRouter(Header)

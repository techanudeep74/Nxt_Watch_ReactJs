import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import AppContext from '../../Context/AppContext'
import {HomeBanner, BelowHeaderContainer} from './StyledComponents'
import Header from '../Header'
import Sidebar from '../Sidebar'
import HomeVideoList from '../HomeVideoList'

const callStatusCodes = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiCallStatus: callStatusCodes.loading,
    videosListHome: {},
    searchInputVal: '',
    showBanner: true,
  }

  componentDidMount() {
    this.getData()
  }

  onSearchInput = e => {
    this.setState({searchInputVal: e.target.value})
  }

  bannerStatus = () => {
    this.setState(prev => ({showBanner: !prev.showBanner}))
  }

  onTryAgain = () => {
    this.getData()
  }

  getData = async () => {
    const {searchInputVal} = this.state
    this.setState({apiCallStatus: callStatusCodes.loading})
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInputVal}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiCall = await fetch(apiUrl, options)
    if (apiCall.ok === true) {
      const response = await apiCall.json()
      const updatedData = response.videos.map(each => ({
        id: each.id,
        thumbnail: each.thumbnail_url,
        title: each.title,
        ChannelName: each.channel.name,
        channelImage: each.channel.profile_image_url,
        views: each.view_count,
        published: each.published_at,
      }))
      this.setState({
        videosListHome: updatedData,
        apiCallStatus: callStatusCodes.success,
      })
    } else {
      this.setState({apiCallStatus: callStatusCodes.failure})
    }
  }

  renderVideoList = () => {
    const {videosListHome} = this.state
    return (
      <div>
        {videosListHome.length === 0 ? (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              alt="no videos"
            />
            <h1>No Search results Found</h1>
            <p>Try different key words or remove search filter</p>
            <button
              className="find-btn"
              type="button"
              onClick={this.onTryAgain}
            >
              Retry
            </button>
          </div>
        ) : (
          <ul>
            {videosListHome.map(each => (
              <HomeVideoList homeVideoList={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button className="find-btn" type="button" onClick={this.onTryAgain}>
        Retry
      </button>
    </div>
  )

  renderPortView = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case callStatusCodes.success:
        return this.renderVideoList()
      case callStatusCodes.failure:
        return this.renderFailView()
      case callStatusCodes.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {lightTheme} = value
          const {showBanner, searchInputVal} = this.state
          return (
            <div>
              <Header />
              <BelowHeaderContainer
                lightTheme={lightTheme}
                data-testid="home"
                className="below-header-container"
              >
                <Sidebar />
                <div>
                  {showBanner ? (
                    <HomeBanner data-testid="banner">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                      />
                      <button
                        type="button"
                        data-testid="close"
                        onClick={this.bannerStatus}
                      >
                        <AiOutlineClose />
                      </button>
                      <p>Buy Nxt Watch Premium plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </HomeBanner>
                  ) : null}
                  <div>
                    <input
                      type="search"
                      placeholder="Search"
                      value={searchInputVal}
                      onChange={this.onSearchInput}
                    />
                    <button
                      type="button"
                      onClick={this.onTryAgain}
                      data-testid="searchButton"
                    >
                      <FaSearch />
                    </button>
                  </div>
                  {this.renderPortView()}
                </div>
              </BelowHeaderContainer>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default Home

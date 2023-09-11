import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import AppContext from '../../Context/AppContext'

import Header from '../Header'
import Sidebar from '../Sidebar'
import {
  MainContainer,
  ActiveButton,
  SavedButton,
  SaveButton,
} from './StyledComponents'

const callStatusCodes = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetails extends Component {
  state = {
    apiCallStatus: callStatusCodes.loading,
    videosListHome: {},
    isPlaying: false,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getData()
  }

  onTryAgain = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiCallStatus: callStatusCodes.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      const updatedData = {
        id: response.video_details.id,
        title: response.video_details.title,
        videoUrl: response.video_details.video_url,
        thumbnail: response.video_details.thumbnail_url,
        channelName: response.video_details.channel.name,
        channelProfileImg: response.video_details.channel.profile_image_url,
        subscriberCount: response.video_details.channel.subscriber_count,
        viewCount: response.video_details.view_count,
        publishedAt: response.video_details.published_at,
        description: response.video_details.description,
      }
      this.setState({
        videosListHome: updatedData,
        apiCallStatus: callStatusCodes.success,
      })
    } else {
      this.setState({apiCallStatus: callStatusCodes.failure})
    }
  }

  onClickPlay = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  changeActiveLike = () => {
    this.setState({
      isLiked: true,
      isDisliked: false,
    })
  }

  changeActiveDislike = () => {
    this.setState({
      isDisliked: true,
      isLiked: false,
    })
  }

  renderVideoList = () => (
    <AppContext.Consumer>
      {value => {
        const {updateSavedList, removeVideo, savedList, lightTheme} = value
        const {videosListHome, isPlaying, isLiked, isDisliked} = this.state
        const {
          title,
          videoUrl,
          channelName,
          channelProfileImg,
          subscriberCount,
          viewCount,
          publishedAt,
          description,
        } = videosListHome
        const isExisting = savedList.find(each => each.id === videosListHome.id)
        const addVideo = () => {
          updateSavedList({...videosListHome})
        }

        const onRemove = () => {
          removeVideo(videosListHome)
        }
        return (
          <MainContainer data-testid="videoItemDetails" lightTheme={lightTheme}>
            <div className="video-container">
              <h1 className="heading">Video Player</h1>
              <div className="responsive-container">
                <ReactPlayer url={videoUrl} playing={isPlaying} />
                <img src={channelProfileImg} alt="channel logo" />
                <p>{title}</p>
                <p>{viewCount}</p>
                <p>{publishedAt}</p>
                <p>{channelName}</p>
                <p>{subscriberCount}</p>
                <p>{description}</p>
                <ActiveButton
                  type="button"
                  onClick={this.changeActiveLike}
                  value={isLiked}
                >
                  Like
                </ActiveButton>
                <ActiveButton
                  type="button"
                  onClick={this.changeActiveDislike}
                  value={isDisliked}
                >
                  Dislike
                </ActiveButton>
                {isExisting ? (
                  <SavedButton type="button" onClick={onRemove}>
                    Saved
                  </SavedButton>
                ) : (
                  <SaveButton type="button" onClick={addVideo}>
                    Save
                  </SaveButton>
                )}
              </div>
            </div>
          </MainContainer>
        )
      }}
    </AppContext.Consumer>
  )

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
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
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
      <>
        <Header />
        <div className="below-header-container">
          <Sidebar />
          <div>{this.renderPortView()}</div>
        </div>
      </>
    )
  }
}
export default VideoDetails

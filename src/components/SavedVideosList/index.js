import {Link} from 'react-router-dom'
// import {formatDistanceToNow} from 'date-fns'

const SavedVideosList = props => {
  const {homeVideoList} = props
  const {id, thumbnail, title, ChannelName, published, views} = homeVideoList

  return (
    <li>
      <Link to={`/videos/${id}`}>
        <div>
          <img src={thumbnail} alt="video thumbnail" />
          <div>
            <p>{title}</p>
            <p>{ChannelName}</p>
            <div>
              <p>{views}</p>
              <p>{published}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default SavedVideosList

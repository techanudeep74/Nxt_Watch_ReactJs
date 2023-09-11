import {Link} from 'react-router-dom'
// import {formatDistanceToNow} from 'date-fns'

const HomeVideoList = props => {
  const {homeVideoList} = props
  const {
    id,
    thumbnail,
    title,
    ChannelName,
    channelImage,
    published,
    views,
  } = homeVideoList
  /*   const displayTime = formatDistanceToNow(new Date(published), {
    addSuffix: true,
  })
  const removeUselessWords = txt => {
    const uselessWordsArray = ['almost', 'about', 'over']

    const expStr = uselessWordsArray.join('\\b|\\b')
    return txt.replace(new RegExp(expStr, 'gi'), '').trim().replace(/ +/g, ' ')
  }
  const actualTime = removeUselessWords(displayTime) */

  return (
    <li>
      <Link to={`/videos/${id}`}>
        <div>
          <img src={thumbnail} alt="video thumbnail" />
          <div>
            <img src={channelImage} alt="channel logo" />
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
export default HomeVideoList

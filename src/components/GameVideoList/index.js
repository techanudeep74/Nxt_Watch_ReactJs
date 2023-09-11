import {Link} from 'react-router-dom'
// import {formatDistanceToNow} from 'date-fns'

const GameVideoList = props => {
  const {homeVideoList} = props
  const {id, thumbnail, title, views} = homeVideoList
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
            <p>{title}</p>
            <div>
              <p>{views}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default GameVideoList

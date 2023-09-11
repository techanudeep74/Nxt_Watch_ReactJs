import {Link, withRouter} from 'react-router-dom'
import {FaHome, FaFire, FaGamepad} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'
import AppContext from '../../Context/AppContext'

const Sidebar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">
          <FaHome /> Home
        </Link>
      </li>
      <li>
        <Link to="/trending">
          <FaFire /> Trending
        </Link>
      </li>
      <li>
        <Link to="/gaming">
          <FaGamepad /> Gaming
        </Link>
      </li>
      <li>
        <Link to="/saved-videos">
          <MdPlaylistAdd /> Saved Videos
        </Link>
      </li>
    </ul>
    <p>CONTACT US</p>
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
        alt="facebook logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
        alt="twitter logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
        alt="linked in logo"
      />
    </div>
    <p>Enjoy! Now to see your channels and recommendations!</p>
  </nav>
)

export default withRouter(Sidebar)

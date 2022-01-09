import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const removeJwtToken = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  return (
    <div className="header-bg-container">
      <Link to="/" className="header-link-style">
        Home
      </Link>

      <button className="button-style" type="button" onClick={removeJwtToken}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)

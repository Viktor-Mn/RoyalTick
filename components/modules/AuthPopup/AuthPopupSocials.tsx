import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faGoogle,
  faXTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'

const AuthPopupSocials = ({
  handleSignupWithOAuth,
}: {
  handleSignupWithOAuth: () => void
}) => (
  <div className='cart-body__socials'>
    {/* GitHub */}
    <button
      className='btn-reset socials__btn gh-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faGithub} className='fa-flip' />
    </button>

    {/* Google */}
    <button
      className='btn-reset socials__btn g-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faGoogle} shake />
    </button>

    {/* Twitter (X) */}
    <button
      className='btn-reset socials__btn x-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faXTwitter} bounce />
    </button>

    {/* Facebook */}
    <button
      className='btn-reset socials__btn fb-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faFacebook} beat />
    </button>
  </div>
)

export default AuthPopupSocials

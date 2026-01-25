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
  // Тепер приймаємо назву провайдера як рядок
  handleSignupWithOAuth: (provider: string) => Promise<void>
}) => (
  <div className='cart-body__socials'>
    <button
      className='btn-reset socials__btn gh-color'
      onClick={() => handleSignupWithOAuth('github')}
    >
      <FontAwesomeIcon icon={faGithub} />
    </button>

    <button
      className='btn-reset socials__btn g-color'
      onClick={() => handleSignupWithOAuth('google')}
    >
      <FontAwesomeIcon icon={faGoogle} />
    </button>

    <button
      className='btn-reset socials__btn x-color'
      onClick={() => handleSignupWithOAuth('twitter')}
    >
      <FontAwesomeIcon icon={faXTwitter} />
    </button>

    <button
      className='btn-reset socials__btn fb-color'
      onClick={() => handleSignupWithOAuth('facebook')}
    >
      <FontAwesomeIcon icon={faFacebook} />
    </button>
  </div>
)

export default AuthPopupSocials

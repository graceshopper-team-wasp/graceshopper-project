import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

export default function SocialFollow() {
  return (
    <div className="social-container">
      <p>Follow us on social media</p>
      <a
        href="https://www.youtube.com/watch?v=PrJrq4-Jn4Y"
        target="_blank"
        rel="noopener noreferrer"
        className="youtube social"
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a
        href="https://www.facebook.com/PolarSeltzer"
        target="_blank"
        rel="noopener noreferrer"
        className="facebook social"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a
        href="https://www.twitter.com/lacroixwater"
        target="_blank"
        rel="noopener noreferrer"
        className="twitter social"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a
        href="https://www.instagram.com/schweppes/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram social"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  )
}

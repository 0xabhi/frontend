import React from 'react';
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import logoUrl from '../../public/images/cjl-logo-night.png'

const LogoButton = ({...props}) => {
  return (
    <Link to='/'>
      <Image className='logo' height='35' src={logoUrl} inline />
    </Link>
  )
}

export default LogoButton;

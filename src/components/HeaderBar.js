import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Divider } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import LogoButton from './LogoButton'

const ContainerStyled = styled(Container)`
  {
    padding-top: 1vw;
    padding-bottom: 4vw;
  }
`

const ButtonStyled = styled(Button)`
  &&& {
    @media (max-width: 750px) {
      display: none;
    }
  }
`

@inject('AuthStore')
class Header extends React.Component {
  render() {
    return (
      <ContainerStyled text>
        <LogoButton />
        {<ButtonStyled as={Link} to='/submit' content='Post a Job' floated='right' color='green' />}
      </ContainerStyled>
    )
  }
}

export default Header

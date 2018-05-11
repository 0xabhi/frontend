import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Divider } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'

import LogoButton from './LogoButton'

const style = {
  paddingTop: '1em',
  paddingBottom: '4em'
}

@inject('AuthStore')
class Header extends React.Component {
  render() {
    return (
      <Container text style={style}>
        {/*<Button as={Link} to='/submit' content='Post a Job' floated='right' color='green' />*/}
        <LogoButton />
      </Container>
    )
  }
}

export default Header

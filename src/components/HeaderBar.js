import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Divider } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'

import LogoButton from './LogoButton'

const style = {
  paddingTop: '1em'
}

@inject('routingStore')
class Header extends React.Component {
  render() {
    console.log(this.props.routingStore.location)
    return (
      <Container text style={style}>
        {/*<Button as={Link} to='/submit' content='Post a Job' floated='right' color='green' />*/}
        <LogoButton />
        <Divider horizontal />
      </Container>
    )
  }
}

export default Header

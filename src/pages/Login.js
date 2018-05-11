import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Container, Header, Divider, Card, Image, Button, Icon } from 'semantic-ui-react'


@inject('AuthStore')
@observer
class Login extends React.Component {
  render() {
    const { signin, signout, loading } = this.props.AuthStore
    const { user } = this.props.AuthStore
    log('user', user)
    if (user) {
      return (
        <Container text>
          <Header as='h1'>👋 You are signed in now!</Header>
          <Card>
            <Image src={user.photoURL} circular/>
            <Card.Content>
              <Card.Header>{user.displayName}</Card.Header>
            </Card.Content>
          </Card>
        </Container>
      )
    } else {
      return (
        <Container text>
          <Header as='h1'>Let's get you started 😸</Header>
          <Button color='black' size='massive' onClick={signin} loading={loading}>
            <Icon name='github' /> Sign in with <b>GitHub</b>
          </Button>
        </Container>
      )
    }
  }
}

export default Login;

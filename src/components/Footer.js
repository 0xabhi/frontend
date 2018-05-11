import './Footer.styl'

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Container, Grid, Segment, Divider, List } from 'semantic-ui-react'


@inject('AuthStore')
@observer
class Footer extends React.Component {
  render() {
    const { user, signout, signin } = this.props.AuthStore
    return (
      <Container className='Footer' text textAlign='center'>
        <List horizontal divided link>
          <List.Item as={Link} to='/'>Home</List.Item>
          { user ?
            [ <List.Item as={Link} to='/login' content='Profile'/>,
              <List.Item onClick={signout} content='Sign out'/> ]
            : <List.Item onClick={signin}>GitHub Sign in</List.Item>
          }
          <List.Item>Crypto Jobs List &copy; {(new Date()).getFullYear()}</List.Item>
        </List>
      </Container>
    )
    return (
      <Grid className='Footer' columns='equal' divided inverted padded>
        <Grid.Row color='black' textAlign='center'>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Segment color='black' inverted></Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color='black' inverted></Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Footer;

import './Footer.styl';

import React from 'react';
import { Container, Grid, Segment, Divider } from 'semantic-ui-react'

class Footer extends React.Component {
  render() {
    return (
      <Container className='Footer' text>
        <p color="text grey">Crypto Jobs List &copy; {(new Date()).getFullYear()}</p>
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

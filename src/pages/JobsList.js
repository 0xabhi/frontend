import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon, Select, Checkbox } from 'semantic-ui-react'


@inject('JobStore')
@observer
class JobsList extends React.Component {
  render() {
    return <Container text className='JobsList'>
      <Helmet>
        <title>Crypto Jobs List</title>
      </Helmet>
      <Header as='h1'>Find your next Job<br/>in the Blockchain Industry.</Header>
      <p>
        #1 crypto community to find and post blockchain jobs! 😉<br/>
        Note: that listings need to be <strong>crypto</strong> related and can only fill a single position at a time.
      </p>
      <Divider horizontal />
    </Container>
  }
}

export default JobsList;

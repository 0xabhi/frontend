import "./PostAJob.styl";

import React from 'react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Form, Button, Segment } from 'semantic-ui-react'
import logoUrl from '../../public/images/email-header.png'

class PostAJob extends React.Component {
  constructor(props){
    super(props);
    document.title = 'Post a job - Crypto Jobs List';
  }

  render() {
    return (
      <Container className="PostAJob" text>
        <Divider horizontal />
        <Image className='logo' height='90' src={'/dist'+logoUrl} centered />
        <Header as='h1'>Post a job <Label content="FREE" color='green' size='mini' /></Header>

        <Form size='large' widths='equal'>
          <Divider horizontal />
          <Header as='h3' content=' 🏢 Company Details' />
          <Grid columns={2}>
            <Grid.Column>
              <Form.Input label='Company Name' placeholder='Keep it short: e.g. CryptoCoin' />
              <Form.Input label='Web Site' placeholder='https://yoursite.com' />
              <Form.Input label='Twitter' placeholder='@twitterHandle' />
            </Grid.Column>
            <Grid.Column>
              <Form.Input label='Logo' type='file' />
            </Grid.Column>
          </Grid>

          <Divider horizontal />
          <Header as='h3' content='💼 Job Details' />
          <Form.Input label='Title' placeholder='e.g. Senior Engineer' />
          <Form.Group>
            <Form.Input label='Location' placeholder='e.g. Singapore, New York, Remote' />
            <Form.Input label='Salary range' placeholder='90-100k, 1% Equity' />
          </Form.Group>
          <Form.TextArea label='Description' placeholder='300 words minimum, please…' />

          <Divider horizontal />
          <Header as='h3' content=" 💁 Let's get personal!" />
          <Form.Group>
            <Form.Input label="Boss' Name" placeholder='e.g. Vitalik Buterin' />
            <Form.Input label='Profile Picture' type='file' />
          </Form.Group>
          <Form.Input label='Send applications to:' placeholder='your@email.com' type='email' />
          <Divider horizontal />

          <Grid columns='equal' className='free-or-paid'>
            <Grid.Column>
              <Segment textAlign='center' color='green' padded='very'>
                <b>Free</b>
              </Segment>
            </Grid.Column>
            <Grid.Column width='1'>
              <Divider vertical>Or</Divider>
            </Grid.Column>
            <Grid.Column>
              <Segment textAlign='center' color='blue' padded='very'>
                <b>Featured</b>
              </Segment>
            </Grid.Column>
          </Grid>

          <Divider horizontal />

          <Segment textAlign='center' secondary padded='very'>
            <Form.Button content='Post your job' size='huge' primary />
          </Segment>
        </Form>

      </Container>
    );
  }
}

export default PostAJob;

import "./PostAJob.styl";

import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Form, Message, Button, Segment } from 'semantic-ui-react'
let logoUrl = require('../../public/images/email-header.png')
logoUrl = '/dist'+ logoUrl;

// @observer
class PostAJob extends React.Component {
  // @observable title = ''

  constructor(props){
    super(props);
    document.title = 'Post a job - Crypto Jobs List';
    this.state = {
      loading: false,
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    setTimeout(()=>{
      window.prerenderReady = true;
    }, 2000)
  }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit () {
    this.setState({loading: true})
    fetch('https://cryptojobslist.com/job', {
      method: 'POST',
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({loading: false, error: false})
    })
    .catch(err => {
      this.setState({loading: false, error: true})
    })
  }

  render() {
    const {loading, error} = this.state
    const formState = {loading, error}
    return (
      <Container className="PostAJob" text>
        <Divider horizontal />
        <Divider horizontal />
        <Image className='logo' height='90' src={logoUrl} centered />
        <Divider horizontal />
        <center>The only board to find and post blockchain and crypto jobs! 😉</center>
        <Header as='h1'>Post a job <Label content="FREE" color='green' size='mini' /></Header>

        <Form size='large' widths='equal' onSubmit={this.handleSubmit} {...formState}>
          <Divider horizontal />
          <Header as='h3' content=' 🏢 Company Details' />
          <Grid columns={2}>
            <Grid.Column>
              <Form.Input name='companyName' label='Company Name' placeholder='Keep it short: e.g. CryptoCoin' onChange={this.handleChange} />
              <Form.Input name='companyUrl' label='Web Site' placeholder='https://yoursite.com' onChange={this.handleChange} />
              <Form.Input name='companyTwitter' label='Twitter' placeholder='@twitterHandle' onChange={this.handleChange} />
            </Grid.Column>
            <Grid.Column>
              <Form.Input name='companyLogo' label='Logo' type='file' onChange={this.handleChange} />
            </Grid.Column>
          </Grid>

          <Divider horizontal />
          <Header as='h3' content='💼 Job Details' />
          <Form.Input name='jobTitle' label='Title' placeholder='e.g. Senior Engineer' onChange={this.handleChange} />
          <Form.Group>
            <Form.Input name='jobLocation' label='Location' placeholder='e.g. Singapore, New York, Remote' onChange={this.handleChange} />
            <Form.Input name='salaryRange' label='Salary range' placeholder='90-100k, 1% Equity' onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea name='jobDescription' label='Description' placeholder='300 words minimum, please…' onChange={this.handleChange} />

          <Divider horizontal />
          <Header as='h3' content=" 💁 Let's get personal!" />
          <Form.Group>
            <Form.Input name='bossName' label="Boss' Name" placeholder='e.g. Vitalik Buterin' onChange={this.handleChange} />
            <Form.Input name='bossPicture' label='Profile Picture' type='file' onChange={this.handleChange} />
          </Form.Group>
          <Form.Input name='companyEmail' label='Send applications to:' placeholder='your@email.com' type='email' onChange={this.handleChange} validations="isEmail" />
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
          <Message error header='Something went wrong' content='Please check all fields and ensure they are filled!' />

          <Segment textAlign='center' secondary padded='very'>
            <Form.Button content='Post your job' size='huge' primary />
          </Segment>
        </Form>

      </Container>
    );
  }
}

export default PostAJob;

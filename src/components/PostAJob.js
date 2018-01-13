import './PostAJob.styl';

import _ from 'lodash';
import { get as CONFIG } from 'react-global-configuration';
import React from 'react';
import { post } from 'axios';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'
import logoUrl from '../../public/images/email-header.png'

const API = CONFIG('apiDomain')
const errorLabel = <Label color="red" pointing/>

// @observer
class PostAJob extends React.Component {
  // @observable title = ''

  constructor(props){
    super(props);
    document.title = 'Post a job - Crypto Jobs List';
    this.state = {
      loading: false,
      error: false,
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.imgUpload = this.imgUpload.bind(this)
  }

  componentDidMount () {
    setTimeout(()=>{
      window.prerenderReady = true;
    }, 2000)
  }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value })
  }

  imgUpload (e) {
    const self = this
    const file = e.target.files[0]
    const name = e.target.name
    const formData = new FormData()
    formData.append('file', file)
    const config = { headers: { 'content-type': 'multipart/form-data' }};
    return post(`${API}/job/imgUpload`, formData, config).then(res => {
      this.setState({[name]: res.data.secure_url})
    })
  }

  handleSubmit () {
    this.setState({loading: true})
    const data = _.omit(this.state, ['submitted', 'loading', 'error'])
    post(`${API}/job`, data)
    .then(res => {
      this.setState({loading: false, error: false, submitted: true})
    })
    .catch(err => {
      this.setState({loading: false, error: true})
    })
  }

  render() {
    const {loading, error, companyLogo, bossPicture} = this.state
    const formState = {loading, error}
    return (
      <Container className="PostAJob" text>
        <Divider horizontal />
        <Divider horizontal />
        <Image className='logo' height='90' src={logoUrl} centered />
        <Divider horizontal />
        <center>The only board to find and post blockchain and crypto jobs! 😉</center>
        <Divider horizontal />

        {this.state.submitted ?
          <div>
            <Header as='h1' textAlign='center'>Please check your email!</Header>
            <Header as='h3' textAlign='center'>Your job ad was submitted for review.</Header>
            <Divider horizontal />
            <Divider horizontal />
            <Image src="https://reactiongifs.me/wp-content/uploads/2013/10/i-wingman-successfully-leonardo-dicaprio.gif" centered rounded size='massive' />
          </div>
        :
        <Form size='large' widths='equal' onSubmit={this.handleSubmit} {...formState}>
          <Header as='h1'>Post a job <Label content="FREE" color='green' size='mini' /></Header>
          <Divider horizontal />
          <Header as='h3' content='💼 Job Details' />
          <Form.Input name='jobTitle' label='Title' placeholder='e.g. Super Senior Engineer' validations="minLength:3" required onChange={this.handleChange} />
          <Form.Group>
            <Form.Input name='jobLocation' label='Location' placeholder='e.g. Singapore, New York, Remote' validations="minLength:3" required onChange={this.handleChange} />
            <Form.Input name='salaryRange' label='Salary range' placeholder='90-100k, 2% Equity' validations="minLength:3" required onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea
            name='jobDescription' label='Description' placeholder='300 words minimum, please… And make it exciting!' rows='10'
            validations="minLength:300"
            validationErrors={{ minLength: '300 words, please…' }}
            required
            errorLabel={ errorLabel }
            onChange={this.handleChange} />

          <Divider horizontal />

          <Header as='h3' content=' 🏢 Your Company Details?' />
          <Grid columns={2}>
            <Grid.Column>
              <Form.Input name='companyName' label='Company Name' placeholder='Keep it short: e.g. CryptoCoin' validations="minLength:2" required onChange={this.handleChange} />
              <Form.Input name='companyUrl' label='Web Site' placeholder='https://yoursite.com' validations="isUrl" required onChange={this.handleChange} />
              <Form.Input name='companyTwitter' label='Twitter' placeholder='@twitterHandle' validations="minLength:3" required onChange={this.handleChange} />
            </Grid.Column>
            <Grid.Column>
              <Image title='Company Logo' src={companyLogo || 'https://react.semantic-ui.com/assets/images/wireframe/white-image.png'} size='medium' rounded bordered onClick={e => {this.refs.companyLogo.click() }} />
              <input ref='companyLogo' name='companyLogo' label='Logo' type='file' className='hide' onChange={this.imgUpload} />
              <div className='field'>
                <label>Lovely 🎨 Logo</label>
              </div>
            </Grid.Column>
          </Grid>


          <Divider horizontal />
          <Header as='h3' content=" 💁 Let's get personal!" />
          <Form.Input name='bossName' label="Your or your Boss' Name" placeholder='e.g. Vitalik Buterin' validations="minLength:3" required onChange={this.handleChange} />

          <div className='field'>
            <label>Lovely 🤓 Photo:</label>
          </div>
          <Image
            title="Boss' Picture"
            src={bossPicture || 'https://react.semantic-ui.com/assets/images/wireframe/white-image.png'}
            circular bordered size='small'
            onClick={e => {this.refs.bossPicture.click() }}/>
          <input ref='bossPicture' name='bossPicture' label='Profile Picture' type='file' className='hide' onChange={this.imgUpload} />
          <Divider horizontal />

          <Form.Input name='companyEmail' label='Send applications to:' placeholder='your@email.com' type='email'
            validations="isEmail"
            validationErrors={{ isEmail: 'Email is not valid' }}
            required
            errorLabel={ errorLabel } onChange={this.handleChange} validations="isEmail" />
          <Divider horizontal />

          <Grid columns='equal' className='free-or-paid hide'>
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
        }

      </Container>
    );
  }
}

export default PostAJob;

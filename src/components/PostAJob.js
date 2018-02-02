import './PostAJob.styl';

import _ from 'lodash';
import { get as ENV } from 'react-global-configuration';
import React from 'react';
import { post } from 'axios';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'
import PostButton from './PostButton';
import logoUrl from '../../public/images/email-header.png'

const API = ENV('apiDomain')
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
      submitted: false,
      supportMethod: 2
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.imgUpload = this.imgUpload.bind(this)
    this.updateSupportMethod = this.updateSupportMethod.bind(this)
  }

  componentDidMount () { }

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

  updateSupportMethod (supportMethod) {
    this.setState({supportMethod})
  }

  handleStripeToken (token) {
    console.log({token})
    this.setState({customerToken: token})
    this.handleSubmit()
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
    const {loading, error, companyLogo, bossPicture, supportMethod} = this.state
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
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>Post a job <Label content="FREE" color='green' size='mini' /></Header>
          <Divider horizontal />
          <Header as='h3' content='💼 Job Details' />
          <Form.Input name='jobTitle' label='Title' placeholder='e.g. Super Senior Engineer' validations="minLength:3" required onChange={this.handleChange} />
          <Form.Group>
            <Form.Input name='jobLocation' label='Location' placeholder='e.g. New York, Remote, Singapore…' validations="minLength:3" required onChange={this.handleChange} />
            <Form.Input name='salaryRange' label='Salary range' placeholder='90-120k, 2% Equity' validations="minLength:3" required onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea
            name='jobDescription' label='Description' placeholder='Describe your company. Expectations. Required skills. Perks? Whats exciting about this role? 300 words minimum, please…' rows='10'
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
              <input ref='companyLogo' name='companyLogo' label='Logo' type='file' className='hide' accept='image/*' onChange={this.imgUpload} />
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
          <input ref='bossPicture' name='bossPicture' label='Profile Picture' type='file' className='hide' accept='image/*' onChange={this.imgUpload} />
          <Divider horizontal />

          <Form.Input name='companyEmail' label='Send applications to:' placeholder='your@email.com' type='email'
            validations="isEmail"
            validationErrors={{ isEmail: 'Email is not valid' }}
            required
            errorLabel={ errorLabel } onChange={this.handleChange} validations="isEmail" />
          <Divider horizontal />

          <div className='free-or-paid'>
            <Header as='h2' textAlign='center' content="❤️ Support the project. Promote your Ad!" />
            <Segment color={supportMethod === 0 ? 'green' : ''} onClick={this.updateSupportMethod.bind(this, 0)}>
              <h3><span className='ui green text strikethrough'>$199</span> Free</h3>
              <ul>
                <li>⏬ Your Ad gets pushed down every day</li>
                <li>⚠️ Published after review</li>
                <li>☹️ Limited support</li>
                <li className='hide'>🚨 We'll notify you about new leads. Pay when you want</li>
                <li className='hide'>⚠️ This might actually end up being more expensive. But it's up to you..</li>
              </ul>
            </Segment>
            <Segment className='hide' color={supportMethod === 1 ? 'green' : ''} onClick={this.updateSupportMethod.bind(this, 1)}>
              <h3>5 leads for 5 each — $25</h3>
              <ul>
                <li>🖐 5 leads at a discounted rate</li>
                <li>👍 Fund on-going development of the platform</li>
                <li>❤️ Good karma for helping a bootstrapped startup</li>
              </ul>
            </Segment>
            <Segment color={supportMethod === 2 ? 'green' : ''} onClick={this.updateSupportMethod.bind(this, 2)}>
              <h3><span className='ui green text strikethrough'>$300</span> $199 Featured</h3>
              <ul>
                <li>🙌 Unlimited leads</li>
                <li>⭐️ Highlited Job Ad - 3-5x more views</li>
                <li>✅ Instant publication</li>
                <li>💌 Featured Twitter and Newsletter shout outs during 4 weeks</li>
                <li>👍 Fund on-going development of the platform</li>
                <li>❤️ Good karma for helping a bootstrapped startup</li>
              </ul>
            </Segment>
          </div>

          <Divider horizontal />
          <Message error header='Something went wrong' content='Please check all fields and ensure they are filled!' />

          <Segment textAlign='center' secondary padded='very'>
            <PostButton
              onToken={this.handleStripeToken.bind(this)}
              handleSubmit={this.handleSubmit}
              email={this.state.companyEmail}
              pricedItem={{
                0: {amount: 0, description: '"Pay as you go…"'},
                1: {amount: 25*100, description: '"5 for 5"'},
                2: {amount: 199*100, description: '"Featured Listing"'}
              }[supportMethod]}/>
          </Segment>
        </Form>
        }

      </Container>
    );
  }
}

export default PostAJob;

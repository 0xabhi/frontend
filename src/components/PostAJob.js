import './PostAJob.styl';

import _ from 'lodash';
import { get as ENV } from 'react-global-configuration';
import React from 'react';
import { post } from 'axios';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon, Select, Checkbox } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'
import PostButton from './PostButton';
import Testimonials from './Testimonials';
import logoUrl from '../../public/images/cjl-logo-night.png'

const API = ENV('apiDomain')
const errorLabel = <Label color="red" pointing/>
const employmentTypeOptions = [
  {key: 'FULL_TIME', value: 'FULL_TIME', text: 'Full-time'},
  {key: 'CONTRACTOR', value: 'CONTRACTOR', text: 'Contractor'},
  {key: 'INTERN', value: 'INTERN', text: 'Intern'},
  {key: 'OTHER', value: 'OTHER', text: 'Other'},
]

// @observer
class PostAJob extends React.Component {
  // @observable title = ''

  constructor(props){
    super(props);
    document.title = 'Post a job on Crypto Jobs List';
    this.state = {
      loading: false,
      error: false,
      submitted: false,
      supportMethod: 2,
      employmentType: 'FULL_TIME'
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
        <a href='https://cryptojobslist.com' target='_blank'>
          <Image className='logo' height='35' src={logoUrl} />
        </a>
        <Divider horizontal />

        {this.state.submitted ?
          <div>
            <Header as='h1' textAlign='center'>Please check your email!</Header>
            <Header as='h3' textAlign='center'>Your job posting was submitted for review.</Header>
            <Divider horizontal />
            <Divider horizontal />
            <Image src="https://reactiongifs.me/wp-content/uploads/2013/10/i-wingman-successfully-leonardo-dicaprio.gif" centered rounded size='massive' />
            <Divider horizontal />
            <center>
              <Button content={<span>
                Post another job <Icon name="arrow right" />
              </span>} size='huge' color='green' href='/' />
            </center>
          </div>
        :
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>Post a Job <Label content="FREE" color='green' size='mini' /></Header>
          <p>
            #1 crypto community to find and post blockchain jobs! 😉<br/>
            Note: that listings need to be <strong>crypto</strong> related and can only be used to fill a single position.
          </p>
          <Divider horizontal />
          <Form.Input name='jobTitle' label='Title' placeholder='e.g. Blockchain Engineer' validations="minLength:3" required onChange={this.handleChange} />
          <Form.Group>
            <div className='field'>
              <Form.Input name='jobLocation' label='Location' placeholder='e.g. New York, Remote, Singapore…' validations="minLength:3" required onChange={this.handleChange} />
              <Checkbox name='remote'  label='🌍 Remote OK' onChange={this.handleChange} />
            </div>

          </Form.Group>
          <Form.TextArea
            name='companyAbout' label='About your company'
            placeholder="What's special about your company? What hard problems are you solving? What's great about your culture? 200 words minimum, please…"
            rows='7'
            validations="minLength:200"
            validationErrors={{ minLength: '200 words, please…' }}
            required
            errorLabel={ errorLabel }
            onChange={this.handleChange} />
          <Form.TextArea
            name='jobDescription' label='Job description' placeholder="Responsibilities? Requirements? What's exciting about this role? 300 words minimum, please… (Markdown supported)" rows='10'
            validations="minLength:300"
            validationErrors={{ minLength: '300 words, please…' }}
            required
            errorLabel={ errorLabel }
            onChange={this.handleChange} />
          <Form.Group>
            <Form.Input name='skills' label='Skills' placeholder='solidity, javascript, C++, python, marketing…' onChange={this.handleChange} />
            <div className='field'>
              <label>Type of Position</label>
              <Select name='employmentType' label='Type of Position' options={employmentTypeOptions} defaultValue='FULL_TIME' onChange={this.handleChange} />
            </div>
          </Form.Group>
          <Form.Input name='salaryRange' label='Salary range' placeholder='90-120k, 2% Equity' validations="minLength:3" required onChange={this.handleChange} />
          <p>↑ <b>Don't</b> put things like <i>"Negotiable"</i> or <i>"Competitive"</i> — candidates ignore such jobs posts like spam…</p>
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
                <label>Your 🎨 Company Logo</label>
              </div>
            </Grid.Column>
          </Grid>


          <Divider horizontal />
          <Header as='h3' content=" 💁 Let's get personal!" />
          <Form.Input name='bossName' label="Your or your boss' name" placeholder='e.g. Vitalik Buterin' validations="minLength:3" required onChange={this.handleChange} />

          <div className='field'>
            <label>Your Lovely 🤓 Photo:</label>
          </div>
          <Image
            title="Boss' Picture"
            src={bossPicture || 'https://react.semantic-ui.com/assets/images/wireframe/white-image.png'}
            circular bordered size='small'
            onClick={e => {this.refs.bossPicture.click() }}/>
          <input ref='bossPicture' name='bossPicture' label='Profile Picture' type='file' className='hide' accept='image/*' onChange={this.imgUpload} />
          <Divider horizontal />

          <Form.Input name='companyEmail' label='Send applicants to:' placeholder='your@email.com' type='email'
            validations="isEmail"
            validationErrors={{ isEmail: 'Email is not valid' }}
            required
            errorLabel={ errorLabel } onChange={this.handleChange} validations="isEmail" />
          <Divider horizontal />

          <div className='free-or-paid'>
            <Header as='h2' textAlign='center' content="Promote your job posting:" />
            <Segment color={supportMethod === 0 ? 'green' : ''} onClick={this.updateSupportMethod.bind(this, 0)}>
              <h3>Basic <span className='ui text strikethrough'>$50</span> <span className='ui green text'>FREE</span></h3>
              <ul>
                <li>📩 3 FREE Applicants </li>
                <li>🚫 Limited support</li>
                <li>⚠️ Published in 1-3 days</li>
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
            <Segment color={supportMethod === 3 ? 'green' : ''} onClick={this.updateSupportMethod.bind(this, 3)}>
              <h3>Verified <span className='ui text strikethrough'>$150</span> <span className='ui green text'>$99</span></h3>
              <ul>
                <li>📩 Unlimited Applicants</li>
                <li><i className="fab fa-twitter ui text blue"/> Reach 2.2k+ targeted <a href='https://twitter.com/cryptojobslist' target='_blank'><b>Twitter</b></a> followers </li>
                <li><i className="fab fa-reddit ui text orange"/> Get auto-published on 5 #crypto sub-<span className="ui text orange"><b>Reddits</b></span>  </li>
                <li><i className="fab fa-telegram-plane ui text dark-blue"/> Notify our <a href='https://t.me/cryptojobslist' className='ui text dark-blue' target='_blank'><b>Telegram</b></a> channel followers</li>
                <li>✅ Published within 12 hours</li>
              </ul>
            </Segment>

            <Segment color={supportMethod === 2 ? 'green' : ''} onClick={this.updateSupportMethod.bind(this, 2)}>
              <h3 className='hide'>
                <center>⚠️ Temporarily not available due to high demand! ⚠️ </center>
                <small><center>Watch our <a href='https://twitter.com/cryptojobslist' target='_blank'>Twitter @cryptojobslist</a> for announcements</center></small>
              </h3>
              <h3>Featured <span className='ui text strikethrough'>$300</span> <span className='ui green text'>$199</span></h3>
              <ul>
                <li>⭐️ <b>Highlighted Job Ad</b>, placed at the top for a month — <b>3-5x</b> more views</li>
                <li>💌 Featured <a href='https://twitter.com/cryptojobslist' target='_blank'><b>Twitter</b></a> and Newsletter shout-outs over 4 weeks — <b>4x Verified</b></li>
                <li>📩 Unlimited Applicants</li>
                <li>✅ Published instantly</li>
                <li>😃 Priority Support</li>
                <li>👍 Fund on-going development of the platform</li>
                <li>❤️ Good karma for helping a bootstrapped startup</li>
              </ul>
            </Segment>
            <Testimonials />
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
                2: {amount: 199*100, description: '"Featured Listing"'},
                3: {amount: 99*100, description: '"Verified"'}
              }[supportMethod]}/>
          </Segment>
        </Form>
        }

      </Container>
    );
  }
}

export default PostAJob;

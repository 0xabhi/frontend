import { get as ENV } from 'react-global-configuration'
import _ from 'lodash'
import React from 'react'
import { get, post } from 'axios'
import { observer, inject } from 'mobx-react'
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon, Select, Checkbox } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'

import LogoButton from '../components/LogoButton'


const API = ENV('apiDomain')
const errorLabel = <Label color="red" pointing/>
const employmentTypeOptions = [
  {key: 'FULL_TIME', value: 'FULL_TIME', text: 'Full-time'},
  {key: 'CONTRACTOR', value: 'CONTRACTOR', text: 'Contractor'},
  {key: 'INTERN', value: 'INTERN', text: 'Intern'},
  {key: 'OTHER', value: 'OTHER', text: 'Other'},
]
const jobCategories = [
  {key: 'Engineering', value: 'Engineering', text: '🛠 Engineering'},
  {key: 'Design', value: 'Design', text: '🎨 Design / Product'},
  {key: 'Trading', value: 'Trading', text: '🤑 Trading / Crypto Research'},
  {key: 'Community', value: 'Community', text: '💬 Community'},
  {key: 'Content', value: 'Content', text: '✍️ Content'},
  {key: 'Marketing', value: 'Marketing', text: '📈 Marketing'},
  {key: 'Memes', value: 'Memes', text: '🐸 Memes, gifs, glitter'},
  {key: 'Executive', value: 'Executive', text: '💼 Executive'},
  {key: 'Other', value: 'Other', text: 'Other…'},
]

@inject('routingStore')
@inject('jobStore')
@observer
class JobEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false
    }
    this.imgUpload = this.imgUpload.bind(this)
  }

  componentWillMount () {
    const { slug, securitySuffix } = this.props.match.params
    this.props.jobStore.fetchForEditing({ slug, securitySuffix })
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

  handleStripeToken (token) {
    console.log({token})
    this.setState({customerToken: token})
    this.handleSubmit()
  }

  render() {
    const { loading, error, supportMethodId } = this.state
    const formState = { loading, error }

    const { job, handleChange, save } = this.props.jobStore
    const { jobTitle, companyLogo, bossPicture } = job

    const onChange = {onChange: handleChange}

    return (
      <Container className="PostAJob" text>
        <LogoButton />
        <Divider horizontal />
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>Edit a Job <Label content="FREE" color='green' size='mini' /></Header>
          <Header as='h2'>{job.jobTitle}</Header>
          <Divider horizontal />
          <Form.Input name='jobTitle' label='Title' placeholder='e.g. Blockchain Engineer' validations="minLength:3" required {...onChange} value={job.jobTitle} />
          <Form.Group>
            <div className='field'>
              <Form.Input name='jobLocation' label='Location' placeholder='e.g. New York, Remote, Singapore…' validations="minLength:3" required {...onChange} />
              <Checkbox name='remote'  label='🌍 Remote OK' {...onChange} />
              <Checkbox name='paidRelocation'  label='✈️ Paid Relocation' {...onChange} />
              <Checkbox name='visaSponsor'  label='🛂 Visa Sponsor' {...onChange} />
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
            {...onChange} />
          <Form.TextArea
            name='jobDescription' label='Job description' placeholder="Responsibilities? Requirements? What's exciting about this role? 300 words minimum, please… (Markdown supported)" rows='10'
            validations="minLength:300"
            validationErrors={{ minLength: '300 words, please…' }}
            required
            errorLabel={ errorLabel }
            {...onChange} />
          <Form.Group>
            <Form.Input name='skills' label='Skills' placeholder='solidity, javascript, C++, python, marketing…' {...onChange} />
            <div className='field'>
              <label>Category</label>
              <Select name='category' label='Type of Position' options={jobCategories} defaultValue='Engineering' {...onChange} />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Input name='salaryRange' label='Salary range' placeholder='USD 90-120k, 2% Equity …' validations="minLength:3" {...onChange} />
            <div className='field'>
              <label>Engagement type</label>
              <Select name='employmentType' label='Type of Position' options={employmentTypeOptions} defaultValue='FULL_TIME' {...onChange} />
            </div>
          </Form.Group>
          <p>↑ <b>Don't</b> put things like <i>"Negotiable"</i> or <i>"Competitive"</i> — candidates ignore such jobs posts like spam…</p>
          <Divider horizontal />

          <Header as='h3' content=' 🏢 Your Company Details?' />
          <Grid columns={2}>
            <Grid.Column>
              <Form.Input name='companyUrl' label='Web Site' placeholder='https://yoursite.com' validations="isUrl" required {...onChange} />
              <Form.Input name='companyName' label='Company Name' placeholder='Keep it short: e.g. CryptoCoin' validations="minLength:2" required {...onChange} />
              <Form.Input name='companyTwitter' label='Twitter' placeholder='@twitterHandle' validations="minLength:3" required {...onChange} />
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
          <Form.Input name='bossName' label="Your or your boss' name" placeholder='e.g. Vitalik Buterin' validations="minLength:3" required {...onChange} />

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
            errorLabel={ errorLabel } {...onChange} validations="isEmail" />
          <Divider horizontal />

          <Message error header='Something went wrong' content='Please check all fields and ensure they are filled!' />
          <Button content='Save' size='huge' primary onClick={save} />
        </Form>
      </Container>
    );
  }
}

export default JobEdit;

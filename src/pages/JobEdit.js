import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon, Select, Checkbox } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'

import LogoButton from '../components/LogoButton'
const errorLabel = <Label color="red" pointing/>

@inject('jobStore')
@observer
class _Input extends React.Component {
  render () {
    const { name, jobStore: {job, handleChange}, ...rest} = this.props
    return (
      <Form.Input name={name} value={job[name]} onChange={handleChange} {...rest} />
    )
  }
}

@inject('routingStore')
@inject('jobStore')
@observer
class JobEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false
    }
  }

  componentWillMount () {
    const { slug, securitySuffix } = this.props.match.params
    this.props.jobStore.fetchForEditing({ slug, securitySuffix })
  }


  render() {
    const { loading, error, supportMethodId } = this.state
    const formState = { loading, error }

    const { job, handleChange, save, imageUpload, _changes } = this.props.jobStore
    const onChange = {onChange: handleChange}

    console.log(job)
    return (
      <Container className="PostAJob" text>
        <LogoButton />
        <Divider horizontal />
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>Edit a Job</Header>
          <Divider horizontal />
          <_Input name='jobTitle' label='Title' placeholder='e.g. Blockchain Engineer' validations="minLength:3" required />
          <Form.Group>
            <div className='field'>
              <_Input name='jobLocation' label='Location' placeholder='e.g. New York, Remote, Singapore…' validations="minLength:3" required />
              <Checkbox name='remote'  label='🌍 Remote OK' {...onChange} checked={job.remote} />
              <Checkbox name='paidRelocation'  label='✈️ Paid Relocation' {...onChange} checked={job.paidRelocation} />
              <Checkbox name='visaSponsor'  label='🛂 Visa Sponsor' {...onChange} checked={job.visaSponsor} />
            </div>
          </Form.Group>
          <Form.TextArea
            name='companyAbout' label='About your company'
            placeholder="What's special about your company? What hard problems are you solving? What's great about your culture? 200 words minimum, please…"
            rows='7'
            validations="minLength:200"
            validationErrors={{ minLength: '200 words, please…' }}
            required
            errorLabel={errorLabel}
            value={job.companyAbout}
            {...onChange} />
          <Form.TextArea
            name='jobDescription' label='Job description' placeholder="Responsibilities? Requirements? What's exciting about this role? 300 words minimum, please… (Markdown supported)" rows='10'
            validations="minLength:300"
            validationErrors={{ minLength: '300 words, please…' }}
            required
            errorLabel={errorLabel}
            value={job.jobDescription}
            {...onChange} />
          <Form.Group>
            <_Input name='skills' label='Skills' placeholder='solidity, javascript, C++, python, marketing…' />
            <div className='field'>
              <label>Category</label>
              <Select name='category' label='Type of Position' options={this.props.jobStore.jobCategories} defaultValue='Engineering' {...onChange} value={job.category}/>
            </div>
          </Form.Group>
          <Form.Group>
            <_Input name='salaryRange' label='Salary range' placeholder='USD 90-120k, 2% Equity …' validations="minLength:3" />
            <div className='field'>
              <label>Engagement type</label>
              <Select name='employmentType' label='Type of Position' options={this.props.jobStore.employmentTypeOptions} defaultValue='FULL_TIME' {...onChange} value={job.employmentType}/>
            </div>
          </Form.Group>
          <p>↑ <b>Don't</b> put things like <i>"Negotiable"</i> or <i>"Competitive"</i> — candidates ignore such jobs posts like spam…</p>
          <Divider horizontal />

          <Header as='h3' content=' 🏢 Your Company Details?' />
          <Grid columns={2}>
            <Grid.Column>
              <_Input name='companyUrl' label='Web Site' placeholder='https://yoursite.com' validations="isUrl" required />
              <_Input name='companyName' label='Company Name' placeholder='Keep it short: e.g. CryptoCoin' validations="minLength:2" required/>
              <_Input name='companyTwitter' label='Twitter' placeholder='@twitterHandle' validations="minLength:3" required />
            </Grid.Column>
            <Grid.Column>
              <Image title='Company Logo' src={job.companyLogo || 'https://react.semantic-ui.com/assets/images/wireframe/white-image.png'} size='medium' rounded bordered onClick={e => {this.refs.companyLogo.click() }} />
              <input ref='companyLogo' name='companyLogo' label='Logo' type='file' className='hide' accept='image/*' onChange={imageUpload} />
              <div className='field'>
                <label>Your 🎨 Company Logo</label>
              </div>
              <_Input name='companyLogo' size='mini' placeholder='https://<image>.png' validations="isUrl" />
            </Grid.Column>
          </Grid>


          <Divider horizontal />
          <Header as='h3' content=" 💁 Let's get personal!" />
          <_Input name='bossName' label="Your or your boss' name" placeholder='e.g. Vitalik Buterin' validations="minLength:3" required />

          <div className='field'>
            <label>Your Lovely 🤓 Photo:</label>
          </div>
          <Grid columns={2}>
            <Grid.Column>
              <_Input name='bossPicture' size='mini' placeholder='https://<image>.png' validations="isUrl" />
              <Image
                title="Boss' Picture"
                src={job.bossPicture || 'https://react.semantic-ui.com/assets/images/wireframe/white-image.png'}
                circular bordered size='small'
                onClick={e => {this.refs.bossPicture.click() }}/>
              <input ref='bossPicture' name='bossPicture' label='Profile Picture' type='file' className='hide' accept='image/*' onChange={imageUpload} />
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
          <Divider horizontal />

          <_Input name='companyEmail' label='Send applicants to:' placeholder='your@email.com' type='email'
            validations="isEmail"
            validationErrors={{ isEmail: 'Email is not valid' }}
            required errorLabel={errorLabel} />
          <Divider horizontal />

          <Message error header='Something went wrong' content='Please check all fields and ensure they are filled!' />
          <Button content='Save' size='huge' primary onClick={save} />
          {job.canonicalURL ? <Button as={Link} to={job.canonicalURL} size='huge' target='_blank'>
            View  <Icon name='external' />
          </Button> : null}
          {_changes.length ?
            <p>You made {_changes.length} changes to your listing. Save?</p>
          : null}
        </Form>
      </Container>
    );
  }
}

export default JobEdit;

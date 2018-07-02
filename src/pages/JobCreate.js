import '../components/PostAJob.styl'

import { get as ENV } from 'react-global-configuration'
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon, Select, Checkbox } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'

import FileDropWithPreview from '../components/FileDropWithPreview';

import Editor from '../components/MarkdownEditor'
import PaymentPlanSelector from '../components/PaymentPlanSelector'
import Testimonials from '../components/Testimonials'
import PostButton from '../components/PostButton'
const errorLabel = <Label color="red" pointing/>

@inject('JobStore')
@observer
class _Input extends React.Component {
  render () {
    const { name, JobStore: {job, handleChange}, ...rest} = this.props
    return (
      <Form.Input name={name} value={job[name]} onChange={handleChange} {...rest} />
    )
  }
}

@inject('JobStore')
@observer
class JobCreate extends React.Component {
  componentWillMount () {
    this.props.JobStore.newJob()
  }

  handleStripeToken (token) {
    const { job, create } = this.props.JobStore
    job.customerToken = token
    create()
  }

  handleCompanyNameChange = (e) => {
    const { job, autoComplete } = this.props.JobStore;
    const autoCompleteList = autoComplete.data
    const text = e.target.value
    const JobStore = this.props.JobStore
    const inputsFields = this.refs.form.formsyForm.inputs

    if (!text.endsWith('\u00A0')) {
      JobStore.autoCompleteRefresh({ q: text })
      return
    }

    const companyName = text.trim('\u00A0');
    const company = autoCompleteList.find(x => x.name === companyName);

    if (!company) { return }

    const companyFields = {
      company: company.id,
      companyAbout: company.about,
      companyName: company.name,
      companyUrl: company.url,
      companyTwitter: company.twitter,
      companyLogo: company.logo,
      bossName: company.bossName,
      bossPicture: company.bossPicture,
    }

    Object.assign(job, companyFields)

    Object.keys(companyFields)
    .forEach(key => {
      const inputFieldDOM = inputsFields.find(input => input.props.name === key)
      if (inputFieldDOM) {
        // Direct DOM modification — not very good. But works for now…
        // Better be refactored in future.
        inputFieldDOM.setValue(companyFields[key])
      }
    })

    this.forceUpdate()
  }

  render() {
    const { loading, error, loadingImage, loadingImageName } = this.props.JobStore
    const formState = { error, loading }

    const { job, jobSubmitted, _changes, handleChange, create, imageUpload, newJob } = this.props.JobStore
    const onChange = {onChange: handleChange}
    let [errorHeader, errorContent] = ['Something went wrong', `Please check all fields and ensure they are filled! ${error}`]

    if (error && error.response) {
      const {status, statusText, data} = error.response
      errorHeader = status + ' ' + statusText
      errorContent = data
    }

    if (jobSubmitted) {
      const jobPreviewUrl = jobSubmitted.url
      return <Container className="PostAJob" text>
        <Header as='h1' textAlign='center'>Please check your email!</Header>
        <Header as='h3' textAlign='center'>Your job posting was submitted for review.</Header>
        <Divider horizontal />
        <Divider horizontal />
        <Image src="https://reactiongifs.me/wp-content/uploads/2013/10/i-wingman-successfully-leonardo-dicaprio.gif" centered rounded size='massive' />
        <Divider horizontal />
        <center>
          <Button content={<span>
            Post another Job <Icon name="arrow right" />
          </span>} size='huge' color='green' onClick={newJob} />
          { jobPreviewUrl ? <Button content={<span>View your Job</span>} size='huge' href={jobPreviewUrl} target='_blank'/> : null }
        </center>
    </Container>
    }

    const { autoComplete } = this.props.JobStore;
    const companyName = this.refs.form && this.refs.form.formsyForm.inputs.find(x => x.props.name === 'companyName').getValue()

    return (
      <Container className="PostAJob" text>
        <Helmet>
          <title>Post a job | Crypto Jobs List</title>
        </Helmet>
        <Form ref="form"  size='large' widths='equal' autoComplete="off" {...formState}>
          <Header as='h1'>Post a Job <Label content="FREE" color='green' size='mini' /></Header>
          <p>
            #1 crypto community to find and post blockchain jobs! 😉<br/>
            Note: that listings need to be <strong>crypto</strong> related and can only fill a single position at a time.
          </p>
          <Divider horizontal />
          <Message error header={errorHeader} content={errorContent} />
          <_Input name='jobTitle' label='Job title' placeholder='e.g. Blockchain Engineer' validations="minLength:3" required />
          <Form.Group>
            <div className='field'>
              <_Input name='jobLocation' label='Location' placeholder='e.g. New York, Remote, Singapore…' validations="minLength:3" required />
              <Checkbox name='remote'  label='🌍 Remote OK' {...onChange} checked={job.remote} />
              <Checkbox name='paidRelocation'  label='✈️ Paid Relocation' {...onChange} checked={job.paidRelocation} />
              <Checkbox name='visaSponsor'  label='🛂 Visa Sponsor' {...onChange} checked={job.visaSponsor} />
            </div>
          </Form.Group>
          <_Input
              list="companyNames"
              name='companyName'
              label='Company Name'
              placeholder='Keep it short: e.g. CryptoCoin'
              validations={{
                minLength: 3,
                maxLength: 50,
              }}
              loading={autoComplete.loading}
              required
              onChange={this.handleCompanyNameChange}
            />
          <div className='field'>
            <label>About your company</label>
            <Editor name='companyAbout' value={job.companyAbout} handleChange={handleChange} />
          </div>
          <div className='field'>
            <label>Job description</label>
            <Editor name='jobDescription' value={job.jobDescription} handleChange={handleChange} />
          </div>
          <Form.Group>
            <_Input name='skills' label='Skills' placeholder='solidity, javascript, C++, python, marketing…' />
            <div className='field'>
              <label>Category</label>
              <Select name='category' label='Type of Position' options={this.props.JobStore.jobCategories} defaultValue='Engineering' {...onChange} value={job.category}/>
            </div>
          </Form.Group>
          <Form.Group>
            <div className='field'>
              <_Input name='salaryRange' label='Salary range' placeholder='USD 90-120k, 2% Equity …' validations="minLength:3" />
              <Checkbox name='paysInCrypto' label={<label><Icon name='btc' color='orange' />Pay in cryptocurrency: BTC/ETH/LTC/XMR…</label>} {...onChange} checked={job.paysInCrypto} />
            </div>
            <div className='field'>
              <label>Engagement type</label>
              <Select name='employmentType' label='Type of Position' options={this.props.JobStore.employmentTypeOptions} defaultValue='FULL_TIME' {...onChange} value={job.employmentType}/>
            </div>
          </Form.Group>
          {/*<p>↑ <b>Don't</b> put things like <i>"Negotiable"</i> or <i>"Competitive"</i> — candidates ignore such jobs posts like spam…</p>*/}
          <Divider horizontal />

          <Header as='h3' content=' 🏢 Your Company Details' />
          <Grid columns={2}>
            <Grid.Column>
              {
                autoComplete && autoComplete.data ? (
                  <datalist id='companyNames'>
                    {
                      autoComplete.data
                        .filter(x => x.name.toLowerCase().indexOf(companyName.toLowerCase()) >= 0)
                        .slice(0, 5)
                        .map(x => <option value={`${x.name}\u00A0`} key={x.id} />)
                    }
                  </datalist>
                ) : null
              }
              <_Input name='companyUrl' label='Web Site' placeholder='https://yoursite.com' validations="isUrl" required />
              <_Input name='companyTwitter' label='Twitter' placeholder='@twitterHandle' validations="minLength:3" />
            </Grid.Column>
            <Grid.Column>
              <div className='field'>
                <label>Your 🎨 Company Logo</label>
              </div>
              <_Input name='companyLogo' size='mini' placeholder='https://<image>.png or Drop your Image below 👇' validations="isUrl" />
              <FileDropWithPreview
                image={{
                  title: 'Company Logo',
                  src: job.companyLogo || ENV('imgPlaceholder'),
                  size: 'medium',
                  rounded: true,
                  bordered: true,
                }}
                input={{
                  name: 'companyLogo',
                  label: 'Logo',
                  onChange: imageUpload,
                }}
                loading={loadingImage && loadingImageName === 'companyLogo'}
                error={error}
              />
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
              <_Input name='bossPicture' size='mini' placeholder='https://<image>.png or Drop your Image below 👇' validations="isUrl" />
              <FileDropWithPreview
                image={{
                  title: "Boss' Picture",
                  src: job.bossPicture || ENV('imgPlaceholder'),
                  size: 'small',
                  circular: true,
                  bordered: true,
                }}
                input={{
                  name: 'bossPicture',
                  label: 'Profile Picture',
                  onChange: imageUpload,
                }}
                loading={loadingImage && loadingImageName === 'bossPicture'}
                error={error}
              />
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
          <Divider horizontal />

          <_Input name='companyEmail' label='Send applicants to:' placeholder='your@email.com' type='email'
            validations='minLength:5'
            validationErrors={{ isEmail: 'Email is not valid' }}
            required errorLabel={errorLabel} />
          <Divider horizontal />

          <PaymentPlanSelector name='supportMethodId'  />
          <Testimonials />

          <Message error header={errorHeader} content={errorContent} />

          <Segment textAlign='center' secondary padded='very'>
            <PostButton
              onToken={this.handleStripeToken.bind(this)}
              handleSubmit={create}
              loading={loading}
              email={job.companyEmail}
              pricedItem={this.props.JobStore.plans[job.supportMethodId]}/>
          </Segment>
        </Form>
      </Container>
    )
  }
}

export default JobCreate;

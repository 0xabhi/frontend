import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon, Select, Checkbox } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'

const errorLabel = <Label color="red" pointing/>

@inject('newsletterStore')
@observer
class _Input extends React.Component {
  render () {
    const { name, newsletterStore: {newsletter, handleChange}, ...rest} = this.props
    return (
      <Form.Input name={name} value={newsletter[name]} onChange={handleChange} {...rest} />
    )
  }
}

@inject('routingStore')
@inject('jobStore')
@inject('newsletterStore')
@observer
class NewsletterSettings extends React.Component {
  componentWillMount () {
    const { email, securitySuffix } = this.props.match.params
    this.props.newsletterStore.fetchForEditing({ email, securitySuffix })
  }

  render() {
    const { loading, error } = this.props.newsletterStore
    const formState = { error, loading }
    const { newsletter, _changes, handleChange, save } = this.props.newsletterStore
    const user = {}
    const job = {}
    const filter = {}
    const onChange = {onChange: handleChange}

    return (
      <Container text>
        <Helmet>
          <title>Email | Crypto Jobs List</title>
        </Helmet>
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>Newsletter Filters</Header>
          <p>
            Hi 👋 {newsletter.email} <br/><br/>
            Let's ensure you get only relevant jobs from us!<br/>
            This is still in Beta mode, so don't set your expectations overly high. 😅<br/>
            ⚠️ If you filter out too strictly — you might miss some cool opportunities. I warned you!<br/>
          </p>

          <Form.Group>
            <div className='field'>
              <label>You'll hear from us</label>
              <Checkbox name='daily'  label='Daily' {...onChange} checked={newsletter.daily} />
              <Checkbox name='weekly'  label='Weekly' {...onChange} checked={newsletter.weekly} />
              <Checkbox name='unsubscribe'  label='Never! Unsubscribe me, pls.' {...onChange} checked={newsletter.unsubscribe} />
            </div>
          </Form.Group>
          <Form.Group>
            <_Input name='keywords' label='Keyword filter' placeholder='solidity, python' />
          </Form.Group>
          <Form.Group>
            <div className='field'>
              <_Input name='jobLocation' label='Location filter' placeholder='e.g. New York, Remote, Singapore…'/>
              <Checkbox name='remote'  label='🌍 Remote only' {...onChange} checked={newsletter.remote} />
              <Checkbox name='paidRelocation'  label='✈️ Paid Relocation' {...onChange} checked={newsletter.paidRelocation} />
              <Checkbox name='visaSponsor'  label='🛂 Visa Sponsor' {...onChange} checked={newsletter.visaSponsor} />
            </div>
          </Form.Group>
          <Form.Group>
            <div className='field'>
              <label>Category</label>
              <Select name='categories' label='Type of Position' options={this.props.jobStore.jobCategories} defaultValue='Engineering' {...onChange} value={newsletter.categories} multiple />
            </div>
            <div className='field'>
              <label>Engagement type</label>
              <Select name='employmentTypes' label='Type of Position' options={this.props.jobStore.employmentTypeOptions} defaultValue='FULL_TIME' {...onChange} value={newsletter.employmentTypes} multiple />
            </div>
          </Form.Group>
          <Form.Group>
            <div className='field'>
              <Checkbox name='paysInCrypto' {...onChange} label={<label><Icon name='btc' color='orange'/>Must pay in cryptocurrency</label>} checked={newsletter.paysInCrypto} />
            </div>
          </Form.Group>
          <br/>
          <Button content='Save' loading={loading} color='green' onClick={save} />
        </Form>
      </Container>
    )
  }
}

export default NewsletterSettings;

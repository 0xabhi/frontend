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
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this)
  }
  componentWillMount () {
    // const { slug, securitySuffix } = this.props.match.params
    // this.props.jobStore.fetchForEditing({ slug, securitySuffix })
  }

  onChange (e, { name, value, checked }) {
    // this.job[name] = value || checked || null
    console.log('handleChange', {name, value: (value || checked)});
  }

  render() {
    const { loading, error } = this.props.newsletterStore
    const formState = { error, loading }
    const { newsletter, _changes, handleChange, save } = this.props.newsletterStore
    const user = {}
    const job = {}
    const filter = {}
    const onChange = {onChange: this.onChange}

    return (
      <Container text>
        <Helmet>
          <title>Email | Crypto Jobs List</title>
        </Helmet>
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>Newsletter Filters</Header>
          <Form.Group>
            <_Input name='keywords' label='Keywords' placeholder='solidity, python' validations="minLength:3" />
          </Form.Group>
          <Form.Group>
            <div className='field'>
              <_Input name='jobLocation' label='Location' placeholder='e.g. New York, Remote, Singapore…' validations="minLength:3" required />
              <Checkbox name='remote'  label='🌍 Remote' {...onChange} checked={newsletter.remote} />
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
              <Checkbox name='paysInCrypto' {...onChange} label={<label><Icon name='btc' color='orange'/>Must pay in cryptocurrency</label>} checked={newsletter.remote} />

            </div>
          </Form.Group>
          <br/>
          <Button content='Save' loading={loading} color='green' />
        </Form>
      </Container>
    )
  }
}

export default NewsletterSettings;

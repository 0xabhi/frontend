import React from 'react'
import { observer, inject } from 'mobx-react'
import { Segment, Icon, Header } from 'semantic-ui-react'

@inject('JobStore')
class PaymentPlanSelector extends React.Component {
  handleChange (value) {
    const { name, JobStore: {job, handleChange}, ...rest} = this.props
    handleChange(null, {name, value})
  }

  render () {
    const { name, JobStore: {job}} = this.props
    const value = job[name]
    const handleChange = this.handleChange
    return <div className='free-or-paid'>
      <Header as='h2' textAlign='center' content="Promote your job posting:" />
      <Segment color={value === 0 ? 'green' : null} onClick={handleChange.bind(this, 0)}>
        <h3>Basic <span className='ui text strikethrough'>$50</span> <span className='ui green text'>FREE</span></h3>
        <ul>
          <li>📩 3 FREE Applicants </li>
          <li>🚫 Limited support</li>
          <li>⚠️ Published in 1-3 days</li>
        </ul>
      </Segment>

      <Segment className='hide' color={value === 1 ? 'green' : null} onClick={handleChange.bind(this, 1)}>
        <h3>5 leads for 5 each — $25</h3>
        <ul>
          <li>🖐 5 leads at a discounted rate</li>
          <li>👍 Fund on-going development of the platform</li>
          <li>❤️ Good karma for helping a bootstrapped startup</li>
        </ul>
      </Segment>

      <Segment color={value === 3 ? 'green' : null} onClick={handleChange.bind(this, 3)}>
        <h3>Verified <span className='ui text strikethrough'>$150</span> <span className='ui green text'>$99</span></h3>
        <ul>
          <li>📩 Unlimited Applicants</li>
          <li><Icon name='twitter' color='blue' /> Reach 3k+ targeted <a href='https://twitter.com/cryptojobslist' target='_blank'><b>Twitter</b></a> followers </li>
          <li><Icon name='reddit' color='orange' /> Get auto-published on 5 #crypto sub-<span className="ui text orange"><b>Reddits</b></span>  </li>
          <li><Icon name='telegram' color='dark-blue' /> Notify our <a href='https://t.me/cryptojobslist' className='ui text dark-blue' target='_blank'><b>Telegram</b></a> channel followers</li>
          <li>✅ Published within 12 hours</li>
        </ul>
      </Segment>

      <Segment color={value === 2 ? 'green' : null} onClick={handleChange.bind(this, 2)}>
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
    </div>
  }
}

export default PaymentPlanSelector

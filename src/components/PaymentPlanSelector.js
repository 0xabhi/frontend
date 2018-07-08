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
    return <div className='PaymentPlanSelector'>
      <Header as='h2' textAlign='center' content="Promote your job posting:" />
      {/*<Segment color={value === 0 ? 'green' : null} onClick={handleChange.bind(this, 0)}>
        <h3>Basic <span className='ui text strikethrough'>$50</span> <span className='ui green text'>FREE</span></h3>
        <ul>
          <li>📩 3 FREE Applicants </li>
          <li>🚫 Limited support</li>
          <li>⚠️ Published in 1-3 days</li>
        </ul>
      </Segment>*/}

      <Segment color={value === 2 ? 'green' : null} onClick={handleChange.bind(this, 2)}>
        {/*<h3 className='hide'>
          <center>⚠️ Temporarily not available due to high demand! ⚠️ </center>
          <small><center>Watch our <a href='https://twitter.com/cryptojobslist' target='_blank'>Twitter @cryptojobslist</a> for announcements</center></small>
        </h3>*/}
        <h3>Featured <span className='ui text strikethrough'>$300</span> <span className='ui green text'>$199</span></h3>
        <ul>
          <li>⭐️ <b>Highlighted Job Ad</b>, placed at the top for a month — <b>3-5x</b> more views</li>
          <li><Icon name='twitter' color='blue' /> <b>4x</b> Featured <a href='https://twitter.com/cryptojobslist' target='_blank'><b>Twitter</b></a> and <b>Newsletter</b> shout-outs over 4 weeks (>1 month)</li>
          <li><Icon name='reddit' color='orange' /> Get auto-published on 5 #crypto sub-<span className="ui text orange"><b>Reddits</b></span>  </li>
          <li><Icon name='telegram' color='dark-blue' /> Notify our <a href='https://t.me/cryptojobslist' className='ui text dark-blue' target='_blank'><b>Telegram</b></a> channel followers</li>
          <li>✅ Published instantly</li>
          <li>📩 Unlimited Job Applicants</li>
          <li>😃 Priority Support</li>
          <li>👍 Fund on-going development of Crypto Jobs List</li>
          <li>❤️ Good karma for helping a bootstrapped one-man startup</li>
        </ul>
      </Segment>

      <Segment color={value === 3 ? 'green' : null} onClick={handleChange.bind(this, 3)}>
        <h3>Verified <span className='ui text strikethrough'>$150</span> <span className='ui green text'>$99</span></h3>
        <ul>
          <li><Icon name='twitter' color='blue' />Only 1 shout out to out <a href='https://twitter.com/cryptojobslist' target='_blank'><b>Twitter</b></a> followers </li>
          <li><Icon name='telegram' color='dark-blue' /> Notify our <a href='https://t.me/cryptojobslist' className='ui text dark-blue' target='_blank'><b>Telegram</b></a> channel followers</li>
          <li>✅ Published within ~12 hours</li>
          <li>📩 Unlimited Applicants</li>
          <li>🙂 Limited Support</li>
        </ul>
      </Segment>

      <Segment color={value === 0 ? 'green' : null} onClick={handleChange.bind(this, 0)}>
        <h3>Pay within 12 hours</h3>
        <ul>
          <li>📩 We'll send you a confirmation email, with <i>job preview</i> and <i>payment</i> links.</li>
          <li>⏰ Gives you time to discuss with your boss, CEO, dog, cat and spouse.</li>
          <li>❓ Time to read <a className='underlined' target='_blank' href='https://cjl.ist/2NlRzwJ'>this article</a>, if you are still in doubt.</li>
        </ul>
      </Segment>

      <a className='ui aligned center underlined' target='_blank' href='https://cjl.ist/2NlRzwJ' >
        <b>Why isn't Crypto Jobs List FREE?</b>
      </a>
    </div>
  }
}

export default PaymentPlanSelector

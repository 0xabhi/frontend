import { get as ENV } from 'react-global-configuration'
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import logoUrl from '../../public/images/avatar.jpg'


class PostButton extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { supportMethod } = this.props
    const { amount, description } = this.props.pricedItem;

    if (amount > 0) {
      return <StripeCheckout
          ref="checkout_dialog"
          name="Crypto Jobs List"
          image={logoUrl}
          email={this.props.email}
          token={this.props.onToken}
          amount={amount}
          allowRememberMe={false}
          panelLabel="Post your Job"
          description={description}
          stripeKey={ENV('stripePK')}>
        <Button content='Post your Job' size='huge' primary />
      </StripeCheckout>
    } else {
      return <Button content='Post your Job' size='huge' primary onClick={this.props.handleSubmit} />
    }
  }
}

export default PostButton;

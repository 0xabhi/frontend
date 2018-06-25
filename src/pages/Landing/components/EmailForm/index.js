
import './style.styl'

import React from 'react'
import PropTypes from 'prop-types'
import { Button, Segment,  Input, Grid } from 'semantic-ui-react'
import classnames from 'classnames'
import validator from 'validator';

import Inspiration from './components/Inspiration';


class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      email: '',
    }
  }
  emailChangeHandler = e => {
    const email = e.target.value
    this.setState({ email, valid: validator.isEmail(email) })
  }

  render() {
    const {
      valid,
      email,
    } = this.state;
    const {
      submitHandler,
      ...other,
    } = this.props;

    return (
      <Segment basic className="EmailForm">
        <Grid>
          <Grid.Column centered className="InspirationHolder">
              <Inspiration {...other}/>
          </Grid.Column>
        </Grid>
        <Grid centered>
          <Grid.Column className="Column AttachedColumn" mobile={15} tablet={3} computer={3}>
            <Input
              className={classnames({
                Input: true,
                NotValidInput: !valid,
              })}
              size="medium"
              fluid
              placeholder="Enter your email..."
              type="email"
              value={email}
              onChange={this.emailChangeHandler}
              onKeyPress={(e) => e.key === 'Enter' ? submitHandler(email) : null}
            />
          </Grid.Column>
          <Grid.Column className="Column AttachedColumn" mobile={5} tablet={2} computer={2}>
            <Button className="Button" fluid size="medium" onClick={() => submitHandler(email)}>Invite</Button>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

EmailForm.propTpes = {
  submitHandler: PropTypes.func.isRequired,
}

export default EmailForm;

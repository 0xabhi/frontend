
import './style.styl'

import React from 'react'
import PropTypes from 'prop-types'
import { Button, Segment,  Input, Grid, Header, Image } from 'semantic-ui-react'
import validator from 'validator';

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
      <Segment basic className="JobList">
        <Header as="h2">Features</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column className="Avatar">
              avatar
            </Grid.Column>
            <Grid.Column>
              main content
            </Grid.Column>
            <Grid.Column floated="right">
              <Image circular size="huge" wrapped  src='https://res.cloudinary.com/cryptojobslist/image/fetch/g_face,c_thumb,w_40,h_40,q_auto,fl_lossy,f_auto/dpr_2.0/https://res.cloudinary.com/cryptojobslist/image/upload/v1528389061/eakau5fotcu7a2yztdto.jpg' size='medium' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

EmailForm.propTpes = {
  submitHandler: PropTypes.func.isRequired,
}

export default EmailForm;

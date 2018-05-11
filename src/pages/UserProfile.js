import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon, Select, Checkbox } from 'semantic-ui-react'


@observer
class UserProfile extends React.Component {
  componentWillMount () {
    const { username } = this.props.match.params
    // this.props.userStore.fetch({ username })
  }

  render() {
    const { loading, error } = this.props.userStore

    return (
      <Container text>
        <Helmet>
        </Helmet>

      </Container>
    )
  }
}

export default UserProfile

// import '../../components/PostAJob.styl'
import './style.styl'

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon, Select, Checkbox } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'

import EmailForm from './components/EmailForm';
import JobList from './components/JobList';

class Landing extends React.Component {
  render() {
    return (
      <Container className="Landing" text>
        <Header as='h1'>Find your next Job<br/>in the Blockchain Industry.</Header>
        <p>
          <strong>Crypto Jobs List</strong> is your #1 board to find and post blockchain jobs.<br/>
          Blockchain engineers, Solidity devs, crypto experts — this is for you 😉
        </p>
        <Divider horizontal />
        <EmailForm
          inspirations={[
            "sdfsf",
            'xcvxcv'
          ]}
          submitHandler={(e) => console.log(e)}
        />
        <JobList />
      </Container>
    )
  }
}

export default Landing;

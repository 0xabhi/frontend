import 'react-mde/lib/styles/css/react-mde-all.css'

import React from 'react'
import { observer, inject } from 'mobx-react'
import ReactMde, { ReactMdeTypes } from 'react-mde'
import { Helmet } from 'react-helmet'
import Marked from 'marked'


interface VLState {
  mdeState: ReactMdeTypes.MdeState;
}

@inject('jobStore')
@observer
export default class MarkdownEditor extends React.Component<{}, VLState> {
  constructor(props) {
    super(props);
    this.state = {
      mdeState: {markdown: ''},
    }
  }

  onChange = (mdeState: ReactMdeTypes.MdeState) => {
    console.log(123, arguments)
    const markdown = mdeState.markdown
    this.setState({mdeState})
  }

  render() {
    console.log(this.props)
    // console.log(this.state.mdeState)
    return [
      <ReactMde
        layout='tabbed'
        onChange={this.onChange}
        editorState={this.state.mdeState}
        generateMarkdownPreview={Marked} />,
      <Helmet><script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"/></Helmet>
    ]
  }

}



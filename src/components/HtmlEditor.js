import 'react-mde/lib/styles/css/react-mde-all.css'

import React from 'react'
import { Editor, EditorState } from 'draft-js';
import { Helmet } from 'react-helmet'
import Marked from 'marked'


interface VLState {
  mdeState: ReactMdeTypes.MdeState;
}

@inject('jobStore')
@observer
export default class HtmlEditor extends React.Component<{}, VLState> {
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
    return [
      <ReactMde
        layout='tabbed'
        onChange={this.onChange}
        editorState={this.state.mdeState}
        generateMarkdownPreview={Marked} />
    ]
  }

}



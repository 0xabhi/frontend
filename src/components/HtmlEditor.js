import 'react-mde/lib/styles/css/react-mde-all.css'

import React from 'react'
import { Editor, EditorState } from 'draft-js'

@observer
export default class HtmlEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onChange = (state) => {
    this.setState({state})
  }

  render() {
    console.log(this.props)
    return [
      <Editor
        onChange={this.onChange}
        editorState={this.state}
        generateMarkdownPreview={Marked} />
    ]
  }

}



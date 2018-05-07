// https://github.com/nikgraf/awesome-draft-js

import 'react-mde/lib/styles/css/react-mde-all.css'
import React from 'react'
import ReactMde, { ReactMdeTypes, ReactMdeCommands as Cmd } from 'react-mde'
import { EditorState, ContentState } from 'draft-js'
import { Helmet } from 'react-helmet'
import Marked from 'marked'

interface VLState {
  mdeState: ReactMdeTypes.MdeState;
}

export default class MarkdownEditor extends React.Component<{}, VLState> {
  constructor(props) {
    super(props);
    this.state = { mdeState: { markdown: props.value} }
  }

  componentWillReceiveProps (nextProps) {
    const markdown = nextProps.value || ''
    const markdownCurrent = this.state.mdeState.markdown
    if (markdown !== markdownCurrent) {
      const contentState = ContentState.createFromText(markdown)
      const draftEditorState = EditorState.createWithContent(contentState)
      this.setState({mdeState: {
        draftEditorState,
        markdown,
        html: Marked(markdown)
      }})
    }
  }

  onChange (mdeState: ReactMdeTypes.MdeState) {
    this.setState({mdeState})
    this.props.handleChange(null, {
      name: this.props.name,
      value: mdeState.markdown
    })
  }


  render() {
    return [
      <ReactMde
        key={Math.random()}
        layout='tabbed'
        onChange={this.onChange.bind(this)}
        editorState={this.state.mdeState}
        generateMarkdownPreview={Marked}
        commands={[
          [Cmd.headerCommand, Cmd.boldCommand, Cmd.italicCommand],
          [Cmd.unorderedListCommand, Cmd.orderedListCommand],
          [Cmd.linkCommand, Cmd.quoteCommand, Cmd.codeCommand, Cmd.imageCommand],
        ]} />,
      <Helmet key={Math.random()}><script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"/></Helmet>
    ]
  }

}



import 'react-mde/lib/styles/css/react-mde-all.css'

import React from 'react'
import { observer, inject } from 'mobx-react'
import ReactMde, { ReactMdeTypes } from 'react-mde'
import { EditorState, ContentState } from 'draft-js'
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
    this.state = { mdeState: { markdown: props.value} }
  }

  componentWillReceiveProps (nextProps) {
    const markdown = nextProps.value || ''
    const contentState = ContentState.createFromText(markdown)
    const currentEditorState = this.state.mdeState.draftEditorState
    const draftEditorState = EditorState.createWithContent(contentState)
    const mdeState = {
      draftEditorState,
      markdown,
      html: Marked(markdown)
    }
    this.setState({mdeState})
  }


  onChange (mdeState: ReactMdeTypes.MdeState) {
    this.props.handleChange(null, {
      name: this.props.name,
      value: mdeState.markdown
    })
  }


  render() {
    return [
      <ReactMde
        layout='tabbed'
        onChange={this.onChange.bind(this)}
        editorState={this.state.mdeState}
        generateMarkdownPreview={Marked} />,
      <Helmet><script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"/></Helmet>
    ]
  }

}



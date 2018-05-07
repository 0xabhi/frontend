import 'draft-js/dist/Draft.css'

import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

export default class HtmlEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()}
  }

  componentWillReceiveProps (nextProps) {
    const text = nextProps.value || ''
    const textCurrent = this.state.editorState

    console.log(textCurrent)

    // if (markdown !== markdownCurrent) {
    //   const contentState = ContentState.createFromText(markdown)
    //   const draftEditorState = EditorState.createWithContent(contentState)
    //   this.setState({mdeState: {
    //     draftEditorState,
    //     markdown,
    //     html: Marked(markdown)
    //   }})
    // }
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    console.log('rendering')
    return [
      <Editor
        onChange={this.onChange}
        handleKeyCommand={this.handleKeyCommand}
        editorState={this.state.editorState} />
    ]
  }

}



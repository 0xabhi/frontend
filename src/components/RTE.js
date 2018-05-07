import React from 'react'
import RichTextEditor from 'react-rte';
import { Editor, EditorState, RichUtils } from 'draft-js'

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'}
  ],
  BLOCK_TYPE_DROPDOWN: [
    {label: 'Normal', style: 'unstyled'},
    {label: 'Heading Large', style: 'header-one'},
    {label: 'Heading Medium', style: 'header-two'},
    {label: 'Heading Small', style: 'header-three'}
  ],
  BLOCK_TYPE_BUTTONS: [
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'}
  ]
};

export default class RTE extends React.Component {
  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value})
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      )
    }
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
    console.log('RTE rendering')
    return [
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        toolbarConfig={toolbarConfig}
      />
    ]
  }

}



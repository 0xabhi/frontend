// https://docs.slatejs.org/walkthroughs/installing-slate

import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

export default class SlateEditor extends React.Component {
  state = {
    value: Value.fromJSON({})
  }

  onChange ({value}) {
    this.setState({ value })
  }

  render() {
    return [
      <Editor
        onChange={this.onChange.bind(this)}
        value={this.state.value}
      />
    ]
  }

}



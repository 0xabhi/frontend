
import './style.styl'

import React from 'react'
import PropTypes from 'prop-types'
import Typist from 'react-typist';


class Inspiration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typing: true,
    }
  }
  typingDoneHandler = () => {
    this.setState({ typing: false }, () => {
      this.setState({ typing: true })
    });
  }
  render() {
    const {
      inspirations,
    } = this.props;
    const {
      typing,
    } = this.state;
    if (!inspirations) {
      return null
    }
    if (inspirations.length <= 0) {
      return null
    }
    return typing ? (
      <Typist
        onTypingDone={this.typingDoneHandler}
        cursor={{ show: false }}
        className="Typist"
      >
        <span>&nbsp;</span>
        {
          inspirations.map(x => (
            <span key={x}>
              <span className="Inspiration">{x}</span>
              <Typist.Backspace count={x.length} delay={2000} speed={10} />
            </span>
          ))
        }
      </Typist>
    ) : null
  }
}

Inspiration.propTypes = {
  inspirations: PropTypes.array,
}

export default Inspiration;



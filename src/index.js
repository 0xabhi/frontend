import 'semantic-ui-css/semantic.min.css';
import "../styles/index.styl";

import React from "react";
import ReactDOM from "react-dom";

import PostAJob from "./components/PostAJob";
import Footer from "./components/Footer";


class App extends React.Component {
  render() {
    return [
      <PostAJob />,
      <Footer />
    ]
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

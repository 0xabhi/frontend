import "semantic-ui-css/semantic.min.css";
import "../styles/index.styl";
import "./config";

import React from "react";
import ReactDOM from "react-dom";
import config from "react-global-configuration";

import PostAJob from "./components/PostAJob";
import Footer from "./components/Footer";
import Crisp from "./components/Crisp.Chat";

if (config.get('crispChat')) {
  Crisp(config.get('crispChat'))
}

class App extends React.Component {
  render() {
    return [
      <PostAJob />,
      <Footer />
    ]
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

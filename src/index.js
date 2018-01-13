import 'semantic-ui-css/semantic.min.css';
import "../styles/index.styl";

import React from "react";
import ReactDOM from "react-dom";

import PostAJob from "./components/PostAJob";
import Footer from "./components/Footer";
import Crisp from "./components/Crisp.Chat";

Crisp('872632eb-fe5f-42b2-8557-b7e5e0cac2b2')

class App extends React.Component {
  render() {
    return [
      <PostAJob />,
      <Footer />
    ]
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

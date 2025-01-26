import React, { Component } from "react";
import Navbar from "./Navbar";
import News from "./News";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 10,
  };

  // Using arrow function to automatically bind "this"
  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              path="/"
              element={<News setProgress={this.setProgress} category="general" />}
            />
            <Route
              path="/business"
              element={<News setProgress={this.setProgress} category="business" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={this.setProgress} category="technology" />}
            />
            <Route
              path="/science"
              element={<News setProgress={this.setProgress} category="science" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={this.setProgress} category="sports" />}
            />
            <Route
              path="/entertainment"
              element={<News setProgress={this.setProgress} category="entertainment" />}
            />
            <Route
              path="/health"
              element={<News setProgress={this.setProgress} category="health" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Dashboard from './Dashboard';
import Tweet from './Tweet'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Tweet />
    )
  }
}

export default connect()(App)
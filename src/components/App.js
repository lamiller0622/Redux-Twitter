import React, { Component, Fragment } from 'react'
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
      <Fragment>
        <LoadingBar />
        <Dashboard />
      </Fragment>
    )
  }
}

export default connect()(App)
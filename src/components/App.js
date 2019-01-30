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
        {this.props.loading ===true
          ? null
          : <Dashboard />}
      </Fragment>
    )
  }
}


function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser ===null
  }
}

export default connect(mapStateToProps)(App)
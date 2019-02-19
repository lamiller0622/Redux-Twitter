import React, { Component, Fragment } from 'react'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Dashboard from './Dashboard';
import Tweet from './Tweet'
import NewTweet from './NewTweet';
import ViewTweet from './ViewTweet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
            <div className='container'>
            <Nav />
            {this.props.loading ===true
              ? null
              : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/newtweet' exact component={NewTweet} />
                <Route path='/tweet/:id' exact component={ViewTweet} />
              </div>}
            </div>
        </Fragment>
      </Router>
    )
  }
}


function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser ===null
  }
}

export default connect(mapStateToProps)(App)
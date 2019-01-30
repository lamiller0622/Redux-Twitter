import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Tweet from './Tweet'

class Dashboard extends Component {
    render () {
        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <Tweet />
            </div>
        )
    }
}

function mapStateToProps ({tweets}) {
    return {tweetIds: Object.keys(tweets)}
}

export default connect(mapStateToProps)(Dashboard)
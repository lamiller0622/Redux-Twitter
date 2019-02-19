import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleLikeToggle } from '../actions/tweets'
import {TiArrowBackOutline} from 'react-icons/ti'
import {TiHeartOutline} from 'react-icons/ti'
import {TiHeartFullOutline} from 'react-icons/ti'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends Component {
    toggleLike = (e) => {
        e.preventDefault()

        const { dispatch, tweet, authedUser } = this.props

        dispatch(handleLikeToggle({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    }
    toParent = (e, id) => {
        e.preventDefault()
        // todo: Redirect to parent Tweet.
        this.props.history.push(`/tweet/${id}`)
    }
    
    render() {
        const { tweet } = this.props

        if (tweet === null) {
            return <p>This Tweet doesnt exist</p>
        }

        const { name, avatar, timestamp, text, hasLiked, likes, replies, id, parent } = tweet

        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img className='avatar' src={avatar} alt={`Avatar of ${name}`}></img>
                <div className='tweet-info'>
                    <div className='tweetauthor'>{name}</div>
                    <div className='timestamp'>{formatDate(timestamp)}</div>
                    {parent && (
                        <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )}
                    <div className='tweettext'>{text}</div>

                </div>
                <div className='tweet-icons'>
                    <TiArrowBackOutline className='tweet-icon' />
                    <span>{replies !== 0 && replies}</span>
                    <button className='heart-button' onClick={this.toggleLike}>
                    {hasLiked === true
                        ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                        : <TiHeartOutline className='tweet-icon'/>}
                    </button>
                    <span>{likes !== 0 && likes}</span>
                </div>
            </Link>
        )
    }
}



function mapStateToProps ({tweets, users, authedUser}, {id}) {
    const tweet= tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingto] : null
    return{
        authedUser,
        tweet: tweet 
            ?formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleLikeToggle } from '../actions/tweets';

class Tweet extends React.Component {
    toggleLike = (authedUser, hasLiked, id) => {
        this.props.dispatch(handleLikeToggle(authedUser, hasLiked, id))
    }
    
    render() {
        const { tweets, authedUser } = this.props

        return (
            <ul>
                {tweets.map((tweet) => (
                    <li key={tweet.id}>
                        <div className='tweet'>
                            <img className='avatar' src={tweet.AuthorAvatar}></img>
                            <div className='tweet-info'>
                                <div className='tweetauthor'>{tweet.Tweetauthor}</div>
                                <div className='timestamp'>{tweet.timestamp}</div>
                                <div className='replying-to'>replying to {tweet.parent}</div>
                                <div className='tweettext'>{tweet.text}</div>
                                <div className='likes'>{tweet.likes} likes</div>
                                <div className='replies'>{tweet.replies} replies</div>
                            </div>
                            <button 
                                className='heart-button'
                                onClick={this.toggleLike(authedUser, tweet.hasLiked, tweet.id, )}
                                style={{backgroundcolor: tweet.hasLiked ? 'pink' : 'none'}}
                            >Like</button>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}



function mapStateToProps ({tweets, users, authedUser}) {
    
    
    return{
        tweets: Object.keys(tweets)
            .map((id) => {
                
                const { text, author, timestamp, likes, replyingto, replies } = tweets[id]
                return {
                    id,
                    text,
                    Tweetauthor: users[author].name,
                    timestamp: formatDate(timestamp),
                    likes: likes.length,
                    AuthorAvatar : users[author].avatarURL,
                    hasLiked: likes.includes(authedUser),
                    parent: !replyingto ? null : {
                        author: replyingto.author,
                        id: replyingto.id,
                    },
                    replies: replies.length
                }
            }),
        
    }
}

export default connect(mapStateToProps)(Tweet)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'

function Tweet ({users, tweets}) {
    return (
        <ul>
            {tweets.map((tweet) => (
                <li className='tweet'>
                    <img className='avatar' src={tweet.AuthorAvatar}></img>
                    <div className='tweet-info'>
                        <div className='tweetauthor'>{tweet.Tweetauthor}</div>
                        <div className='timestamp'>{tweet.timestamp}</div>
                        <div className='tweettext'>{tweet.text}</div>
                        <div className='likes'>{tweet.likes} likes</div>
                        
                    </div>
                </li>
            ))}
        </ul>
    )

}

function mapStateToProps ({tweets, users}) {
    return{
        tweets: Object.keys(tweets)
            .map((id) => {
                const { text, author, timestamp, likes, replyingto, replies } = tweets[id]
                return {
                    text,
                    Tweetauthor: users[author].name,
                    timestamp: formatDate(timestamp),
                    likes: likes.length,
                    AuthorAvatar : users[author].avatarURL,
                    parentTweet: replyingto,
                    replies
                }
            })
    }
}

export default connect(mapStateToProps)(Tweet)
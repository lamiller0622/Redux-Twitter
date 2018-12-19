import { saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_TWEET = 'ADD_TWEET'
export const RECEIVE_TWEET = 'RECEIVE_TWEET'

function addTweet ({ authedUser, id, tweet }) {
    return {
        type: ADD_TWEET,
        authedUser,
        id,
        tweet
    }
}

export function handleAddTweet (tweetdata) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveTweet(tweetdata)
            .then(() => dispatch(addTweet(tweetdata)))
            .then(() => dispatch(hideLoading()))
    }
}

export function receiveTweet (tweets) {
    return {
        type: RECEIVE_TWEET,
        tweets
    }
}
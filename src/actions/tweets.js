import { saveTweet, saveLikeToggle } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_TWEET = 'ADD_TWEET'
export const RECEIVE_TWEET = 'RECEIVE_TWEET'
export const LIKE_TOGGLE = 'LIKE_TOGGLE'

function addTweet (tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

function likeToggle ({authedUser, hasLiked, id}) {
    return {
        type: LIKE_TOGGLE,
        authedUser,
        hasLiked,
        id
    }
}

export function handleAddTweet (text, replyingTo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        })
            .then((text) => dispatch(addTweet(text)))
            .then(() => dispatch(hideLoading()))
    }
}

export function receiveTweet (tweets) {
    return {
        type: RECEIVE_TWEET,
        tweets
    }
}

export function handleLikeToggle ( tweetdata) {
    return (dispatch) => {
        dispatch(likeToggle(tweetdata))
        return saveLikeToggle(tweetdata)
            .catch((e) => {
                dispatch(likeToggle(tweetdata))
                alert('An error occurred. Try again.')
            })
    }
}
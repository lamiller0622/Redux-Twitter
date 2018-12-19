import { RECEIVE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function tweets ( state = {}, action ) {
    switch (action.type) {
        case RECEIVE_TWEET :
            return{
                ...state,
                ...action.tweets,
            }
        case ADD_TWEET :
            return {
                ...state,
                [action.tweet.id]: action.tweet,
            }
        default:
            return state
    }
}
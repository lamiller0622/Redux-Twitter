import { RECEIVE_TWEET, ADD_TWEET, LIKE_TOGGLE } from '../actions/tweets'

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
        case LIKE_TOGGLE :
            return state.map((tweet) => tweet.id !== action.id ? tweet :
                Object.assign({}, tweet, {hasLiked: !tweet.hasLiked})
                )
            
        default:
            return state
    }
}
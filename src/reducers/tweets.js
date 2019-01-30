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
            return {
                ...state,
                [action.id] : {
                    ...state[action.id],
                    likes: action.hasLiked === true
                        ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
                        : state[action.id].likes.concat([action.authedUser])
                }
            }    
        default:
            return state
    }
}
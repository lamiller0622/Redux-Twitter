import { RECEIVE_TWEET, ADD_TWEET, LIKE_TOGGLE } from '../actions/tweets'

export default function tweets ( state = {}, action ) {
    switch (action.type) {
        case RECEIVE_TWEET :
            return{
                ...state,
                ...action.tweets,
            }
        case ADD_TWEET :
            const { tweet } = action

            let replyingTo = {}
            if (tweet.replyingTo !== null) {
              replyingTo = {
                [tweet.replyingTo]: {
                  ...state[tweet.replyingTo],
                  replies: state[tweet.replyingTo].replies.concat([tweet.id])
                }
              }
            }
      
            return {
              ...state,
              [action.tweet.id]: action.tweet,
              ...replyingTo,
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
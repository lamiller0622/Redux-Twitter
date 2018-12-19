import authedUser from './authedUser'
import tweets from './tweets'
import users from './users'
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    authedUser,
    users,
    tweets,
    loadingBar: loadingBarReducer
})
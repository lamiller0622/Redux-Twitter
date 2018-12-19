import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveTweet } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
import { hideLoading, showLoading } from 'react-redux-loading'

const AUTHED_ID = 'lukemiller'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, tweets }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweet(tweets))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}
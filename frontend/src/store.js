import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { postTopReducer } from './reducers/postReducer'

const middleware = [thunk]

const reducer =  combineReducers({
    postTop: postTopReducer
})

const initialState = {}

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
)

export default store
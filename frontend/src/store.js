import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { postTopReducer, postListReducer, singlePostReducer, postCreateReducer, postUpdateReducer, postDeleteReducer, commentsListReducer } from './reducers/postReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducer'

import { serviceListReducer, serviceDeleteReducer, serviceCreateReducer, singleServiceReducer } from './reducers/serviceReducer'

import { contactListReducer, contactDeleteReducer, contactCreateReducer } from './reducers/contactReducer'

import { guideListReducer, singleguideReducer, guideDeleteReducer, guideCreateReducer } from './reducers/guideReducer'

const middleware = [thunk]

const reducer =  combineReducers({
    postTop: postTopReducer,
    postList: postListReducer,
    singlePost: singlePostReducer,
    createPost: postCreateReducer,
    updatePost: postUpdateReducer,
    deletePost: postDeleteReducer,
    listContacts: contactListReducer,
    deleteContact: contactDeleteReducer,
    createContact: contactCreateReducer,
    commentList: commentsListReducer,
    serviceList: serviceListReducer,
    serviceDelete: serviceDeleteReducer,
    serviceCreate: serviceCreateReducer,
    singleService: singleServiceReducer,
    guideList: guideListReducer,
    singleGuide: singleguideReducer,
    guideDelete: guideDeleteReducer,
    guideCreate: guideCreateReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
)

export default store
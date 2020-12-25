import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,
    POST_CREATE_RESET,
    POST_CREATE_FAIL,
    POST_CREATE_SUCCESS,
    POST_CREATE_REQUEST,
    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,
    POST_TOP_REQUEST,
    POST_TOP_SUCCESS,
    POST_TOP_FAIL,
} from '../constants/postConstants'

export const postTopReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_TOP_REQUEST:
      return { loading: true, posts: [] }
    case POST_TOP_SUCCESS:
      return { loading: false, posts: action.payload }
    case POST_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
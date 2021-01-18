import axios from 'axios'
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
    POST_CREATE_FAIL,
    POST_CREATE_SUCCESS,
    POST_CREATE_REQUEST,
    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_TOP_REQUEST,
    POST_TOP_SUCCESS,
    POST_TOP_FAIL,
} from '../constants/postConstants'

import { logout } from './userActions'

export const listAllComments = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: 'COMMENT_LIST_REQUEST' })

    const { data } = await axios.get(`http://localhost:5000/api/posts/comments?pageNumber=${pageNumber}`)

    dispatch({  type: 'COMMENT_LIST_SUCCESS', payload: data })
  } catch (err) {
    dispatch({ type: 'COMMENT_LIST_FAIL', payload: err.response && err.response.data.message ? err.response.data.message : err.message})
  }
}

export const listAllPosts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: POST_LIST_REQUEST, })

        const { data } = await axios.get(`http://localhost:5000/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({ type: POST_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: POST_LIST_FAIL, payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const fetchSinglePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`)

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listTopPosts = () => async (dispatch) => {
    try {
        dispatch({ type: POST_TOP_REQUEST })

        const { data } = await axios.get('http://localhost:5000/api/posts/top')

        dispatch({
            type: POST_TOP_SUCCESS,
            payload: data
        })
    
    } catch (error) {
        dispatch({
            type: POST_TOP_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deletePost = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`http://localhost:5000/api/posts/${id}`, config)
  
      dispatch({
        type: POST_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: POST_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  export const createPost = (title, description, text, imgURL) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`http://localhost:5000/api/posts`, {
        title, description, text, imgURL
      }, config)
  
      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: POST_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const updatePost = (Post) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `http://localhost:5000/api/posts/${Post._id}`,
        Post,
        config
      )
  
      dispatch({
        type: POST_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: POST_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: POST_UPDATE_FAIL,
        payload: message,
      })
    }
  }
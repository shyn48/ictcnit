import axios from 'axios'
import { logout } from './userActions'

export const listAllservices = (pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: 'SERVICE_LIST_REQUEST', })

        const { data } = await axios.get(`http://localhost:5000/api/service?pageNumber=${pageNumber}`)

        dispatch({ type: 'SERVICE_LIST_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'SERVICE_LIST_FAIL', payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const fetchSingleservice = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'SERVICE_DETAILS_REQUEST' })

        const { data } = await axios.get(`http://localhost:5000/api/service/${id}`)

        dispatch({
            type: 'SERVICE_DETAILS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'SERVICE_DETAILS_FAIL',
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteservice = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SERVICE_DELETE_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        data: {
          id
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`http://localhost:5000/api/service`,config)
  
      dispatch({
        type: 'SERVICE_DELETE_SUCCESS',
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
        type: 'SERVICE_DELETE_FAIL',
        payload: message,
      })
    }
  }
  
  export const createservice = (name, text) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SERVICE_CREATE_REQUEST',
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }  

      const { data } = await axios.post(`http://localhost:5000/api/service`, {name,text},config)
  
      dispatch({
        type: 'SERVICE_CREATE_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: 'SERVICE_CREATE_FAIL',
        payload: message,
      })
    }
  }
  
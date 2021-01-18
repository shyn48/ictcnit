import axios from 'axios'
import { logout } from './userActions'

export const listAllcontacts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: 'CONTACT_LIST_REQUEST', })

        const { data } = await axios.get(`http://localhost:5000/api/form/contact?pageNumber=${pageNumber}`)

        dispatch({ type: 'CONTACT_LIST_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'CONTACT_LIST_FAIL', payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const fetchSinglecontact = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'CONTACT_DETAILS_REQUEST' })

        const { data } = await axios.get(`http://localhost:5000/api/form/contact/${id}`)

        dispatch({
            type: 'CONTACT_DETAILS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'CONTACT_DETAILS_FAIL',
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deletecontact = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CONTACT_DELETE_REQUEST',
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
  
      await axios.delete(`http://localhost:5000/api/form/contact`,config)
  
      dispatch({
        type: 'CONTACT_DELETE_SUCCESS',
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
        type: 'CONTACT_DELETE_FAIL',
        payload: message,
      })
    }
  }
  
  export const createcontact = (name, email, text) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CONTACT_CREATE_REQUEST',
      })

      const { data } = await axios.contact(`http://localhost:5000/api/form/contact`, {
        name, email, text
      })
  
      dispatch({
        type: 'CONTACT_CREATE_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: 'CONTACT_CREATE_FAIL',
        payload: message,
      })
    }
  }
  
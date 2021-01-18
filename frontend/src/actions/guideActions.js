import axios from 'axios'
import { logout } from './userActions'

export const listAllguides = (pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: 'GUIDE_LIST_REQUEST', })

        const { data } = await axios.get(`http://localhost:5000/api/helps?pageNumber=${pageNumber}`)
        
        dispatch({ type: 'GUIDE_LIST_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'GUIDE_LIST_FAIL', payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const fetchSingleguide = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'GUIDE_DETAILS_REQUEST' })

        const { data } = await axios.get(`http://localhost:5000/api/helps/${id}`)

        dispatch({
            type: 'GUIDE_DETAILS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'GUIDE_DETAILS_FAIL',
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteguide = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'GUIDE_DELETE_REQUEST',
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
  
      await axios.delete(`http://localhost:5000/api/helps`,config)
  
      dispatch({
        type: 'GUIDE_DELETE_SUCCESS',
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
        type: 'GUIDE_DELETE_FAIL',
        payload: message,
      })
    }
  }
  
  export const createguide = (name, text) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'GUIDE_CREATE_REQUEST',
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }  

      const { data } = await axios.post(`http://localhost:5000/api/helps`, {name,text},config)
  
      dispatch({
        type: 'GUIDE_CREATE_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: 'GUIDE_CREATE_FAIL',
        payload: message,
      })
    }
  }
  

export const serviceListReducer = (state = { services: [] }, action) => {
    switch (action.type) {
      case 'SERVICE_LIST_REQUEST':
        return { loading: true, services: [] }
      case 'SERVICE_LIST_SUCCESS':
        return {
          loading: false,
          services: action.payload.services,
          pages: action.payload.pages,
          page: action.payload.page
        }
      case 'SERVICE_LIST_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const singleServiceReducer = ( state = { service: {} }, action) => {
    switch (action.type) {
      case 'SERVICE_DETAILS_REQUEST':
        return { ...state, loading: true }
      case 'SERVICE_DETAILS_SUCCESS':
        return { loading: false, service: action.payload }
      case 'SERVICE_DETAILS_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const serviceDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SERVICE_DELETE_REQUEST':
        return { loading: true }
      case 'SERVICE_DELETE_SUCCESS':
        return { loading: false, success: true }
      case 'SERVICE_DELETE_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const serviceCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SERVICE_CREATE_REQUEST':
        return { loading: true }
      case 'SERVICE_CREATE_SUCCESS':
        return { loading: false, success: true, service: action.payload }
      case 'SERVICE_CREATE_FAIL':
        return { loading: false, error: action.payload }
      case 'SERVICE_CREATE_RESET':
        return {}
      default:
        return state
    }
  }
  
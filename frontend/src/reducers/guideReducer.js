export const guideListReducer = (state = { guides: [] }, action) => {
    switch (action.type) {
      case 'GUIDE_LIST_REQUEST':
        return { loading: true, guides: [] }
      case 'GUIDE_LIST_SUCCESS':
        console.log(action.payload);
        return {
          loading: false,
          guides: action.payload.helps,
          pages: action.payload.pages,
          page: action.payload.page
        }
      case 'GUIDE_LIST_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const singleguideReducer = ( state = { guide: {} }, action) => {
    switch (action.type) {
      case 'GUIDE_DETAILS_REQUEST':
        return { ...state, loading: true }
      case 'GUIDE_DETAILS_SUCCESS':
        return { loading: false, guide: action.payload }
      case 'GUIDE_DETAILS_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const guideDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case 'GUIDE_DELETE_REQUEST':
        return { loading: true }
      case 'GUIDE_DELETE_SUCCESS':
        return { loading: false, success: true }
      case 'GUIDE_DELETE_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const guideCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case 'GUIDE_CREATE_REQUEST':
        return { loading: true }
      case 'GUIDE_CREATE_SUCCESS':
        return { loading: false, success: true, guide: action.payload }
      case 'GUIDE_CREATE_FAIL':
        return { loading: false, error: action.payload }
      case 'GUIDE_CREATE_RESET':
        return {}
      default:
        return state
    }
  }
  
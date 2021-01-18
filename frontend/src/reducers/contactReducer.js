
export const contactListReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case 'CONTACT_LIST_REQUEST':
      return { loading: true, contacts: [] }
    case 'CONTACT_LIST_SUCCESS':
      return {
        loading: false,
        contacts: action.payload.contacts,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case 'CONTACT_LIST_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contactTopReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case 'CONTACT_TOP_REQUEST':
      return { loading: true, contacts: [] }
    case 'CONTACT_TOP_SUCCESS':
      return { loading: false, contacts: action.payload }
    case 'CONTACT_TOP_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CONTACT_DELETE_REQUEST':
      return { loading: true }
    case 'CONTACT_DELETE_SUCCESS':
      return { loading: false, success: true }
    case 'CONTACT_DELETE_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contactCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CONTACT_CREATE_REQUEST':
      return { loading: true }
    case 'CONTACT_CREATE_SUCCESS':
      return { loading: false, success: true, contact: action.payload }
    case 'CONTACT_CREATE_FAIL':
      return { loading: false, error: action.payload }
    case 'CONTACT_CREATE_RESET':
      return {}
    default:
      return state
  }
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
    createservice,
} from '../../actions/serviceActions'

const EditPostScreen = ({ history, match }) => {
    const [name, setName] = useState('')
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const serviceCreate = useSelector((state) => state.serviceCreate)
    const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      service: createdService,
    } = serviceCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: 'SERVICE_CREATE_RESET' })
    
        if (!userInfo || !userInfo.isAdmin) {
          history.push('/login')
        }
    
        if (successCreate) {
          history.push(`/admin/services/${createdService._id}`)
        } else {
          console.log(successCreate)
        }
      }, [dispatch, history, userInfo, successCreate, createdService])

    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(createservice(name, text))
    }


    return (
        <div>
            <h1>ارسال خدمت</h1>
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                <div className="container has-bootstrap">
                    <form className="has-bootstrap form-horizontal w-50 mx-auto" onSubmit={handlesubmit}>
                        <div className="has-bootstrap form-group row">
                            <div className="has-bootstrap col">
                            <label htmlFor="name" className="has-bootstrap control-label font-weight-bold"
                                >عنوان خدمت</label>
                            <input
                                type="text"
                                className="has-bootstrap form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                placeholder="عنوان را وارد کنید"
                            />
                            </div>
                        </div>

                        <div className="has-bootstrap form-group row">
                            <div className="has-bootstrap col">
                            <label htmlFor="text" className="has-bootstrap control-label font-weight-bold">متن</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows="5"
                                className="has-bootstrap form-control"
                                name="text"
                                id="text"
                                placeholder="متن پست را وارد کنید"
                            >
                            </textarea>
                            </div>
                        </div>

                        <div className="has-bootstrap form-group row">
                            <div className="has-bootstrap col">
                            <button onSubmit={handlesubmit} type="submit" className="has-bootstrap btn btn-danger">ارسال</button>
                            </div>
                        </div>
                        </form>
                </div>
        </div>         
    )
}

export default EditPostScreen

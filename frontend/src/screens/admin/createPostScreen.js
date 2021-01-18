import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
    createPost,
} from '../../actions/postActions'

import { POST_CREATE_RESET } from '../../constants/postConstants'

const EditPostScreen = ({ history, match }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [text, setText] = useState('')
    const [imgURL, setImgURL] = useState('/img/ict2.jpg')

    const dispatch = useDispatch()

    const postCreate = useSelector((state) => state.createPost)
    const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      post: createdPost,
    } = postCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: POST_CREATE_RESET })
    
        if (!userInfo || !userInfo.isAdmin) {
          history.push('/login')
        }
    
        if (successCreate) {
          history.push(`/admin/posts/${createdPost._id}`)
        } else {
          console.log(successCreate)
        }
      }, [
        dispatch,
        history,
        userInfo,
        successCreate,
        createdPost,
      ])

    const setImage = () => {

    }

    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(createPost(title, description, text, imgURL))
    }


    return (
        <div>
            <h1>ارسال پست</h1>
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                <div className="container has-bootstrap">
                    <form className="has-bootstrap form-horizontal w-50 mx-auto" onSubmit={handlesubmit}>
                        <div className="has-bootstrap form-group row">
                            <div className="has-bootstrap col">
                            <label htmlFor="title" className="has-bootstrap control-label font-weight-bold"
                                >عنوان پست</label>
                            <input
                                type="text"
                                className="has-bootstrap form-control"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                id="title"
                                placeholder="عنوان را وارد کنید"
                            />
                            </div>
                        </div>

                        <div className="has-bootstrap form-group row">
                            <div className="has-bootstrap col">
                            <label htmlFor="descprition" className="has-bootstrap control-label font-weight-bold">توضیحات</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="5"
                                className="has-bootstrap form-control"
                                name="descprition"
                                id="descprition"
                                placeholder="توضیحات پست را وارد کنید"
                            >
                            </textarea>
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
                            <label htmlFor="images" className="has-bootstrap control-label font-weight-bold"
                                >تصویر پست</label >
                            <img className="img-fluid has-bootstrap" alt="post-img"></img>
                            <input
                                type="file"
                                className="has-bootstrap form-control mt-3"
                                onChange={setImage}
                                name="images"
                                id="images"
                                placeholder="تصویر مقاله را وارد کنید"
                            />
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

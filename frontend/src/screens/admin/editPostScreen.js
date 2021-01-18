import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSinglePost, updatePost } from '../../actions/postActions'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { POST_UPDATE_RESET } from '../../constants/postConstants'

const EditPostScreen = ({ history, match }) => {
    const postId = match.params.post

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [text, setText] = useState('')
    const [imgURL, setImgURL] = useState('/img/ict2.jpg')

    const dispatch = useDispatch()

    const singlePost = useSelector((state) => state.singlePost)
    const { loading, error, post } = singlePost
    
    useEffect(() => {
        dispatch(fetchSinglePost(match.params.post))
    }, [history, dispatch, match])

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setDescription(post.description)
            setText(post.text)
            setImgURL(post.imgURL)
        }
    }, [post])

    const postUpdate = useSelector((state) => state.updatePost)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = postUpdate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: POST_UPDATE_RESET })
    
        if (!userInfo || !userInfo.isAdmin) {
          history.push('/login')
        }
    
        if (successUpdate) {
          history.push(`/admin/posts`)
        } else {
          console.log(successUpdate)
        }
      }, [dispatch, history, userInfo, successUpdate])

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(updatePost({
            _id: postId,
            title,
            description,
            text,
            imgURL
        }))
    }


    return (
        <div>
            <h1>ویرایش پست</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            { loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="error">{error}</Message>
            ): post ? (
                <div className="container has-bootstrap">
                    <form className="has-bootstrap form-horizontal w-50 mx-auto" onSubmit={handleSubmit}>

                        <div className="has-bootstrap form-group row">
                            <div className="has-bootstrap col">
                            <label htmlFor="title" className="has-bootstrap control-label font-weight-bold"
                                >عنوان پست</label>
                            <input
                                type="text"
                                className="has-bootstrap form-control"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                id="title"
                                placeholder="عنوان را وارد کنید"
                                value={title}
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
                                rows="5"
                                className="has-bootstrap form-control"
                                name="text"
                                id="text"
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                                placeholder="متن پست را وارد کنید"
                            >
                            </textarea>
                            </div>
                        </div>
                        <div className="has-bootstrap form-group row">
                            <div className="has-bootstrap col">
                            <label htmlFor="images" className="has-bootstrap control-label font-weight-bold"
                                >تصویر پست</label >
                            <img src={imgURL} className="img-fluid has-bootstrap" alt="post-img"></img>
                            <input
                                type="file"
                                className="has-bootstrap form-control mt-3"
                                name="images"
                                id="images"
                                placeholder="تصویر مقاله را وارد کنید"
                            />
                            </div>
                        </div>

                        <div className="has-bootstrap form-group row">
                            <div className="has-bootstrap col">
                            <button type="submit" className="has-bootstrap btn btn-danger">ویرایش</button>
                            </div>
                        </div>
                        </form>
                </div>
            ): <Loader>Loading...</Loader>
            }
        </div>         
    )
}

export default EditPostScreen

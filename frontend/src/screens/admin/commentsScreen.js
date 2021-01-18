import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import axios from 'axios'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {
    listAllComments
} from '../../actions/postActions'

const CommentScreen = ({ match, history }) => {
    const pageNumber = match.params.page || 1

    const dispatch = useDispatch()

    const commentList = useSelector((state) => state.commentList)
    const { loading, error, comments, page, pages } = commentList

    
    useEffect(() => {
        dispatch(listAllComments(pageNumber))
    }, [history, dispatch, pageNumber])

    const approveComment = async (id) => {
        const result = await axios.post('http://localhost:5000/api/posts/comment/approve', {
            id
        })
        dispatch(listAllComments(pageNumber))
        console.log(result)
    }

    const deleteComment = async (id) => {
        const result = await axios.post('http://localhost:5000/api/posts/comment/delete', {
            id
        })
        dispatch(listAllComments(pageNumber))
        console.log(result)
    }

    return (
        <div>
        <h1>نظرات </h1>

        <div>
            { loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="error">{error}</Message>
            ):    
            <>
                <table style={{marginBottom: '10px'}} className="post-table">
                    <thead>
                        <tr>
                            <th>پست مرتبط</th>
                            <th>فرستنده نظر</th>
                            <th>متن نظر</th>
                            <th>تنظیمات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map(comment => 
                            <tr key={comment._id}>
                                <td><Link to={`/news/${comment.post}`}>{comment.post.title}</Link></td>
                                <td>{comment.user ? comment.user.name : comment.unRegsiteredUserName}</td>
                                <td>
                                    {comment.text}
                                </td>
                                <td>
                                <form>
                                    <div>
                                    <button type='button' onClick={() => approveComment(comment._id)} className="green">تایید</button>
                                    <button type='button' onClick={() => deleteComment(comment._id)} >حذف</button>
                                    </div>
                                </form>   
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paginate admin={true} pages={pages} page={page}/>
                </div>
            </>
            }
        </div>
    </div>
    )
}

export default CommentScreen

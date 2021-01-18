import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {
    listAllPosts
} from '../../actions/postActions'

const PostScreen = ({ match, history }) => {
    const pageNumber = match.params.page || 1
    const keyword = match.params.keyword || ''

    const dispatch = useDispatch()

    const postList = useSelector((state) => state.postList)
    const { loading, error, posts, page, pages } = postList

    useEffect(() => {
        dispatch(listAllPosts(keyword, pageNumber))
    }, [history, dispatch, pageNumber, keyword])

    return (
        <div>
            <h1>اخبار </h1>

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
                                <th>عنوان خبر</th>
                                <th>تنظیمات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => 
                                <tr key={post._id}>
                                    <td><Link to={`/news/${post._id}`}>{post.title}</Link></td>
                                    <td>
                                    <form
                                    
                                        action="/admin/posts/delete/<%=post._id %>"
                                        method="post"
                                    >
                                        <div>
                                        <Link
                                            to={`/admin/posts/edit/${post._id}`}
                                        
                                            >ویرایش</Link>
                                        <button type="submit">حذف</button>
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

export default PostScreen

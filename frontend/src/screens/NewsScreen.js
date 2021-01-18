import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'jalali-moment'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
    listAllPosts
} from '../actions/postActions'

const NewsScreen = ({ history, match }) => {
    const pageNumber = match.params.page || 1
    const keyword = match.params.keyword || ''

    const dispatch = useDispatch()

    const postList = useSelector((state) => state.postList)
    const { loading, error, posts, page, pages } = postList

    useEffect(() => {
        dispatch(listAllPosts(keyword, pageNumber))
    }, [history, dispatch, pageNumber, keyword])

    return (
        <>
        <div className="row bg-dark" style={{color: 'white', padding: '30px'}}>
            <h1 className="light" style={{marginLeft: 'auto', marginRight: '50px'}}>آخرین <span className="color-secondary">اخبار</span></h1>
        </div>
        <div className="posts-container">
            { loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="error">{error}</Message>
            ):     
                posts.map((post) =>(
                <div key={post.id} className="post">
                    <img src={post.imgURL} alt="postImage"/>
                    <div className="text">
                        <span>{post.category} - {moment(post.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span>
                        <h3>{post.title}</h3>
                        <p>{post.description}...</p>
                    </div>
                    <Link className="btn post-btn" to={`/news/${post.id}`}>مشاهده متن کامل خبر</Link>
                </div>
                ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paginate pages={pages} page={page}/>
        </div>
    </>
    )
}

export default NewsScreen

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSinglePost } from '../actions/postActions'
import moment from 'jalali-moment'
import validateForm from '../helpers/formValidator'

import Loader from '../components/Loader'
import Message from '../components/Message'

const SinglePost = ({ history, match }) => {
    const firstRender = useRef(true)


    const dispatch = useDispatch()
    const [isActive, setActive] = useState(false)
    const [isFinished, setFinished] = useState(false)
    const [isDone, setDone] = useState(false)

    const [formValid, setFormValid] = useState(false)
    const [errors, setErrors] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        const nameObj = { name: 'name', value: name }
        const emailObj = { name: 'email', value: email }
        const textBox = { name: 'text', value: text}

        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const result = validateForm([nameObj, textBox], undefined, undefined, emailObj)

        if (result.pass) {
            setFormValid(true)
            setErrors([])
        } else {
            setFormValid(false)
            setErrors(result.errors)
        }

    }, [name, email, text])

    const handleClick = async () => {
        if (formValid) {
            // eslint-disable-next-line no-unused-vars
            const { data } = await axios.post(`http://localhost:5000/api/posts/${post._id}/comment`, {
                unRegsiteredUserName : name,
                unRegsiteredEmail: email,
                text
            })

            setActive(true)
            setTimeout(() => {
                setFinished(true)
            }, 1700)
            setTimeout(() => {
                setDone(true)
            }, 1600)

            setTimeout(() => {
                setText('')
                setName('')
                setEmail('')
                setErrors([])
                setActive(false)
                setFinished(false)
                setDone(false)
                setFormValid(false)
                dispatch(fetchSinglePost(match.params.id))
            }, 3300)

        } else if (errors.length <= 0) {
            setErrors([{ for: "form", error: 'فرم را تکمیل کنید' }])
        }
    }

    const singlePost = useSelector((state) => state.singlePost)
    const { loading, error, post } = singlePost
    
    useEffect(() => {
        dispatch(fetchSinglePost(match.params.id))
    }, [history, dispatch, match])

    return (
        <div>
            { loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="error">{error}</Message>
            ): post.author ? (
                
                <>
                <div className="post-header bg-dark" style={{color: 'white', padding: '30px'}}>
                <h1 className="light" style={{marginLeft: 'auto', marginRight: '50px'}}>{post.title}</h1>
                <div className="details">
                <small>{post.author.name} توسط </small>
                <small>نوشته شده در {moment(post.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</small>
                </div>
            </div>
            <div className="single-post"> 
                <img src={post.imgURL} alt="postimg"></img>
                <p>{post.text}</p>
            </div>
            <div className="comment-form">
                <form className="contact-form">
                    <h2>نظر خود را با ما به اشتراک بگذارید</h2>
                    <label htmlFor="name">نام کامل</label>
                    <input onChange={(e) => setName(e.target.value)} name="name" value={name} type="text" placeholder="نام کامل خود را وارد کنید"></input>
                
                    {errors.map((error, i) => {
                        if (error.for === 'name'){
                            return (
                                <small key={i} className="error visible">{error.error}</small>
                            )
                        } else {
                            return <small key={i}></small>
                        }
                    })}      

                    <label htmlFor="email">ایمیل</label>
                    <input className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setEmail(e.target.value)} value={email} name="email" type="email" placeholder="ایمیل خود را وارد کنید"></input>

                    {errors.map((error, i) => {
                        if (error.for === 'email'){
                            return (
                                <small key={i} className="error visible">{error.error}</small>
                            )
                        } else {
                            return <small key={i}></small>
                        }
                    })}      

                    <label htmlFor="text">نظر شما </label>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} style={{resize: 'none', padding: '10px'}} name="text" rows="4" cols="50"></textarea>

                    {errors.map((error, i) => {
                        if (error.for === 'text'){
                            return (
                                <small key={i} style={{marginTop: '10px'}} className="error visible">{error.error}</small>
                            )
                        } else {
                            return <small key={i}></small>
                        }
                    })}      


                    <button className={`send ${isActive ? 'active' : ''} ${isFinished ? 'finished' : ''}`} type="button" onClick={handleClick}>
                        <div className={`text ${isActive ? 'active' : ''}`}>ارسال</div>
                        <div className={`loader ${isActive ? 'active' : ''}`}></div>
                        <div className={`done ${isDone ? 'active' : ''}`}>نظر شما ارسال شد</div>
                    </button>
                </form>
            </div>
            <div className="comments">
                    <h1>نظرات</h1>
                    {post.comments && post.comments.map(comment => (
                        <div key={comment._id} className="comment">
                            <div className="user-mini-profile">
                                <img className="user-profile-pic" src="http://up.vbiran.ir/uploads/2783160899037219810_image.png" alt="user profile"></img>
                                <p className="user-name">
                                    {comment.user ? comment.user.name : comment.unRegsiteredUserName ? comment.unRegsiteredUserName : 'کاربر ناشناس'}
                                </p>
                                <span>{moment(comment.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span>
                            </div>

                            <div className="comment-text">{comment.text}</div>
                        </div>
                    ))}
                    {post.comments.length <= 0 && <center style={{textAlign: 'center', color: '#777'}}>جای نظر شما به شدت خالیست :(</center>}
            </div>
            </>
            ) : <Loader>Loading...</Loader>
            }  
        </div>
    )
}

export default SinglePost

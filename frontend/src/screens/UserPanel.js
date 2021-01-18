/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import validateForm from '../helpers/formValidator'

const UserPanel = ({ location, history }) => {
    const [isActive, setActive] = useState(false)
    const [isFinished, setFinished] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const [formValid, setFormValid] = useState(false)
    const [errors, setErrors] = useState([])

    const firstRender = useRef(true)

    useEffect(() => {
        const emailObj = { name: 'email', value: email }
        const passwordObj = { name: 'password', value: password }
        const confirmPasswordObj = { name: 'confirmPassword', value: confirmPassword }
        const nameObj = { name: 'name', value: name }

        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const result = validateForm([nameObj], passwordObj, confirmPasswordObj, emailObj)

        if (result.pass) {
            setFormValid(true)
            setErrors([])
        } else {
            setFormValid(false)
            setErrors(result.errors)
        }

    }, [name ,email, password, confirmPassword])

  
    const dispatch = useDispatch()
  
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      } else {
        if (!user || !user.name || success) {
          dispatch({ type: USER_UPDATE_PROFILE_RESET })
          dispatch(getUserDetails('profile'))
        } else {
          setName(user.name)
          setEmail(user.email)
        }
      }
    }, [dispatch, history, userInfo, user, success])

    const handleClick = async () => {
        if (formValid) {
            try {
                dispatch(updateUserProfile({ id: user._id, name, email, password }))
            } catch (error) {
                return setErrors([{ for: 'form', error: error.message }]);
            }

        } else if (errors.length <= 0) {
            setErrors([{ for: "form", error: 'فرم را تکمیل کنید' }])
        }
    }

    return (
        <>
        <div className="row bg-dark" style={{color: 'white', padding: '30px'}}>
            <h1 className="light" style={{marginLeft: 'auto', marginRight: '50px'}}><span className="color-secondary">پنل </span>کاربری</h1>
        </div>
        <div className="panel">
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>پروفایل شما آپدیت شد</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                <Message variant='danger'>{error}</Message>
                ) : (
                    <div className="user-update-form">
                        <form autoComplete="off" className="contact-form border-secondary">  
                            {loading && <Loader />}
                            <label htmlFor="name">نام</label>
                            <input autoComplete="off" className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setName(e.target.value)} name="name" value={name} type="name" placeholder="نام خود را وارد کنید"></input>

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
                            <input autoComplete="off" className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setEmail(e.target.value)} name="email" value={email} type="email" placeholder="ایمیل خود را وارد کنید"></input>

                            {errors.map((error, i) => {
                                if (error.for === 'email'){
                                    return (
                                        <small key={i} className="error visible">{error.error}</small>
                                    )
                                } else {
                                    return <small key={i}></small>
                                }
                            })}      

                            <label htmlFor="password">پسورد</label>
                            <input autoComplete="new-password" type='password' value={password} className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="پسورد خود را وارد کنید"></input>

                            {errors.map((error, i) => {
                                if (error.for === 'password'){
                                    return (
                                        <small key={i} className="error visible">{error.error}</small>
                                    )
                                } else {
                                    return <small key={i}></small>
                                }
                            })}

                            <label htmlFor="password2">تایید پسورد</label>
                            <input autoComplete="new-password" type='password' value={confirmPassword} className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setConfirmPassword(e.target.value)} name="password" placeholder="پسورد خود را دوباره وارد کنید"></input>

                            {errors.map((error, i) => {
                                if (error.for === 'confirmPassword'){
                                    return (
                                        <small key={i} className="error visible">{error.error}</small>
                                    )
                                } else {
                                    return <small key={i}></small>
                                }
                            })}           

                            <button className={`send ${isActive ? 'active' : ''} ${isFinished ? 'finished' : ''}`} type="button" onClick={handleClick}>
                                <div className={`text ${isActive ? 'active' : ''}`}>بروزرسانی پروفایل</div>
                            </button>

                            {errors.map((error, i) => {
                                if (error.for === 'form'){
                                    return (
                                        <small key={i}  style={{marginTop: '10px'}} className="error visible">{error.error}</small>
                                    )
                                } else {
                                    return <small key={i}></small>
                                }
                            })}    

                            {error && <Message variant='danger'>{error}</Message>}
                    </form>
                </div>
                )
                }
        </div>
        </>
    )
}

export default UserPanel

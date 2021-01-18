/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import validateForm from '../helpers/formValidator'

const LoginScreen = ({ location, history }) => {
    const [isActive, setActive] = useState(false)
    const [isFinished, setFinished] = useState(false)

    const [formValid, setFormValid] = useState(false)
    const [errors, setErrors] = useState([])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const firstRender = useRef(true)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, loading, error } = userLogin

     const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    useEffect(() => {
        const emailObj = { name: 'email', value: email }
        const passwordObj = { name: 'password', value: password }

        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const result = validateForm([emailObj], passwordObj, undefined, emailObj)

        if (result.pass) {
            setFormValid(true)
            setErrors([])
        } else {
            setFormValid(false)
            setErrors(result.errors)
        }

    }, [email, password])

    const handleClick = async () => {
        if (formValid) {
            try {
                dispatch(login(email, password))
            } catch (error) {
                console.log(error);
                return setErrors([{ for: 'form', error: error.message }]);
            }

        } else if (errors.length <= 0) {
            setErrors([{ for: "form", error: 'فرم را تکمیل کنید' }])
        }
    }

    return (
        <>
            <div className="row bg-dark" style={{color: 'white', padding: '30px'}}>
                    <h1 className="light" style={{marginLeft: 'auto', marginRight: '50px'}}>وارد <span className="color-secondary"> سایت </span>شوید</h1>
            </div>
            <div className="col login-page">
                <form className="contact-form">  
                    {loading && <Loader />}
                    <label htmlFor="email">ایمیل</label>
                    <input className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setEmail(e.target.value)} name="email" value={email} type="email" placeholder="ایمیل خود را وارد کنید"></input>

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
                    <input type='password' value={password} className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="پسورد خود را وارد کنید"></input>

                    {errors.map((error, i) => {
                        if (error.for === 'password'){
                            return (
                                <small key={i} className="error visible">{error.error}</small>
                            )
                        } else {
                            return <small key={i}></small>
                        }
                    })}      

                    <button className={`send ${isActive ? 'active' : ''} ${isFinished ? 'finished' : ''}`} type="button" onClick={handleClick}>
                        <div className={`text ${isActive ? 'active' : ''}`}>لاگین</div>
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
        </>
    )
}

export default LoginScreen

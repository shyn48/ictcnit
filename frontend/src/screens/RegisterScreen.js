/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import validateForm from '../helpers/formValidator'


const RegisterScreen = ({ location, history }) => {
    const [isActive, setActive] = useState(false)
    const [isFinished, setFinished] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [formValid, setFormValid] = useState(false)
    const [errors, setErrors] = useState([])

    const firstRender = useRef(true)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

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

    const handleClick = async () => {
        if (formValid) {
            try {
                dispatch(register(name ,email, password))
            } catch (error) {
                return setErrors([{ for: 'form', error: error.message }]);
            }

        } else if (errors.length <= 0) {
            setErrors([{ for: "form", error: 'فرم را تکمیل کنید' }])
        }
    }

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
      }, [history, userInfo, redirect])    

    return (
        <>
             <div className="row bg-dark" style={{color: 'white', padding: '30px'}}>
                    <h1 className="light" style={{marginLeft: 'auto', marginRight: '50px'}}>وارد <span className="color-secondary"> سایت </span>شوید</h1>
            </div>
            <div className="col login-page">
                <form className="contact-form">  
                    {loading && <Loader />}
                    <label htmlFor="name">نام</label>
                    <input className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setName(e.target.value)} name="name" value={name} type="name" placeholder="نام خود را وارد کنید"></input>

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

                     <label htmlFor="password2">تایید پسورد</label>
                    <input type='password' value={confirmPassword} className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setConfirmPassword(e.target.value)} name="password" placeholder="پسورد خود را دوباره وارد کنید"></input>

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
                        <div className={`text ${isActive ? 'active' : ''}`}>ثبت نام</div>
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

export default RegisterScreen

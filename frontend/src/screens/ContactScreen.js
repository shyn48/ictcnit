/* eslint-disable array-callback-return */
import React, { useState, useRef, useEffect } from 'react'
import validateForm from '../helpers/formValidator'
import axios from 'axios'

const ContactScreen = () => {
    const [isActive, setActive] = useState(false)
    const [isFinished, setFinished] = useState(false)
    const [isDone, setDone] = useState(false)

    const [formValid, setFormValid] = useState(false)
    const [errors, setErrors] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')

    const firstRender = useRef(true)

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
            try {
                const { data } = await axios.post('http://localhost:5000/api/form/contact', {
                    name,
                    email,
                    text
                })
                console.log(data);
            } catch (error) {
                return setErrors([{ for: 'form', error: error.message }]);
            }

            setActive(true)
            setTimeout(() => {
                setFinished(true)
            }, 1700)
            setTimeout(() => {
                setDone(true)
            }, 1600)

        } else {
            setErrors([{ for: "form", error: 'فرم را تکمیل کنید' }])
        }
    }


    return (
        <>
        <div className="row bg-dark" style={{color: 'white', padding: '30px'}}>
            <h1 className="light" style={{marginLeft: 'auto', marginRight: '50px'}}>ارتباط <span className="color-secondary">با ما</span></h1>
        </div>
        <div className="row" style={{padding: '50px'}}>
            <div className="map">
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12818.83390504784!2d52.6805769!3d36.5611415!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x381087fd25f45508!2sBabol%20Noshirvani%20University%20of%20Technology%20(BUT)!5e0!3m2!1sen!2s!4v1609060997645!5m2!1sen!2s" width="600" height="450" frameBorder="0" style={{border: '5px solid white'}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            </div>
            <div className="contact-details">
                <h1 className="light">اطلاعات تماس</h1>
                <ul>
                    <li>
                    <i className="fas fa-map-pin"></i>آدرس: مازندران، بابل، خیابان شریعتی، دانشگاه صنعتی نوشیروانی بابل
                    </li>
                    <li>
                    <i className="fas fa-phone"></i>تلفن تماس: 011442123456
                    </li>
                    <li>
                    <i className="fas fa-at"></i>ایمیل: info@nit.edu 
                    </li>
                    <li>
                    <i className="fas fa-envelope"></i>کدپستی: 123456789
                    </li>
                </ul>
            </div>
        </div>
        <h2 style={{ textAlign: 'center'}} className="light">انتقادات، پیشنهادات و نظر خود را برای ما ارسال کنید</h2>
        <div className="row">
        <form style={{padding: '20px', marginBottom: '10px'}} className="contact-form">
                <label htmlFor="name">نام کامل</label>
                <input onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="نام کامل خود را وارد کنید"></input>
            
                 {errors.map((error, i) => {
                    if (error.for === 'name'){
                        return (
                            <small  key={i} className="error visible">{error.error}</small>
                        )
                    } else {
                        return <small key={i}></small>
                    }
                })}         

                <label htmlFor="email">ایمیل</label>
                <input className={`${errors.map > 0 ? 'input-error' : ''} ${formValid ? 'valid' : ''}`} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="ایمیل خود را وارد کنید"></input>

                {errors.map((error, i) => {
                    if (error.for === 'email'){
                        return (
                            <small key={i}  className="error visible">{error.error}</small>
                        )
                    } else {
                        return <small key={i}></small>
                    }
                })}      

                <label htmlFor="text">توضیحات</label>


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

                {errors.map((error, i) => {
                    if (error.for === 'form'){
                        return (
                            <small key={i}  style={{marginTop: '10px'}} className="error visible">{error.error}</small>
                        )
                    } else {
                        return <small key={i}></small>
                    }
                })}    
            </form>
        </div>
        </>
    )
}

export default ContactScreen

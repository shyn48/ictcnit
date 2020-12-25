import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import validateForm from '../helpers/formValidator'

const CollaborationScreen = () => {
    //TODO: 
   //*FORM VALIDATION
    const [isActive, setActive] = useState(false)
    const [isFinished, setFinished] = useState(false)
    const [isDone, setDone] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')

    const firstRender = useRef(true)

    useEffect(() => {
        const nameObj = { name: 'name', value: name }
        const emailObj = { name: 'email', value: email }
        const ageObj = { name: 'age', value: age }

        if (firstRender.current) {
            firstRender.current = false
            return
        }
        console.log(validateForm([nameObj, emailObj, ageObj], undefined, undefined, emailObj))

    }, [name, email, age])

    const handleClick = async () => {
        axios.post()

        setActive(true)
        setTimeout(() => {
            setFinished(true)
        }, 1700)
        setTimeout(() => {
            setDone(true)
        }, 1600)
    }

    return (
        <>
        <div className="row bg-dark" style={{color: 'white', padding: '30px'}}>
                <h1 className="light" style={{marginLeft: 'auto', marginRight: '50px'}}>ارسال درخواست <span className="color-secondary">همکاری</span></h1>
        </div>
        <div style={{padding: '50px'}}>
            <div className="contact">
            <form className="contact-form">
                <label for="name">نام کامل</label>
                <input onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="نام کامل خود را وارد کنید"></input>
                <label for="age">سن</label>
                <input onChange={(e) => setAge(e.target.value)} name="age" type="number" placeholder="سن خود را وارد کنید"></input>
                <label for="email">ایمیل</label>
                <input onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="ایمیل خود را وارد کنید"></input>
                <label for="resume">فایل رزومه</label>
                <input name="resumeFile" type="file" placeholder="رزومه خود را آپلود کنید"></input>
                <label for="text">توضیحات اضافه</label>
                <textarea style={{resize: 'none', padding: '10px'}} name="text" rows="4" cols="50"></textarea>
                <button className={`send ${isActive ? 'active' : ''} ${isFinished ? 'finished' : ''}`} type="button" onClick={handleClick}>
                    <div className={`text ${isActive ? 'active' : ''}`}>ارسال</div>
                    <div className={`loader ${isActive ? 'active' : ''}`}></div>
                    <div className={`done ${isDone ? 'active' : ''}`}>درخواست شما ارسال شد</div>
                </button>
            </form>

            <div className="light w-50" style={{textAlign: 'center', color: 'white'}}>
                <h3 className="light" style={{marginBottom: '10px'}}>در صورت تمایل به همکاری با مرکز فناوری اطلاعات و ارتباطات دانشگاه نوشیروانی بابل فرم زیر را پر کرده و در صورت واجد شرایط بودن با شما تماس گرفته خواهد شد</h3>
                <img src="/img/collab.jpg" alt="collaboration"></img>
            </div>
            </div>
        </div>
        </>
    )
}

export default CollaborationScreen

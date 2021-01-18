import React, { useState, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CountUp from '../components/CountUp'
import Slider from '../components/Slider'
import Status from '../components/Status'
import PostSlider from '../components/PostSlider'
import { listTopPosts } from '../actions/postActions'
import Message from '../components/Message'

const HomeScreen = () => {
    //send request to get realtime data everytime? memoize to not waste resources?
    const [scroll, setScroll] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)

    const statsEl = useRef(null)

    let slidesPerView = 3;

    if (width <= 950) {
        slidesPerView = 2;
    }

    if (width <= 800) {
        slidesPerView = 1;
    }

    const isInViewport = (offset = 0) => {
        if (!statsEl.current) return false;
        const top = statsEl.current.getBoundingClientRect().top;
        return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
    }

    const dispatch = useDispatch()

    const postList = useSelector((state) => state.postTop)

    const { loading, error, posts } = postList

    useEffect(() => {
        dispatch(listTopPosts())
    }, [dispatch])

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(isInViewport()) {
                setScroll(true)
            }
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    }, [])

    //install html-to-react to make use of ckeditor
  
    //change to fetch slides from backend rather than making it static
    const slides = [
        {
            title: 'وبسایت جدید',
            text: 'بازسازی وبسایت مرکز فناوری اطلاعات و ارتباطات دانشگاه نوشیروانی بابل با استفاده از تکنولوژی‌های مدرن وب',
            button: 'مشاهده متن کامل مطلب',
            img: '/img/ict4.jpg',
            alt: 'ict'
        },
        {
            title: 'سرورهای تقویت شده',
            text: 'استفاده از سرورهای جدید برای تقویت عملکرد تمامی سامانه‌های دانشگاه',
            button: 'مشاهده متن کامل مطلب',
            img: '/img/ict1.jpg',
            alt: 'ict'
        },
        {
            title: 'امکانات جدید وبسایت',
            text: 'پیاده‌سازی امکانات جدید به وبسایت برای سهولت کار کاربران',
            button: 'مشاهده متن کامل مطلب',
            img: '/img/ict3.jpg',
            alt: 'ict'
        }
    ]

    return (
        <div>
            <Slider numSlides={3} slides={slides} />
            <div style={{margin: '20px 7px', padding: '30px'}} className="row">
                <Status/>

                <div className="col-half welcome" style={{paddingTop: '40px'}}>
                    <h1 className="light"> به مرکز <span className="color-primary">فناوری اطلاعات و ارتباطات </span> خوش آمدید</h1>
                    <p>ارائه خدمات و راهنمایی لازم برای استفاده از تمامی خدمات مجازی سامانه‌های دانشگاه در این وبسایت در کمترین زمان ممکن برای استادان و دانشجویان محترم میسر است. </p>
                    <div className="services-icon">
                        <ul>
                            <li>    
                                <span className="circle-icon-holder bg-primary big"><i className="fas fa-info-circle"></i></span>
                                <p>و بسیاری از خدمات دیگر...</p>
                            </li>
                            <li>
                                <span className="circle-icon-holder bg-primary big"><i className="fas fa-newspaper"></i></span>
                                <p>پوشش جدیدترین اخبار دانشگاه، ایران و جهان</p>
                            </li>
                            <li>
                                <span className="circle-icon-holder bg-primary big"><i className="fas fa-book"></i></span>
                                <p>ارائه راهنمای استفاده از سامانه‌های مختلف دانشگاه</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row bg-cover" style={{padding: '30px',backgroundImage: `url(${window.location.origin}/img/server1.jpg)`}} >
                <div className="global-overlay"></div>
                <img src="/img/server.png" alt="server imge" className="server-img" />
                <div ref={statsEl} className="stats" style={{padding: '30px'}}>
                    <div className="stat">
                        <i className="fas fa-user-friends"></i>
                        <p className="big-text">
                            { scroll ? (
                                <CountUp>2</CountUp>
                            ) : 0 }
                        </p>
                        <p className="light stat-text">تعداد کاربران ثبت  نام شده</p>
                    </div>
                    <div className="stat">
                        <i className="fas fa-signal"></i>
                        <p className="big-text">
                            { scroll ? (
                                <CountUp>1</CountUp>
                            ) : 0 }
                        </p>
                        <p className="light stat-text">تعداد کاربران آنلاین</p>
                    </div>
                    <div className="stat">
                        <i className="fas fa-code"></i>
                        <p className="big-text">
                            { scroll ? (
                                <CountUp>3000</CountUp>
                            ) : 0 }
                        </p>
                        <p className="light stat-text">تعداد خط کد نوشته شده در این وبسایت</p>
                    </div>
                </div>
            </div>
            <div className="posts-section">
                    <h1 className="light">آخرین اخبار</h1>
                    { loading ? (
                        <span>Loading...</span>
                    ) : error ? (
                        <Message>{error}</Message>
                    ) : (
                        <>
                        <p className="light">جدیدترین اخبار دانشگاه، ایران و جهان را اینجا بخوانید</p>
                        <PostSlider slidesPerView={slidesPerView} posts={posts} />
                        <Link to="/news" className="btn">آرشیو اخبار</Link>
                        </>
                    )
                    }
                </div>         
        </div>
    )
}

export default HomeScreen

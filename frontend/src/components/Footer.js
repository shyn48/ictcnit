import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return(
        <footer style={{backgroundImage: `url(${window.location.origin}/img/uni2.jpg)`}}>
            <div className="footer-overlay">
                <div className="big-footer">
                <div>
                    <img src="/img/nit.png" alt="nit logo"/>
                    <h4>مرکز فناوری اطلاعات و ارتباطات دانشگاه نوشیروانی بابل</h4>
                    <p>
                    <i className="fas fa-phone"></i> 011 12345678 
                    </p>
                    <p>
                    <i className="fas fa-envelope"></i> ictc@nit.edu 
                    </p>
                </div>

                <div>
                    <h3>لینک های مفید</h3>
                    <ul>
                        <li>
                            <Link to="/">صفحه اصلی</Link>
                        </li>

                        <li>
                            <Link to="/news">اخبار</Link>
                        </li>

                        <li>
                            <Link to="/contact">ارتباط با ما</Link>
                        </li>

                        <li>
                            <Link to="/collaboration">درخواست همکاری</Link>
                        </li>

                        <li>
                            <Link to="/rules">قوانین</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>دیگر وبسایت‌ها</h3>
                    <ul>
                        <li>
                            <a href="https://nit.ac.ir/">وبسایت دانشگاه نوشیروانی بابل</a>
                        </li>
                        <li>
                            <a href="https://golestan.nit.ac.ir/home/Default.htm">سامانه گلستان دانگشاه نوشیروانی بابل</a>
                        </li>
                    </ul>
                </div>
            </div>
                <div className="small-footer">
                تمامی حقوق متعلق به وبسایت فناوری اطلاعات و ارتباطات دانشگاه نوشیروانی بابل می‌باشد
            </div>
            </div>

        </footer>
    )
}

export default Footer
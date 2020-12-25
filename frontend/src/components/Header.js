import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [shrink, setShrink] = useState(false)
    const [collapse, setCollapse] = useState(false)

    useEffect(() => {
      window.onscroll = (()=>{
          window.scrollY > 320 ? setShrink(true) : setShrink(false)
      })
    },[])

    return(
        <React.Fragment>
        <header style={{backgroundImage: `url(${window.location.origin}/img/uni.jpg)`}}>
        <div className="overlay">
          <div className="header-text">
            <img src='/img/nit.png' alt="nit logo"/>
            <h1>مرکز فناوری اطلاعات و ارتباطات دانشگاه نوشیروانی بابل</h1>
          </div>
        </div>
        </header>
        <nav className={`${collapse ? 'collapse' : ''} ${shrink ? `shrink` : ``}`}>
          <button onClick={() =>{ setCollapse(!collapse)}} className="collapse-btn"><i className="fas fa-bars"></i></button>
          <ul>
            <li className="search-bar">
              <form action="#">
                  <input className={shrink ? `shrink` : ``} placeholder="جستجو" type="text"></input>
                  <button className={shrink ? `shrink` : ``} type="submit"><i className="fa fa-search"></i></button>
              </form>
            </li>

            <li className="animated">
              <Link className="link" to="/contact">
              <i className="fas fa-envelope" aria-hidden="true" ></i>
              <span>ارتباط با ما </span>
              </Link>
            </li>

            <li className="animated">
              <Link className="link" to="/bosses">
              <i className="fas fa-users" aria-hidden="true" ></i>
              <span>روسای مرکز</span>
              </Link>
            </li>

            <li className="animated">
              <Link className="link" to="/news">
              <i className="fas fa-newspaper" aria-hidden="true" ></i>
              <span>اخبار</span>
              </Link>
            </li>

            <li className="animated">
              <Link className="link" to="/collaboration">
              <i className="fas fa-briefcase" aria-hidden="true" ></i>
              <span>درخواست همکاری</span>
              </Link>
            </li>
            
            <li className="animated">
              <Link className="link" to="/rules">
              <i className="fas fa-gavel" aria-hidden="true" ></i>
              <span>قوانین</span>
              </Link>
            </li>

            <li className="animated">
            <div className="link">
              <i className="fas fa-landmark" aria-hidden="true" ></i>
              <span>معرفی مرکز</span>
              </div>
            </li>

            <li className="animated">
              <Link className="link" to="/">
              <i className="fas fa-home" aria-hidden="true" ></i>
              <span>صفحه اصلی</span>
              </Link>
            </li>

                        

          </ul>
        </nav>
        </React.Fragment>
    )
}

export default Header
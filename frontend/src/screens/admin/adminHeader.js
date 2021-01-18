import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
    return (
        <>
          <nav className="admin-nav">
            <Link className="admin-exit" to='/'>خروج</Link>
            <div>
                <span>پنل مدیریت</span>
                <img src="/img/nit.png" alt="nit"></img>
            </div>
          </nav>  
        </>
    )
}

export default AdminHeader

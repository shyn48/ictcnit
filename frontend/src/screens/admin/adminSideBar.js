import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
    return (
        <div className="admin-sidebar">
            <Link to="/admin">داشبورد</Link>
            <Link to="/admin/posts">اخبار</Link>
            <Link to="/admin/guides">راهنماها</Link>
            <Link to="/admin/collaboration">درخواست های همکاری</Link>
            <Link to="/admin/contact">فرم های تماس</Link>
            <Link to="/admin/comments">نظرات</Link>
            <Link to="/admin/services">خدمات</Link>
        </div>
    )
}

export default AdminSideBar

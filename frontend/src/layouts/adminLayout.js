import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import AdminHeader from '../screens/admin/adminHeader'
import AdminSideBar from '../screens/admin/adminSideBar'
import adminScreen from '../screens/admin/adminScreen'
import adminCollaborationScreen from '../screens/admin/collaborationScreen'
import adminContactScreen from '../screens/admin/contactScreen'
import adminGuideScreen from '../screens/admin/guideScreen'
import adminPostScreen from '../screens/admin/postScreen'
import editPostScreen from '../screens/admin/editPostScreen'
import createPostScreen from '../screens/admin/createPostScreen'
import commentsScreen from '../screens/admin/commentsScreen'
import createServiceScreen from '../screens/admin/createServiceScreen'
import serviceScreen from '../screens/admin/serviceScreen'

const AdminLayout = ({ history }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    
    useEffect(() => {
    
        if (!userInfo || !userInfo.isAdmin) {
          history.push('/')
        }
      }, [ history, userInfo])


    return (
        <div>
            <AdminHeader/>
            <div className="panel-admin">
                <AdminSideBar/>
                <div className="panel-admin-content">
                    <Route path="/admin" component={adminScreen} exact/>
                    <Route path="/admin/collaboration" component={adminCollaborationScreen} exact/>
                    <Route path="/admin/contact" component={adminContactScreen} exact />
                    <Route path="/admin/guides" component={adminGuideScreen} exact />
                    <Route path="/admin/posts" component={adminPostScreen} exact />
                    <Route path="/admin/comments" component={commentsScreen} exact/>
                    <Route path="/admin/posts/create" component={createPostScreen} exact />
                    <Route path="/admin/posts/edit/:post" component={editPostScreen} exact/>
                    <Route path="/admin/posts/page/:page" component={adminPostScreen} exact/>
                    <Route path="/admin/services" component={serviceScreen} exact/>
                    <Route path="/admin/services/page/:page" component={serviceScreen} exact/>
                    <Route path="/admin/services/create" component={createServiceScreen} exact />
                    <Route path="/admin/guides/page/:page" component={adminGuideScreen} exact/>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout

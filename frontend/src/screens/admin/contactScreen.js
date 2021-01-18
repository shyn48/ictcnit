import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {
    listAllcontacts, deletecontact
} from '../../actions/contactActions'

const ContactScreen = ({ match, history, location }) => {
    const pageNumber = match.params.page || 1

    const dispatch = useDispatch()
    const dispatchDelete = useDispatch()

    const contactsList = useSelector((state) => state.listContacts)
    const { loading, error, contacts, page, pages } = contactsList

    const contactDelete = useSelector((state) => state.deleteContact)

    const { loading: updateLoading , success, error: updateError } = contactDelete

    useEffect(() => {
        if (success) {
          dispatch(listAllcontacts(pageNumber))
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, history, success])
    


    useEffect(() => {
        dispatch(listAllcontacts(pageNumber))
    }, [history, dispatch, pageNumber])

    const deleteContact = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deletecontact(id))
        }
    }

    return (
        <div>
        <h1>فرم های تماس </h1>

        <div>
            {updateLoading && <Loader />}
            {updateError && <Message variant='danger'>{updateError}</Message>}
            { loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="error">{error}</Message>
            ):    
            <>
                <table style={{marginBottom: '10px'}} className="post-table">
                    <thead>
                        <tr>
                            <th> نام فرستنده</th>
                            <th>ایمیل فرستنده</th>
                            <th>متن نظر</th>
                            <th>تنظیمات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => 
                            <tr key={contact._id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>
                                    {contact.text}
                                </td>
                                <td>
                                <form>
                                    <div>
                                    <button type='button' onClick={() => deleteContact(contact._id)} >حذف</button>
                                    </div>
                                </form>   
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paginate admin={true} pages={pages} page={page}/>
                </div>
            </>
            }
        </div>
    </div>
    )
}

export default ContactScreen

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {
    listAllservices, deleteservice
} from '../../actions/serviceActions'

const ServiceScreen = ({ match, history }) => {
    const pageNumber = match.params.page || 1

    const dispatch = useDispatch()

    const serviceList = useSelector((state) => state.serviceList)
    const { loading, error, services, page, pages } = serviceList

    const serviceDelete = useSelector((state) => state.serviceDelete)

    const { loading: loadingDelete , success: successDelete , error: errorDelete } = serviceDelete

    useEffect(() => {
        if (successDelete) {
          dispatch(listAllservices(pageNumber))
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, history, successDelete])
    

    useEffect(() => {
        dispatch(listAllservices(pageNumber))
    }, [history, dispatch, pageNumber])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteservice(id))
        }
    }

    return (
        <div>
            <h1>خدمات </h1>

            <div>
                {loadingDelete && <Loader></Loader>}
                {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                { loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ):    
                <>
                    <table style={{marginBottom: '10px'}} className="post-table">
                        <thead>
                            <tr>
                                <th>عنوان خدمت</th>
                                <th>متن خدمت</th>
                                <th>تنظیمات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => 
                                <tr key={service._id}>
                                    <td><Link to={`/services/${service._id}`}>{service.name}</Link></td>
                                    <td>{service.text}</td>
                                    <td>
                                    <form>
                                        <div>
                                        <Link
                                            to={`/admin/services/${service._id}`}
                                        
                                            >ویرایش</Link>
                                        <button type="button" onClick={() => handleDelete(service._id)}>حذف</button>
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

export default ServiceScreen

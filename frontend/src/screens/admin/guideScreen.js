import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {
    listAllguides, deleteguide
} from '../../actions/guideActions'

const GuideScreen = ({ match, history }) => {
    const pageNumber = match.params.page || 1

    const dispatch = useDispatch()

    const guideList = useSelector((state) => state.guideList)
    const { loading, error, guides, page, pages } = guideList

    const guideDelete = useSelector((state) => state.guideDelete)

    const { loading: loadingDelete , success: successDelete , error: errorDelete } = guideDelete

    useEffect(() => {
        if (successDelete) {
          dispatch(listAllguides(pageNumber))
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, history, successDelete])
    

    useEffect(() => {
        dispatch(listAllguides(pageNumber))
    }, [history, dispatch, pageNumber])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteguide(id))
        }
    }

    return (
        <div>
            <h1>راهنما های وبسایت </h1>

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
                                <th>عنوان راهنما</th>
                                <th>متن راهنما</th>
                                <th>خدمت مربوطه</th>
                                <th>دسته</th>
                                <th>تنظیمات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guides.map(guide => 
                                <tr key={guide._id}>
                                    <td><Link to={`/guides/${guide._id}`}>{guide.name}</Link></td>
                                    <td>{guide.text}</td>
                                    <td>{guide.helpService[0].serviceId.name}</td>
                                    <td>{guide.forWho}</td>
                                    <td>
                                    <form>
                                        <div>
                                        <Link
                                            to={`/admin/guides/${guide._id}`}
                                        
                                            >ویرایش</Link>
                                        <button type="button" onClick={() => handleDelete(guide._id)}>حذف</button>
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

export default GuideScreen

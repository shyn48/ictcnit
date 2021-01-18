import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, admin }) => {
  return (
  <nav className="has-bootstrap" aria-label="Page navigation">
    <ul className="has-bootstrap pagination">
      {
        page === 1 ? <li className="disabled has-bootstrap page-item"><Link to={admin ? `/admin/posts/page/${page-1}` : `/news/page/${page-1}`} className="has-bootstrap page-link" href="#">صفحه قبل</Link></li> : 
        <li className="has-bootstrap page-item"><Link to={admin ? `/admin/posts/page/${page-1}` : `/news/page/${page-1}`} className="has-bootstrap page-link" href="#">صفحه قبل</Link></li>
      }

      {
        [...Array(pages).keys()].map((x, i) => (
          <li key={i} className="has-bootstrap page-item">
            <Link className="page-link" to={admin ? `/admin/posts/page/${x+1}` : `/news/page/${x + 1}`}>{x + 1}</Link>
          </li>
        ))
      }

      {
        pages === page ? <li className="disabled has-bootstrap page-item"><Link to={admin ? `/admin/posts/page/${page+1}` : `/news/page/${page+1}`} className="has-bootstrap page-link" href="#">صفحه بعد</Link></li> :
        <li className="has-bootstrap page-item"><Link to={admin ? `/admin/posts/page/${page+1}` : `/news/page/${page+1}`} className="has-bootstrap page-link" href="#">صفحه بعد</Link></li>
      }
    </ul>
</nav>
  )
}

export default Paginate
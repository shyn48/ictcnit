import React from 'react'

function Status() {
    //use effect setInterval send request to /status using static object for now...
    const status = {
        database: 'online',
        backend_api: 'online',
        golestan: 'online',
        email: 'online',
        internet: 'offline'
    }

    const translateToPersian = (key) => {
        switch (key) {
            case 'database':
                return 'پایگاه داده'
            case 'backend_api':
                return 'زیرساخت سرور'
            case 'golestan':
                return 'سامانه گلستان'
            case 'email':
                return 'سرویس ایمیل'
            case 'internet':
                return 'اینترنت'
            default:
                return 'سامانه'
        }
    }

    return (
        <div className="status-box">
            <h2 style={{textAlign: 'center', marginBottom: '10px'}}>وضعیت سامانه ها</h2>
            <ul>
                { 
                  Object.entries(status).map(([key, value]) => {
                    const iconClass = value === 'online' ? 'fas fa-check' : 'fas fa-times'
                        return (
                            <li key={key} className="service">
                              {translateToPersian(key)} <span style={{marginRight:'100px'}} className={'circle-icon-holder ' + value}><i className={iconClass}></i></span>
                            </li>
                        )
                  })
                }
            </ul>  
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="btn" style={{marginLeft:'auto', marginRight: 'auto'}}>گزارش مشکل</button>  
                <button className="btn bg-primary"  style={{marginLeft:'auto', marginRight: 'auto'}}>همین الان چک کن</button>
            </div>
        </div>
    )
}

export default Status

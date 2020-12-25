import React from 'react'

const PersonCard = ( { extraClass } ) => {
    return (
        <div className={`person-card ${extraClass ? extraClass : ''}`} style={{ marginBottom: '10px' }}>
            <img className="person-img" src="http://itc.nit.ac.ir/imageViewBoss.aspx" alt="Bill Gates" />
            <div className="person-info">
                <div className="details-title">
                    <span>دکتر حمید جزایری</span><br/>
                    <small>رئیس مرکز فناوری اطلاعات</small>
                </div>
                <div className="details-body">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                <br/><br/>
                ایمیل: jhamaid@nit.ac.ir
                </div>
            </div>
        </div>
    )
}

export default PersonCard

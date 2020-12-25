import React from 'react'
import PersonCard from '../components/PersonCard'


const PeopleScreen = () => {
    return (
        <div>
            <div className="row bg-dark" style={{color: 'white', padding: '30px'}}>
                <h1 className="light" style={{marginLeft: 'auto', marginRight: '50px'}}>معرفی <span className="color-secondary">افراد </span>
                و <span className="color-secondary">پرسنل </span></h1>
            </div>
            <h1 className="light" style={{textAlign: 'center', marginTop: '20px'}}>رییس مرکز</h1>
            <div className="row boss" style={{ padding: '20px', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <p style={{width: '30%', direction: 'rtl'}}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
                </p>
                <PersonCard text="" img="" name="" role="" />
            </div>
            <h1 className="light" style={{textAlign: 'center', marginTop: '20px'}}>معاونت‌ها</h1>
            <div className="row" style={{ padding: '20px' }}>
                <PersonCard text="" img="" name="" role="" />
                <PersonCard text="" img="" name="" role="" />
                <PersonCard text="" img="" name="" role="" />
            </div>

            <h1 className="light" style={{textAlign: 'center', marginTop: '20px'}}>کارکنان</h1>
            <div className="row" style={{ padding: '20px' }}>
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />
            </div>

            <h1 className="light" style={{textAlign: 'center', marginTop: '20px'}}>دانشجویان همکار</h1>
            <div className="row" style={{ padding: '20px' }}>
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />

            </div>
            <div className="row" style={{ padding: '20px' }}>
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />
                <PersonCard extraClass="small" text="" img="" name="" role="" />

            </div>
        </div>
    )
}

export default PeopleScreen

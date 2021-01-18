import React from 'react'
import {Link} from 'react-router-dom'
import SwiperCore, { Navigation, Scrollbar, A11y, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'jalali-moment'

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

const Slider = ({slidesPerView=3, posts}) => {
    SwiperCore.use([Navigation, Scrollbar, A11y, Keyboard]);

    return (
    <Swiper
      className="post-slider"
      spaceBetween={0}
      init={true}
      slidesPerView={slidesPerView}
      navigation
      speed={500}
      keyboard={{ enabled: true, onlyInViewport: true }}
    >
        {posts.map((post) => {
            return(
            <SwiperSlide key={post.id}>
                <div className="post">
                    <img src={post.imgURL} alt="postImage"/>
                    <div className="text">
                        <span>{post.category} - {moment(post.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span>
                        <h3>{post.title}</h3>
                        <p>{post.description.substr(0,100)}...</p>
                    </div>
                    <Link className="btn post-btn" to={`news/${post.id}`}>مشاهده متن کامل خبر</Link>
                </div>
            </SwiperSlide>
            )
        })}
    </Swiper>
    )
}

export default Slider

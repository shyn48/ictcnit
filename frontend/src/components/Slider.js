import React from 'react'

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, EffectFlip, EffectCube, EffectFade, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import 'swiper/components/effect-cube/effect-cube.scss';
import 'swiper/components/effect-flip/effect-flip.scss';
import 'swiper/components/effect-coverflow/effect-coverflow.scss';

const Slider = ({slidesPerView=1, slides}) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, EffectFlip, EffectCube, EffectFade, Autoplay]);

    return (
    <Swiper
      className="bg-black"
      effect="coverflow"
      spaceBetween={50}
      init={true}
      slidesPerView={slidesPerView}
      navigation
      autoplay={{ delay: 3000 }}
      speed={1000}
      coverflowEffect={{
          rotate: 30,
      }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      loop
      lazy
      pagination={{clickable: true}}
    >
        {slides.map((slide) => {
            return(
            <SwiperSlide key={slide.title}>
            <div className="slide-overlay"></div>
            <div className="slide-content">
                <div className="content">
                    <h1>{slide.title}</h1>
                    <p className="slide-text">{slide.text}</p>
                    {slide.button ? (<button className="btn">{slide.button}</button>) : ''}
                </div>
            </div>
            <img src={slide.img} alt={slide.alt} className="swiper-lazy" />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </SwiperSlide>
            )
        })}
    </Swiper>
    )
}

export default Slider

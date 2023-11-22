import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './imgcarousel.css';

import test_slide_image from '../Assets/Images/img_1.jpg';

export default function ImgCarousel() {
    return (
        <div className="container">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                <SwiperSlide>
                    <img src={test_slide_image} alt="slideImg" loading="lazy" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={test_slide_image} alt="slideImg" loading="lazy"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={test_slide_image} alt="slideImg" loading="lazy"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={test_slide_image} alt="slideImg" loading="lazy"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={test_slide_image} alt="slideImg" loading="lazy"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={test_slide_image} alt="slideImg" loading="lazy"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={test_slide_image} alt="slideImg" loading="lazy"/>
                </SwiperSlide>

                <div className="slider-controller">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    )

}
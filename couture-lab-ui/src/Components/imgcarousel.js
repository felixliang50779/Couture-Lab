import { useKeenSlider } from 'keen-slider/react';

import styles from './imgcarousel.module.css';
import 'keen-slider/keen-slider.min.css';

export default function ImgCarousel() {
    const carousel = (slider) => {
        const z = 300
        function rotate() {
            if (slider.track.details) {
                const deg = 360 * slider.track.details.progress
                slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
            }
        }
        slider.on("created", () => {
          const deg = 360 / slider.slides.length
          slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
          })
          rotate()
        })
        slider.on("detailsChanged", rotate)
    }

    const [sliderRef] = useKeenSlider(
        {
          loop: true,
          selector: ".carousel__cell",
          renderMode: "custom",
          mode: "free-snap",
        },
        [carousel]
    )

    return (
        <div className={styles["wrapper"]}>
            <div className={styles["scene"]}>
                <div className={`${styles["carouselkeen-slider"]} ${styles["custom-carousel-style"]}`} ref={sliderRef}>
                    <div className={`carousel__cell ${styles["number-slide1"]}`}>1</div>
                    <div className={`carousel__cell ${styles["number-slide2"]}`}>2</div>
                    <div className={`carousel__cell ${styles["number-slide3"]}`}>3</div>
                    <div className={`carousel__cell ${styles["number-slide4"]}`}>4</div>
                    <div className={`carousel__cell ${styles["number-slide5"]}`}>5</div>
                </div>
            </div>
        </div>
    )

}
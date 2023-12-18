import DashboardNavbar from '../Components/dashboardnavbar';
import Footer from '../Components/footer';

import styles from './Recommend.module.css';

export default function Recommend() {
    return (
        <div className={styles["recommend-container"]}>
            <DashboardNavbar/> 
            <div className={styles["recommend-main"]}>
                <section className={styles["selected-item"]}>
                    <img src="https://www.chicwish.com/media/catalog/product/cache/789a34736ead3066d85296b038a5aa03/2/0/20804fz.1.jpg"
                    alt="ChiffonTop" loading="lazy" className={styles["selecteditem-img"]} />
                    <h1>Cream Chiffon Top</h1>
                    <p>145 USD</p>
                    <h1>View Details</h1>   
                </section>
                <div>
                    <h1>STYLE IT WITH</h1>
                    <div className={styles["suggestions"]}>
                        <section>
                            <h1>Work</h1>
                            <p>suggestions image</p>
                        </section>
                        <section>
                            <h1>Casual</h1>
                            <p>suggestions image</p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
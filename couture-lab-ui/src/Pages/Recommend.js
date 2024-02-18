import DashboardNavbar from '../Components/dashboardnavbar';
import Footer from '../Components/footer';

import styles from '../PageStyles/Recommend.module.css';

export default function Recommend() {
    return (
        <div className={styles["recommend-container"]}>
            <DashboardNavbar/> 
            <div className={styles["recommend-main"]}>
                <section className={styles["selected-item"]}>
                    <img src="https://www.chicwish.com/media/catalog/product/cache/789a34736ead3066d85296b038a5aa03/2/0/20804fz.1.jpg"
                    alt="ChiffonTop" loading="lazy" className={styles["selecteditem-img"]} />
                    <h1 className={styles["selected-header"]}>Cream Chiffon Top</h1>
                    <h2 className={styles["selected-price"]}>145 USD</h2>
                    <h1 className={styles["selected-viewdetails"]}>VIEW DETAILS</h1>   
                </section>
                <section className={styles["recommend-text"]}>
                    <h1 className={styles["recommend-header"]}>STYLE IT WITH</h1>
                    <div className={styles["suggestions"]}>
                        <section className={styles["stylewith"]}>
                            <h1>WORK</h1>
                            <div className={styles["placeholder-box"]}>image</div>
                        </section>
                        <section className={styles["stylewith"]}>
                            <h1>CASUAL</h1>
                            <div className={styles["placeholder-box"]}>image</div>
                        </section>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}
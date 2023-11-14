import React, { useState } from 'react';

import DashboardNavbar from '../Components/dashboardnavbar';
import Footer from '../Components/footer';

import styles from './Closet.module.css';

export default function Closet() {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    
    return (
        <div className={styles['closet-container']}>
            <DashboardNavbar />
            <div className={styles['clothes-container']}>
                <div class="adding-container">
                    <button className={styles['add-button']}>Add Clothes</button>
                    <div className="upload-img">
                        <input type="file" onChange={handleChange} />
                        <img src={file} alt='file' loading='lazy'/>
                    </div>
                </div>
                <div className={styles['inventory']}>
                    <h1>Inventory</h1>
                </div>
            </div>
            <Footer />
        </div>
    )
}
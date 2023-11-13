import React, { useState } from 'react';

import Navbar from '../Components/navbar';
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
            <Navbar />
            <div className={styles['clothes-container']}>
                <div class="adding-container">
                    <h1>Add Clothes</h1>
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
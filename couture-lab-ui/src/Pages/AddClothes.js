import { useState } from "react";

import UploadImage from '../Assets/Images/upload-img.png';

import DashboardNavbar from '../Components/dashboardnavbar';
import Footer from '../Components/footer';

import styles from './AddClothes.module.css';

export default function AddClothes() { 
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        setSelectedImage(file);
    };
    return (
        <div className={styles['addclothes-container']}>
            <DashboardNavbar/>
            <div className={styles['addclothes-inner-container']}>
                <h1>Add Clothes</h1>
                <label htmlFor="imageUpload">
                    <img
                    src={UploadImage}
                    alt="Upload Icon"
                    className={styles['img-upload-container']}
                    />
                    Upload Image
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    className={styles['img-upload']}
                    onChange={handleImageChange}
                />
                {selectedImage && (
                    <div>
                    <p>Selected Image:</p>
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    )
}
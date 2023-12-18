import { useState } from 'react';
import UploadImage from '../Assets/Images/upload-img.png';
import DashboardNavbar from '../Components/dashboardnavbar';
import Footer from '../Components/footer';
import styles from './AddClothes.module.css';

export default function AddClothes() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://127.0.0.1:8000/store-image/', {
        method: 'POST',
        body: formData,
      });

      // Handle the response from the backend
      await response.json();
      console.log("Successfully sent data to the backend!");
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };

  return (
    <div className={styles['addclothes-container']}>
      <DashboardNavbar />
      <div className={styles['addclothes-inner-container']}>
        <h1>Add Clothes</h1>
        <label htmlFor="imageUpload">
          <img
            src={UploadImage}
            alt="Upload Icon"
            className={styles['img-upload-container']}
            loading="lazy"
          />
          Upload Image
        </label>
        <br />
        <br />
        <form
          action="/store-image/"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <h2>Upload a Clothing Item</h2>
          <input
            id="file-upload"
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          <button type="submit">Submit</button>
        </form>

        <br />
        <br />
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
      <Footer />
    </div>
  );
}

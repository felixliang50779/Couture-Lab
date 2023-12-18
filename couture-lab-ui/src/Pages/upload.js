// upload.js

function uploadImage() {
    var formData = new FormData(document.getElementById('imageForm'));

    fetch('/store-image/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Image uploaded successfully:', data);
        // You can handle the response as needed
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        // Handle error
    });
}

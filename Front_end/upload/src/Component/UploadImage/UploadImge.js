import React from 'react'

import { useState } from 'react';
import {uploadImage } from "../../Api"
import Gallery from '../Gallery.js/Gallery';

function UploadImage({ token }) {
    const [image, setImage] = useState(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            await uploadImage(formData, token);
            alert('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image');
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit">Upload</button>
        </form>
        
    );
}

export default UploadImage;
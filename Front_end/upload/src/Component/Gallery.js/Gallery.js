import React, { useEffect, useState } from 'react';
import {getImage } from "../../Api"

function Gallery({ token }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const { data } = await getImage(token);
            setImages(data);
            console.log(data);
            
        };
        fetchImages();
    }, [token]);

    return (
        <div className="gallery">
            {images.map((image) => (
                <div key={image.id}>
                    <img src={`http://localhost:8000/api/${image.image}`} alt="Uploaded" />
                    <p>Uploaded At: {new Date(image.uploaded_at).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}

export default Gallery;
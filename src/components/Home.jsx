import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
    const [imageIds, setImageIds] = useState();
    const { user } = useAuth0();

    useEffect(() => {
        const loadImages = async () => {
            try {
                const res = await fetch('/api/images', {headers: {'user': `${user.name}`}});
                const data = await res.json();
                setImageIds(data);
            } catch (err) {
                console.error(err);
            }
        };
        loadImages();
    }, [user.name]);

    return (
        <div>
            <h1 className="title">Gallery</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            className="mt-1 mb-1 ml-1 mr-1"
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}

export default HomePage;
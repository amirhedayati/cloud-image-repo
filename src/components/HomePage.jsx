import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
    const [imageIds, setImageIds] = useState();
    const [modalImage, setModalImage] = useState();
    const [showModal, setShowModal] = useState(false);
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

    const handleImageClick = ({imageId: imageId, index: index}) => {
        setShowModal(!showModal);
        setModalImage({imageId: imageId, index: index});
    }

    const Modal = () =>{
        return (
            <div className="modal">
                <span className="close" onClick={() => setShowModal(!showModal)}>&times;</span>
                <Image
                            className="modal-content"
                            key={modalImage.index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={modalImage.imageId}
                            crop="scale"
                        />
                <div className="caption"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="title">Gallery</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            className="mt-1 mb-1 ml-1 mr-1 grid-image"
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={imageId}
                            onClick={(e) => {handleImageClick({imageId: imageId,  index: index})}}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
            {showModal && Modal()}
        </div>
    );
}

export default HomePage;

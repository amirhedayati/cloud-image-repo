import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Image } from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'antd';
import './HomePage.style.css'

const HomePage = () => {
    const [imageIds, setImageIds] = useState();
    const [modalImage, setModalImage] = useState();
    const [showModal, setShowModal] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const { user } = useAuth0();
    const history = useHistory();


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
        if (deleted){
          setShowModal(false);
          setDeleted(false);
        }
    }, [user.name, deleted]);

    const handleImageClick = ({imageId: imageId, index: index}) => {
        setShowModal(!showModal);
        setModalImage({imageId: imageId, index: index});
    }

    const handleDelete = async (imageId) => {
      try {
              await fetch('/api/delete', {method: 'POST', headers: {"imageId": `${imageId}`}});
              setDeleted(true);
              const path = "\\";
              history.push(path);


            } catch (err) {
                console.error(err);
            }
    }

    const Modal = () =>{
        return (
            <div className="modal">
              <div className="row">
                <span className="close" onClick={() => setShowModal(!showModal)}>&times;</span>
                <Image
                    className="modal-content"
                    key={modalImage.index}
                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                    publicId={modalImage.imageId}
                    crop="scale"
                />
                </div>
                <div className="row delete-btn">
                  <Button type="danger mt-1 delete-btn" size="large" onClick={() => handleDelete(modalImage.imageId)}>
                    <b>Delete</b>
                  </Button>
                </div>
                
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

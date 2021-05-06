import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Toast from './Toast';

const UploadPage = () => {
  const [selectedPic, setSelectedPic] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading] = useState(false);

  const { user } = useAuth0();

  const handleValidation = (file) => {
    if (file.type.startsWith("image/") === false){
      setErrorMsg("Invalid image type");
      return Upload.LIST_IGNORE;
    }
    return true;
  }
  const handleFileInputChange = e => {
    setSelectedPic(e.fileList[0] ? e.fileList[0].originFileObj : null);
  };


  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleSubmit = async () => {
    if (selectedPic === null){
      setErrorMsg("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedPic);
    formData.append('tags', user.name)
    formData.append('upload_preset', 'khxzubw4');
    
    const options = {
      method: 'POST',
      body: formData,
    };

    
    setLoading(true);
    return fetch('https://api.Cloudinary.com/v1_1/dmrntqcp0/image/upload', options)
    .then(res => res.json())
    .then( () => {    
      setLoading(false);
      setSuccessMsg("Successfully stored image");
    })
    .catch(err => {
      setErrorMsg("Failed storing image to Cloudinary");
      console.log(err);
    });
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row mt-2">
          <Toast msg={errorMsg} type="danger" />
          <Toast msg={successMsg} type="success" />
          <Upload onChange={handleFileInputChange} maxCount={1} className="mr-2" customRequest={handleUpload} action={() => {}} beforeUpload={handleValidation}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      )}
    </div>
  );
}

export default UploadPage;

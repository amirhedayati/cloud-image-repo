import React from "react";
import { Typography, Input, Space } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import "./PasswordPage.style.css";

const { Title } = Typography;

const PasswordPage = () => {
  const { loginWithRedirect } = useAuth0();

  const handlePassword = (input) => {
    if (input !== process.env.REACT_APP_PASSWORD) {
      // To-Do: Error handling
      return;
    }
    loginWithRedirect();
  };

  return (
    <div className="container" id="pp-container">
      <div className="col">
        <div className="pp-title">
          <Title level={2}>Enter site password</Title>
        </div>
        <div className="row pp-btn">
          <Space direction="vertical">
            <Input.Password
              placeholder="input password"
              onPressEnter={(e) => handlePassword(e.target.value)}
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;

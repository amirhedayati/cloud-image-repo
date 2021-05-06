import React, { useState, useEffect } from 'react';

const Toast = ({ msg, type }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (msg) {
            setVisible(true);
            setInterval(() => {
                setVisible(false);
            }, 1750);
        }
    }, [msg]);
    return <>{visible && <div className={`mt-5 alert alert-${type}`}>{msg}</div>}</>;
};

export default Toast;
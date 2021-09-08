import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import './TrailerModal.module.css'
export const TrailerModal = (props) => {
    const { isDisplay } = props;
    const [visible, setState] = useState(isDisplay);
    
    useEffect(() => {
        setState(isDisplay ? true : false);
    }, [isDisplay]);

    if (!isDisplay) {
        return null;
    }
    const handleOk = () => {
        setState(false);
    };

    const handleCancel = () => {
        setState(false);
    };

    return (
        <Modal
            visible={visible}
            width={900}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            afterClose={() => { props.setDispalyModalCallBack(false) }}
        >
            <div className="video-responsive mt-5">
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/G70iOuf-ZGk`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
        </Modal>

    );
};
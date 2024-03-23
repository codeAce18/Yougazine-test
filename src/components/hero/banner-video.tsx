"use client";

import React, { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import YouTubePlayer from "./youtube-player";
// import Modal from 'react-modal';
// import YouTubePlayer from '../common/youtube-player';

export default function BannerVideo() {
    const [isOpenVideo, setIsOpenVideo] = useState(false);
    const customStyles = {
        overlay: {
           backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
           top: '50%',
           left: '50%',
           right: 'auto',
           bottom: 'auto',
           marginRight: '-50%',
           transform: 'translate(-50%, -50%)'
        }
     }
    return (
        <>
            <div className="flex overflow-hidden justify-center">
                <YouTubePlayer videoId="w0-i8SBDsIs" />
                {/* <div className="playbtn text-center align-items-center d-flex justify-content-center">
                     <a onClick={() => setIsOpenVideo(true)} className="pulse flex justify-center items-center text-center">
                    <AiFillPlayCircle className="text-skin" />
                </a> 
                </div>*/}
            </div>
            {/* <Modal isOpen={isOpenVideo} onRequestClose={() => setIsOpenVideo(false)} style={customStyles}>
                <YouTubePlayer videoId="w0-i8SBDsIs" />
            </Modal> */}

        </>
    )
}
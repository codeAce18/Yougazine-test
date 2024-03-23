import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId }: {videoId: string}) => {
    // Set up event handlers
    const onReady = (event: any) => {
      // Access the player instance
      const player = event.target;
    };
  
    const onError = (error: any) => {
      console.error('YouTube Player Error:', error);
    };
  
    return (
      <YouTube
        videoId={videoId}
        onReady={onReady}
        onError={onError}
      />
    );
  };
  
  export default YouTubePlayer;
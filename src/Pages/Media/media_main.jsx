import React, { useState, useEffect, useRef } from 'react'
import play from './Images/play.svg'
import right from './Images/right.svg'
import left from './Images/left.svg'

import Loader_main from '../../Components/Loader/loader_main'

const Media_main = ({ lang }) => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    fetch('http://ctrl.iivandijonlitsey.uz/api/gallery/?page=1')
      .then(response => response.json())
      .then(json => setPhotos(json.results))
      .catch(error => console.error('Error fetching photos:', error));

    fetch('http://ctrl.iivandijonlitsey.uz/api/video-gallery/?page=1')
      .then(response => response.json())
      .then(json => setVideos(json.results))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const translations = {
    uz: {
      home: 'Bosh sahifa',
      media: 'Media',
      photoGallery: 'Foto galereya',
      videoGallery: 'Video galereya',
      months: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
    },
    ru: {
      home: 'Главная',
      media: 'Медиа',
      photoGallery: 'Фотогалерея',
      videoGallery: 'Видеогалерея',
      months: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'] // Simplified, adjust if needed
    },
    en: {
      home: 'Home',
      media: 'Media',
      photoGallery: 'Photo Gallery',
      videoGallery: 'Video Gallery',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  const t = translations[lang] || translations.uz;

  const formatPhotoDate = (created_at) => {
    const date = new Date(created_at);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatVideoDate = (created_at) => {
    const date = new Date(created_at);
    const day = date.getDate();
    const month = t.months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}, ${year}`;
  };

  const handlePrevPhoto = () => {
    setCurrentPhoto((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhoto((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handlePrevVideo = () => {
    setCurrentVideo((prev) => Math.max(prev - 1, 0));
  };

  const handleNextVideo = () => {
    setCurrentVideo((prev) => Math.min(prev + 1, videos.length - (windowWidth < 640 ? 1 : 2)));
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlayVideo = (id) => {
    setPlayingVideo(id);
  };

  if (photos.length === 0 || videos.length === 0) {
    return <Loader_main className="h-[500px]" />;
  }

  return (
    <div className='w-full h-full flex justify-center bg-[#FFFFFF]'>
      <div className='w-full px-[20px] sm:px-[0px] overflow-hidden sm:w-[1220px] h-full flex gap-[20px] pt-[40px] flex mb-[10px] flex-col '>

        <div className='flex flex-col gap-[30px] sm:gap-[15px]'>
          <h1 className='font-inter font-[600] text-[14px] sm:text-[18px] text-[#000000]'>{t.home} / <span className='text-[#cfa92d]'>{t.media}</span></h1>
          <h1 className='font-inter font-[700] text-[28px] sm:text-[36px] text-[#303030]'>{t.photoGallery}</h1>
        </div>

        <div>
          <div className='relative'>
            <button onClick={handlePrevPhoto} className='hidden sm:block absolute mt-[230px] ml-[-30px] shadow-lg shadow-gray-600 w-[60px] h-[60px] rounded-[6px] opacity-[80%] bg-[#FFFFFF] cursor-pointer hover:bg-gray-200 duration-300 flex flex-col justify-center items-center'>
              <img src={left} alt="left" />
            </button>
            <div>
              <img src={photos[currentPhoto].image} className='w-full sm:w-[1220px] h-[400px] object-cover sm:h-[520px] rounded-[8px] ' alt="main" />
              <div className='mt-[-66px] sm:mt-[-94px] mb-[48px] ml-[20px] sm:ml-[40px] flex flex-col gap-[10px]'>
                <h1 className='font-inter font-[400] text-[14px] sm:text-[18px] leading-[100%] text-[#FFFFFF]'>{formatPhotoDate(photos[currentPhoto].created_at)}</h1>
                <h1 className='font-inter font-[700] text-[16px] sm:text-[18px] leading-[100%] text-[#FFFFFF]'>{photos[currentPhoto][`title_${lang}`] || photos[currentPhoto].title_uz}</h1>
              </div>
            </div>
            <button onClick={handleNextPhoto} className='hidden sm:block absolute ml-[1190px] mt-[-289px] shadow-lg shadow-gray-600 w-[60px] h-[60px] rounded-[6px] opacity-[80%] bg-[#FFD859] cursor-pointer hover:bg-[#f5be0b] duration-300 '>
              <img src={right} alt="right" />
            </button>
          </div>

          <div className='flex w-full overflow-x-auto gap-[20px] mt-[20px] sm:mt-[70px]'>
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo.image}
                className={`cursor-pointer object-cover w-[39.17px] sm:w-[135px] h-[34px] sm:h-[80px] rounded-[6px] border-[2px] border-[#FFD859] ${idx === currentPhoto ? 'opacity-100' : 'opacity-[60%]'}`}
                onClick={() => setCurrentPhoto(idx)}
                alt={`thumbnail ${idx}`}
              />
            ))}
          </div>
        </div>

        <div className='mt-[85px] sm:mt-[96px] '>
          <div className='flex justify-between'>
            <h1 className='font-inter font-[700] text-[28px] sm:text-[36px] text-[#303030]'>{t.videoGallery}</h1>
            <div className='flex gap-[10px] sm:gap-[20px]'>
              <button
                onClick={handlePrevVideo}
                disabled={currentVideo === 0}
                className={`shadow-lg w-[44px] h-[44px] sm:w-[60px] sm:h-[60px] rounded-[6px] opacity-[80%] ${currentVideo === 0 ? 'bg-[#E0E0E0]' : 'bg-[#FFD859] hover:bg-[#f5be0b]'} cursor-pointer duration-300 flex flex-col justify-center items-center`}
              >
                <img src={left} alt="left" />
              </button>
              <button
                onClick={handleNextVideo}
                disabled={currentVideo === videos.length - (windowWidth < 640 ? 1 : 2)}
                className={`shadow-lg w-[44px] h-[44px] sm:w-[60px] sm:h-[60px] rounded-[6px] opacity-[80%] ${currentVideo === videos.length - (windowWidth < 640 ? 1 : 2) ? 'bg-[#E0E0E0]' : 'bg-[#FFD859] hover:bg-[#f5be0b]'} cursor-pointer duration-300 flex flex-col justify-center items-center`}
              >
                <img src={right} alt="right" />
              </button>
            </div>
          </div>

          <div>
            <div className="w-full sm:w-[1220px] overflow-hidden" ref={videoContainerRef}>
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: windowWidth < 640
                    ? `translateX(calc(-${currentVideo} * (100% + 15px)))`
                    : `translateX(-${currentVideo * 590}px)` // 570px + 20px gap
                }}
              >
                {videos.map((video) => {
                  const isPlaying = playingVideo === video.id;
                  const youtubeId = getYouTubeId(video.video_url);
                  return (
                    <div key={video.id} className='flex-shrink-0 w-full sm:w-[570px] mr-[20px]'>
                      <div className="relative mt-[30px] w-full sm:w-[570px]">
                        {isPlaying ? (
                          <iframe
                            width="100%"
                            height="224px sm:360px"
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <>
                            <img src={video.cover_image} className="w-full sm:w-[570px] h-[224px] sm:h-[360px] rounded-[6px] object-cover" alt="video cover" />
                            <img src={play} className="absolute inset-0 m-auto cursor-pointer" onClick={() => handlePlayVideo(video.id)} alt="play" />
                          </>
                        )}
                      </div>
                      <div className='w-full mt-[20px] flex flex-col gap-[10px]'>
                        <h1 className='font-inter font-[400] text-[14px] sm:text-[16px] text-[#979797]'>{formatVideoDate(video.created_at)}</h1>
                        <h1 className='font-inter font-[700] text-[18px] text-[#303030]'>{video[`title_${lang}`] || video.title_uz}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='w-full flex justify-center gap-[8px] mt-[40px]'>
              {videos.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-[10px] h-[10px] rounded-[50%] cursor-pointer ${idx === currentVideo ? 'bg-[#FFD859]' : 'bg-[#D9D9D9]'}`}
                  onClick={() => setCurrentVideo(idx)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Media_main
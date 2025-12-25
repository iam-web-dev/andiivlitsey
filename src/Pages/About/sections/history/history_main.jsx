import React, { useState, useEffect } from 'react'
import eye from './Images/eye.svg'
import left from './Images/left.svg'
import right from './Images/right.svg'

import Loader_main from '../../../../Components/Loader/loader_main'

const History_main = ({ lang }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://ctrl.iivandijonlitsey.uz/api/about/1')
      .then(response => response.json())
      .then(setData)
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <Loader_main className="h-[400px]" />;
  }

  const translations = {
    uz: {
      home: 'Bosh sahifa',
      about: 'Litsey haqida'
    },
    ru: {
      home: 'Главная',
      about: 'О лицее'
    },
    en: {
      home: 'Home',
      about: 'About the Lyceum'
    }
  };

  const t = translations[lang] || translations.uz;

  const titleText = data[`title_${lang}`] || data.title_uz || data.title;
  const contentText = data[`content_${lang}`] || data.content_uz || data.content;
  const imageUrl = data.image;

  const breadcrumb = (
    <h1 className='font-inter font-[600] text-[14px] sm:text-[18px] text-[#000000] hover:text-[#cfa92d] duration-150'>
      <a href="/">{t.home}</a> <span className='text-gray-400'>/</span> <span className='text-[#cfa92d]'>{t.about}</span>
    </h1>
  );

  const title = (
    <h1 className='font-inter font-[700] text-[28px] sm:text-[36px] text-[#303030]'>{titleText}</h1>
  );

  const description = (
    <p className='mt-[5px] sm:w-[807px] sm:h-[390px] font-inter font-[400] text-[16px] sm:text-[18px] leading-[140%] text-[#303030]'
      dangerouslySetInnerHTML={{ __html: contentText.replace(/\r?\n/g, '<br /><br />') }}>
    </p>
  );

  return (
    <div className='w-full h-full flex justify-center sm:px-[0px] px-[20px] bg-[#FFFFFF]'>
      <div className='w-full sm:w-[1220px] sm:h-[731px] flex sm:flex-row flex-col gap-[20px] pt-[40px] '>
        <div className='flex flex-col gap-[15px]'>
          {breadcrumb}
          {title}
          <img src={imageUrl} className='block sm:hidden mt-[0px] w-[335px] h-[224px] object-cover sm:w-[393px] sm:h-[500px]' alt="About" />
          {description}
        </div>
        <img src={imageUrl} className='hidden rounded-xl sm:block mt-[61px] w-[335px] h-[224px] object-cover sm:w-[393px] sm:h-[500px]' alt="About" />
      </div>
    </div>
  )
}

export default History_main
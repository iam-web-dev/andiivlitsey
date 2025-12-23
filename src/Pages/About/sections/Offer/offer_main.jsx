import React, { useState, useEffect } from 'react'

import Loader_main from '../../../../Components/Loader/loader_main'

const Offer_main = ({ lang }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://ctrl.iivandijonlitsey.uz/api/about/?page=0', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'X-CSRFTOKEN': 'cZD7ovDEp57Gto4ZyPtfP42ARCfbvMVuoNsBzHd0BoNCrPRlsXmfEnWsW14Jo1Lh'
      }
    })
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
      charter: 'Litsey nizomi'
    },
    ru: {
      home: 'Главная',
      charter: 'Устав лицея'
    },
    en: {
      home: 'Home',
      charter: 'Lyceum Charter'
    }
  };

  const t = translations[lang] || translations.uz;

  const titleText = data[`title_${lang}`] || data.title_uz || data.title;
  const contentText = data[`content_${lang}`] || data.content_uz || data.content;

  const breadcrumb = (
    <h1 className='font-inter font-[600] text-[14px] sm:text-[18px] text-[#000000] hover:text-[#cfa92d] duration-150'>
      <a href="/">{t.home}</a> <span className='text-gray-400'>/</span> <span className='text-[#cfa92d]'>{t.charter}</span>
    </h1>
  );

  const title = (
    <h1 className='font-inter font-[700] text-[28px] sm:text-[36px] text-[#303030]'>{t.charter}</h1>
  );

  const description = (
    <p className='font-inter font-[400] text-[16px] sm:text-[18px] leading-[140%] text-[#303030]'
      dangerouslySetInnerHTML={{ __html: contentText.replace(/\r?\n/g, '<br />') }}>
    </p>
  );

  return (
    <div className='w-full h-full flex justify-center bg-[#FFFFFF]'>
      <div className='w-full sm:w-[1220px] sm:h-[706px] h-full flex flex-col gap-[10px] pt-[40px] px-[20px]'>
        <div className='flex flex-col gap-[40px] sm:gap-[15px]'>
          {breadcrumb}
          {title}
        </div>
        {description}
      </div>
    </div>
  )
}

export default Offer_main
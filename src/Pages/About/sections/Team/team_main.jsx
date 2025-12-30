import React, { useState, useEffect } from 'react'
import person from './Images/person.svg'

import Loader_main from '../../../../Components/Loader/loader_main'

const Team_main = ({ lang }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ctrl.iivandijonlitsey.uz/api/leadership/?page=1', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'X-CSRFTOKEN': 'cZD7ovDEp57Gto4ZyPtfP42ARCfbvMVuoNsBzHd0BoNCrPRlsXmfEnWsW14Jo1Lh'
      }
    })
      .then(response => response.json())
      .then(json => {
        setData(json.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader_main className="h-[400px]" />;
  }

  const translations = {
    uz: {
      home: 'Bosh sahifa',
      leadership: 'Rahbariyat',
      title: 'Rahbariyat',
      reception: 'Qabul kunlari:',
      phone: 'Telefon raqam:'
    },
    ru: {
      home: 'Главная',
      leadership: 'Руководство',
      title: 'Руководство',
      reception: 'Дни приема:',
      phone: 'Номер телефона:'
    },
    en: {
      home: 'Home',
      leadership: 'Leadership',
      title: 'Leadership',
      reception: 'Reception days:',
      phone: 'Phone number:'
    }
  };

  const t = translations[lang] || translations.uz;

  return (
    <div className='w-full h-full flex justify-center bg-[#FFFFFF] animate-fade-in'>
      <div className='w-full sm:w-[1220px] sm:h-[706px] h-full flex flex-col gap-[20px] pt-[40px] px-[20px]'>
        <div className='flex flex-col gap-[15px]'>
          <div className='font-inter font-[600] text-[14px] sm:text-[18px] text-[#000000] hover:text-[#cfa92d] duration-150'>
            <a href="/">{t.home}</a> <span className='text-gray-400'>/</span> <span className='text-[#cfa92d]'>{t.leadership}</span>
          </div>
          <h1 className='font-inter font-[700] text-[28px] sm:text-[36px] text-[#303030]'>{t.title}</h1>
        </div>

        <div className='w-full flex flex-col sm:flex-wrap h-full gap-[20px] sm:gap-x-[30px] sm:gap-y-[25px]'>
          {data.map((item) => (
            <div key={item.id} className='flex w-full sm:w-[650px] h-[158px] sm:h-auto gap-[20px]'>
              <img src={item.image || person} className='w-[104px] sm:w-[184px] h-[144px] sm:h-[245px] object-cover rounded-[6px]' alt={item.full_name} />

              <div className='flex flex-col gap-[20px] sm:gap-[40px]'>
                <div className='flex flex-col gap-[4px] sm:gap-[10px]'>
                  <h2 className='font-inter font-[600] text-[15px] sm:text-[24px] leading-[140%] text-[#303030]'>
                    {item[`full_name_${lang}`] || item.full_name_uz || item.full_name}
                  </h2>
                  <div className='font-inter font-[400] text-[14px] sm:text-[20px] leading-[140%] text-[#303030]'>
                    {item[`position_${lang}`] || item.position_uz || item.position}
                  </div>
                </div>

                <div className='flex flex-col gap-[10px]'>
                  <div className='font-inter font-[600] text-[14px] sm:text-[20px] leading-[140%] text-[#303030]'>
                    {t.reception} <span className='font-[400]'>{item[`reception_day_${lang}`] || item.reception_day_uz || item.reception_day}</span>
                  </div>
                  <div className='font-inter font-[600] text-[14px] sm:text-[20px] leading-[140%] text-[#303030] flex flex-col'>
                    <span>{t.phone}</span> <span className='font-[400]'>{item.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Team_main
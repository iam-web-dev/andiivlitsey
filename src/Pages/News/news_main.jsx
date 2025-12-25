import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import eye from './Images/eye.svg'
import eye_white from './Images/eye_white.svg'
import left from './Images/left.svg'
import right from './Images/right.svg'
import picture from './Images/picture.svg'

const News_main = ({ lang }) => {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, lang]);

  const fetchNews = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`http://ctrl.iivandijonlitsey.uz/api/news/?page=${page}`);
      const data = await response.json();
      setNews(data.results || []);
      setTotalPages(Math.ceil(data.count / 10)); // Assuming page size 10, adjust if needed
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const translations = {
    uz: {
      home: 'Bosh sahifa',
      news: 'Yangiliklar'
    },
    ru: {
      home: 'Главная',
      news: 'Новости'
    },
    en: {
      home: 'Home',
      news: 'News'
    }
  };

  const t = translations[lang] || translations.uz;

  const monthNames = {
    uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
    ru: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const formatDate = (created_at) => {
    const dateObj = new Date(created_at);
    const day = dateObj.getDate();
    const month = monthNames[lang]?.[dateObj.getMonth()] || monthNames.en[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day}-${month}, ${year}`;
  };

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[field] || '';
  };

  if (loading) {
    return <div className='w-full h-full flex justify-center items-center bg-[#FFFFFF]'>Loading...</div>;
  }

  // Assuming first news is main, then slice for lists
  const mainNews = news[0] || {};
  const listNews = news.slice(1);

  return (
    <div className='w-full h-full flex justify-center bg-[#FFFFFF]'>
      <div className='w-full sm:w-[1220px] overflow-hidden flex flex-col gap-[20px] pt-[40px] sm:px-[0px] px-[20px]'>

        <div className='flex flex-col gap-[15px]'>
          <h1 className='font-inter font-[600] text-[14px] sm:text-[18px] text-[#000000] hover:text-[#cfa92d] duration-150'>
            <a href="/">{t.home}</a> <span className='text-gray-400'>/</span> <span className='text-[#cfa92d]'>{t.news}</span>
          </h1>
          <h1 className='font-inter font-[700] text-[28px] sm:text-[36px] text-[#303030]'>{t.news}</h1>
        </div>

        <div className='flex gap-[21px]'>
          <div className='w-full sm:w-[806px] flex flex-col'>
            <Link to={`/news/${mainNews.id}`} className='group cursor-pointer w-full sm:w-[806px] h-[224px] sm:h-[538px] duration-300 hover:brightness-[70%] rounded-[6px] bg-black'>
              <img src={mainNews.image || picture} alt="" className='w-full sm:w-[806px] h-[224px] sm:h-[538px] opacity-[100%] rounded-[6px]' />
              <div className='ml-[20px] sm:ml-[30px] mt-[-86px] sm:mt-[-122px] brightness-[100%] w-[295px] sm:w-[540px] group-hover:opacity-[200%] flex flex-col gap-[10px] sm:gap-[11px]'>
                <h1 className='font-inter font-[700] text-[16px] sm:text-[24px] leading-[100%] text-[#FFFFFF]'>{getTranslated(mainNews, 'title')}</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[14px] sm:text-[18px] text-[#B7B8B7]'>
                  {formatDate(mainNews.created_at)} <span>|</span> <img src={eye} alt="" /> <span>{mainNews.views_count || 0}</span>
                </h1>
              </div>
            </Link>

            <div className='mt-[30px] w-full sm:w-[806px] flex flex-col sm:flex-wrap gap-x-[0px] sm:gap-x-[20px] gap-y-[0px] sm:gap-y-[0px]'>
              {listNews.slice(0, 4).map((item, idx) => (
                <Link to={`/news/${item.id}`} key={idx} className='flex flex-col gap-[8px] sm:gap-[11px] w-full sm:w-[393px]'>
                  <h1 className='font-inter font-[600] sm:font-[400] leading-[100%] text-[16px] sm:text-[20px] text-[#303030]'>{getTranslated(item, 'title')}</h1>
                  <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[14px] sm:text-[18px] text-[#C1C1C1]'>
                    {formatDate(item.created_at)} <span>|</span> <img src={eye_white} alt="" /> <span>{item.views_count || 0}</span>
                  </h1>
                  <div className="w-full h-[1px] bg-[#E0E0E0] my-[25px]"></div>
                </Link>
              ))}
            </div>
          </div>

          <div className='hidden sm:block flex flex-col gap-[60px]'>
            {listNews.slice(4, 10).map((item, idx) => (
              <Link to={`/news/${item.id}`} key={idx} className='flex flex-col gap-[8px] sm:gap-[11px] w-full sm:w-[393px]'>
                <h1 className='font-inter font-[600] sm:font-[400] leading-[100%] text-[16px] sm:text-[20px] text-[#303030]'>{getTranslated(item, 'title')}</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[14px] sm:text-[18px] text-[#C1C1C1]'>
                  {formatDate(item.created_at)} <span>|</span> <img src={eye_white} alt="" /> <span>{item.views_count || 0}</span>
                </h1>
                <div className="w-full h-[1px] bg-[#E0E0E0] my-[26px]"></div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className='flex flex-col sm:flex-row gap-[20px]'>
            {listNews.slice(0, 2).map((item, idx) => (
              <Link to={`/news/${item.id}`} key={idx} className='group cursor-pointer w-full sm:w-[600px] h-[224px] sm:h-[400px] duration-300 hover:brightness-[70%] rounded-[6px] bg-black'>
                <img src={item.image || picture} alt="" className='w-full sm:w-[600px] h-[224px] sm:h-[400px] opacity-[100%] rounded-[6px]' />
                <div className='ml-[20px] sm:ml-[30px] mt-[-86px] sm:mt-[-122px] brightness-[100%] w-[295px] sm:w-[540px] group-hover:opacity-[200%] flex flex-col gap-[8px] sm:gap-[11px]'>
                  <h1 className='font-inter font-[700] text-[16px] sm:text-[24px] leading-[100%] text-[#FFFFFF]'>{getTranslated(item, 'title')}</h1>
                  <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[14px] sm:text-[18px] text-[#B7B8B7]'>
                    {formatDate(item.created_at)} <span>|</span> <img src={eye} alt="" /> <span>{item.views_count || 0}</span>
                  </h1>
                </div>
              </Link>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row gap-[20px] mt-[30px]'>
            {listNews.slice(2, 4).map((item, idx) => (
              <Link to={`/news/${item.id}`} key={idx} className='flex flex-col gap-[11px] w-full sm:w-[393px] h-[82px]'>
                <h1 className='w-full sm:w-[393px] font-inter font-[700] sm:font-[400] leading-[100%] text-[16px] sm:text-[20px] text-[#303030]'>{getTranslated(item, 'title')}</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[14px] sm:text-[18px] text-[#C1C1C1]'>
                  {formatDate(item.created_at)} <span>|</span> <img src={eye_white} alt="" /> <span>{item.views_count || 0}</span>
                </h1>
                <div className="block sm:hidden w-full h-[1px] bg-[#E0E0E0]"></div>
              </Link>
            ))}
          </div>

          <div className='w-full flex justify-center mt-[60px]'>
            <div className='flex items-center gap-[10px] sm:gap-[20px]'>
              <img src={left} alt="" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="cursor-pointer" />
              {[...Array(totalPages)].map((_, idx) => (
                <div
                  key={idx}
                  className={`flex justify-center items-center w-[39px] sm:w-[50px] h-[41px] sm:h-[48px] rounded-[4px] font-inter font-[${currentPage === idx + 1 ? 700 : 400}] text-[14px] sm:text-[20px] leading-[100%] cursor-pointer ${currentPage === idx + 1 ? 'bg-[#14386F] text-[#FFFFFF]' : 'bg-white text-[#303030]'}`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </div>
              ))}
              <img src={right} alt="" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default News_main;
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router";
import { News } from '../../services/news';
import { AnnouncementsService } from '../../services/announcements';

const Home_main = ({ lang }) => {
  const [mediaCurrent, setMediaCurrent] = useState(0);
  const [newsSlides, setNewsSlides] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Assuming monthNames is defined somewhere, e.g.:
  const monthNames = {
    uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ru: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'] // Adjust as needed
  };

  // Assuming formatDate is defined
  const formatDate = (created_at) => {
    const dateObj = new Date(created_at);
    const day = dateObj.getDate();
    const month = monthNames[lang]?.[dateObj.getMonth()] || monthNames.en[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day}-${month}, ${year}`;
  };

  // Assuming getTranslated is defined
  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[field] || '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newsData, announcementsData] = await Promise.all([
          News.getNews(1),
          AnnouncementsService.getAnnouncements(1)
        ]);

        if (newsData && newsData.results) {
          const limitedNews = newsData.results.slice(0, 10);
          const formattedSlides = limitedNews.map((item) => ({
            img: item.image || "https://via.placeholder.com/1200x550?text=No+Image",
            category: lang === "uz" ? "Yangiliklar" : lang === "en" ? "News" : "Новости",
            date: formatDate(item.created_at),
            views: item.views_count || 0,
            title: getTranslated(item, 'title'),
            desc: getTranslated(item, 'short_description') || getTranslated(item, 'description'),
            id: item.id
          }));
          setNewsSlides(formattedSlides);
        }

        if (announcementsData && announcementsData.results) {
          setAnnouncements(announcementsData.results);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setNewsSlides([]);
        setAnnouncements([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  const mediaItems = [
    { type: "video", date: "12-dekabr, 2025", title: lang === "uz" ? "Video lavha 1" : lang === "en" ? "Video clip 1" : "Видео ролик 1" },
    { type: "photo", date: "13-dekabr, 2025", title: lang === "uz" ? "Rasm lavha 2" : lang === "en" ? "Photo gallery 2" : "Фото галерея 2" },
    { type: "video", date: "14-dekabr, 2025", title: lang === "uz" ? "Video lavha 3" : lang === "en" ? "Video clip 3" : "Видео ролик 3" },
    { type: "photo", date: "15-dekabr, 2025", title: lang === "uz" ? "Rasm lavha 4" : lang === "en" ? "Photo gallery 4" : "Фото галерея 4" },
    { type: "video", date: "16-dekabr, 2025", title: lang === "uz" ? "Video lavha 5" : lang === "en" ? "Video clip 5" : "Видео ролик 5" },
    { type: "photo", date: "17-dekabr, 2025", title: lang === "uz" ? "Rasm lavha 6" : lang === "en" ? "Photo gallery 6" : "Фото галерея 6" },
  ];

  const visibleAnnouncements = announcements.slice(0, windowWidth < 640 ? 3 : 6);

  // Auto slider faqat yangiliklar mavjud bo'lganda ishlaydi
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (newsSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % newsSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [newsSlides.length]);

  const handlePosterDot = (idx) => setCurrent(idx);

  if (loading) {
    return (
      <div className="w-full h-[550px] flex items-center justify-center bg-[#f4f4f4]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Slider faqat yangiliklar bo'lsa ko'rsatiladi */}
      {newsSlides.length > 0 && (
        <>
          <div className="relative w-full h-[550px] overflow-hidden">
            {newsSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute w-full h-full transition-opacity duration-1000 ${idx === current ? "opacity-100 z-20" : "opacity-0 z-0"
                  }`}
              >
                <div className="absolute bg-[#303030] opacity-60 w-full h-full z-10" />
                <div className="absolute w-full xl:pl-[110px] lg:pl-[80px] sm:pl-[60px] pl-[20px] xl:pb-[120px] lg:pb-[80px] sm:pb-[60px] pb-[40px] flex flex-col text-white justify-end gap-[10px] h-full z-20">
                  <div className="flex flex-row items-center text-[16px] sm:text-[18px] leading-[120%] sm:gap-[4px]">
                    <div>{slide.category}</div>
                    <hr className="w-[22px] rotate-90" />
                    <div>{slide.date}</div>
                    <hr className="w-[22px] rotate-90" />
                    <div className="flex flex-row gap-[5px] sm:gap-[7px]">
                      <Eye width={22} height={22} /> {slide.views}
                    </div>
                  </div>
                  <p className="text-[32px] sm:text-[36px] md:text-[38px] lg:text-[42px] text-[#FFD859] font-[700] xl:max-w-[50%] lg:max-w-[60%] md:max-w-[70%] max-w-[80%] leading-[120%] line-clamp-2">
                    {slide.title}
                  </p>
                  <p className="text-[16px] sm:text-[16px] lg:text-[18px] font-[400] xl:max-w-[50%] lg:max-w-[60%] md:max-w-[70%] max-w-[80%] leading-[120%] line-clamp-2">
                    {slide.desc}
                  </p>
                </div>
                <img src={slide.img} alt="slide" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex gap-[8px] mt-[22px]">
            {newsSlides.map((_, idx) => (
              <div
                key={idx}
                onClick={() => handlePosterDot(idx)}
                className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-all duration-300 ${current === idx ? "bg-[#FFD859]" : "bg-gray-400/50"
                  }`}
              />
            ))}
          </div>
        </>
      )}

      {/* E'lonlar bo'limi har doim ko'rinadi */}
      <div className={`w-full lg:px-[110px] md:px-[55px] px-[20px] ${newsSlides.length > 0 ? "mt-[60px] sm:mt-[80px]" : "mt-[40px]"}`}>
        <div className="flex flex-row items-center justify-between">
          <p className="xl:text-[36px] lg:text-[32px] text-[28px] text-[#303030] font-[700] tracking-tight">
            {lang === "uz" ? "E'lonlar" : lang === "en" ? "Announcements" : "Объявления"}
          </p>
          <Link
            to="/announcements"
            className="sm:text-[18px] text-[16px] text-[#cfa92d] font-[400] hover:scale-[102%] active:scale-[99%] duration-300"
          >
            {lang === "uz" ? "Barchasi" : lang === "en" ? "All" : "Все"}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-[20px] sm:mt-[30px]">
          {visibleAnnouncements.map((item) => (
            <Link
              key={item.id}
              to={`/announcements/${item.id}`}
              className="pl-[20px] pr-[20px] flex flex-col gap-[10px] py-[30px] w-full border border-[#52525289] rounded-[10px] shadow-lg hover:shadow-xl hover:scale-[102%] active:scale-[99%] duration-300 group cursor-pointer bg-white"
            >
              <div className="flex flex-row items-center text-[16px] sm:text-[18px] text-[#52525289] leading-[130%] gap-[10px]">
                <div>{formatDate(item.created_at)}</div>
                <hr className="w-[22px] rotate-90" />
                <div className="flex flex-row gap-[7px]">
                  <Eye width={22} height={22} /> {item.views_count || 0}
                </div>
              </div>
              <p className="text-[20px] sm:text-[24px] text-[#303030] group-hover:text-[#cfa92d] duration-300 font-[700] leading-[130%] line-clamp-2">
                {getTranslated(item, 'title')}
              </p>
              <p className="text-[16px] sm:text-[18px] text-[#525252] font-[400] leading-[130%] line-clamp-3">
                {getTranslated(item, 'short_description') || getTranslated(item, 'description')}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Media bo'limi har doim ko'rinadi */}
      <div className="w-full lg:px-[110px] md:px-[55px] px-[20px] mt-[80px]">
        <div className="flex flex-row items-center justify-between mb-5">
          <p className="text-[28px] sm:text-[36px] text-[#303030] font-[700] tracking-tight">Media</p>
          <div className="flex flex-row gap-[10px] sm:gap-[20px]">
            <button
              onClick={() => setMediaCurrent((prev) => Math.max(prev - 1, 0))}
              disabled={mediaCurrent === 0}
              className={`rounded-[6px] flex items-center justify-center w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] ${mediaCurrent === 0
                ? "bg-[#E0E0E0] text-[#52525289] cursor-not-allowed"
                : "bg-[#FFD859] text-[#303030] cursor-pointer hover:scale-[101%] active:scale-[99%]"
                }`}
            >
              <ArrowLeft className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]" />
            </button>

            <button
              onClick={() =>
                setMediaCurrent((prev) =>
                  Math.min(prev + 1, mediaItems.length - (windowWidth < 640 ? 1 : 2))
                )
              }
              disabled={mediaCurrent === mediaItems.length - (windowWidth < 640 ? 1 : 2)}
              className={`rounded-[6px] flex items-center justify-center w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] ${mediaCurrent === mediaItems.length - (windowWidth < 640 ? 1 : 2)
                ? "bg-[#E0E0E0] text-[#52525289] cursor-not-allowed"
                : "bg-[#FFD859] text-[#303030] cursor-pointer hover:scale-[101%] active:scale-[99%]"
                }`}
            >
              <ArrowRight className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: windowWidth < 640
                ? `translateX(calc(-${mediaCurrent} * (100% + 15px)))`
                : `translateX(-${mediaCurrent * 620}px)`
            }}
          >
            {mediaItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 ${windowWidth < 640 ? "w-full mr-[15px]" : "w-[600px] mr-[20px]"}`}
              >
                <div className="bg-gray-300 w-full h-[250px] sm:h-[400px] rounded-[6px] flex items-center justify-center text-[24px] font-[700] text-[#303030]">
                  {item.type === "video"
                    ? lang === "uz"
                      ? "Video"
                      : lang === "en"
                        ? "Video"
                        : "Видео"
                    : lang === "uz"
                      ? "Rasm"
                      : lang === "en"
                        ? "Photo"
                        : "Фото"}
                </div>
                <div className="mt-3 text-[16px] sm:text-[18px] text-[#303030]">
                  <p className="font-[400]">{item.date}</p>
                  <p className="font-[700]">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_main;
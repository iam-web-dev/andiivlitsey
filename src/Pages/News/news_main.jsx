import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Eye } from "lucide-react";
import eye from "./Images/eye.svg";
import eye_white from "./Images/eye_white.svg";
import left from "./Images/left.svg";
import right from "./Images/right.svg";
import picture from "./Images/picture.svg";
import Loader_main from "../../Components/Loader/loader_main";

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
      const response = await fetch(
        `https://ctrl.iivandijonlitsey.uz/api/news/`
      );
      const data = await response.json();
      setNews(data.results || []);
      setTotalPages(Math.ceil(data.count / 10)); // Assuming page size 10, adjust if needed
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  const translations = {
    uz: {
      home: "Bosh sahifa",
      news: "Yangiliklar",
    },
    ru: {
      home: "Главная",
      news: "Новости",
    },
    en: {
      home: "Home",
      news: "News",
    },
  };

  const t = translations[lang] || translations.uz;

  const monthNames = {
    uz: [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentyabr",
      "oktyabr",
      "noyabr",
      "dekabr",
    ],
    ru: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  const formatDate = (created_at) => {
    const dateObj = new Date(created_at);
    const day = dateObj.getDate();
    const month =
      monthNames[lang]?.[dateObj.getMonth()] ||
      monthNames.en[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day}-${month}, ${year}`;
  };

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[field] || "";
  };

  if (loading) {
    return <Loader_main className="h-[500px]" />;
  }

  // Assuming first news is main, then slice for lists
  const mainNews = news[0] || {};
  const listNews = news.slice(1);

  return (
    <div className="w-full h-full flex justify-center bg-[#FFFFFF] animate-fade-in">
      <div className="w-full max-w-[1260px] overflow-hidden flex flex-col gap-[20px] pt-[40px] px-[20px] lg:px-[20px] xl:px-0">
        <div className="flex flex-col gap-6 mb-12">
          <nav className="flex items-center gap-3 text-sm sm:text-base font-medium">
            <a
              href="/"
              className="text-gray-400 hover:text-[#cfa92d] transition-colors"
            >
              {t.home}
            </a>
            <span className="text-gray-300">/</span>
            <span className="text-[#cfa92d] font-semibold">{t.news}</span>
          </nav>

          <div className="relative pl-6">
            <div className="absolute left-0 top-1 w-1 h-8 bg-[#cfa92d] rounded-full"></div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
              {t.news}
            </h1>
            <p className="mt-2 text-slate-500 text-base sm:text-lg max-w-2xl leading-relaxed">
              {lang === "uz"
                ? "Litsey hayotidagi eng so'nggi va muhim yangiliklar"
                : lang === "ru"
                ? "Самые последние и важные новости из жизни лицея"
                : "The latest and most important news from our lyceum"}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[21px]">
          <div className="w-full md:flex-[2] flex flex-col">
            <Link
              to={`/news/${mainNews.slug}`}
              className="group cursor-pointer w-full min-h-[224px] sm:h-[400px] md:h-[538px] duration-300 hover:brightness-[90%] rounded-[6px] bg-black relative overflow-hidden"
            >
              <img
                src={mainNews.image || picture}
                alt=""
                className="w-full h-full object-cover opacity-[70%] group-hover:opacity-[80%] duration-300"
              />
              <div className="absolute bottom-[20px] sm:bottom-[40px] left-[20px] sm:left-[30px] w-[90%] sm:w-[80%] flex flex-col gap-[10px] sm:gap-[15px] z-10">
                <div className="flex items-center gap-[10px] font-inter font-[400] text-[14px] sm:text-[18px] text-[#FFFFFF]/80">
                  {formatDate(mainNews.created_at)}{" "}
                  <span className="mx-1">|</span>{" "}
                  <img src={eye} alt="" className="w-4 h-4" />{" "}
                  <span>{mainNews.views_count || 0}</span>
                </div>
                <h2 className="font-inter font-[700] text-[18px] sm:text-[32px] leading-[120%] text-[#FFFFFF] line-clamp-2">
                  {getTranslated(mainNews, "title")}
                </h2>
                <p className="font-inter font-[400] text-[14px] sm:text-[18px] text-[#FFFFFF]/90 line-clamp-2">
                  {getTranslated(mainNews, "short_description")}
                </p>
              </div>
            </Link>

            <div className="mt-[30px] w-full flex flex-col gap-y-[20px]">
              {listNews.slice(0, 4).map((item, idx) => (
                <Link
                  to={`/news/${item.slug}`}
                  key={idx}
                  className="flex flex-col gap-[8px] sm:gap-[12px] w-full group"
                >
                  <div className="flex flex-row items-center text-[13px] sm:text-[15px] text-[#B7B7B7] gap-[10px]">
                    <span>{formatDate(item.created_at)}</span>
                    <span className="w-[1px] h-[12px] bg-[#E0E0E0]"></span>
                    <span className="flex items-center gap-1">
                      <Eye size={16} /> {item.views_count || 0}
                    </span>
                  </div>
                  <h3 className="font-inter font-[600] text-[18px] sm:text-[22px] text-[#303030] group-hover:text-[#cfa92d] duration-300 line-clamp-2">
                    {getTranslated(item, "title")}
                  </h3>
                  <p className="font-inter font-[400] text-[15px] sm:text-[17px] text-[#525252] line-clamp-2">
                    {getTranslated(item, "short_description")}
                  </p>
                  <div className="w-full h-[1px] bg-[#E0E0E0] mt-[10px]"></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:flex-[1] flex-col gap-[20px]">
            {listNews.slice(4, 10).map((item, idx) => (
              <Link
                to={`/news/${item.slug}`}
                key={idx}
                className="flex flex-col gap-[8px] sm:gap-[12px] w-full group"
              >
                <div className="flex flex-row items-center text-[13px] sm:text-[15px] text-[#B7B7B7] gap-[10px]">
                  <span>{formatDate(item.created_at)}</span>
                  <span className="w-[1px] h-[12px] bg-[#E0E0E0]"></span>
                  <span className="flex items-center gap-1">
                    <Eye size={16} /> {item.views_count || 0}
                  </span>
                </div>
                <h3 className="font-inter font-[600] text-[18px] sm:text-[22px] text-[#303030] group-hover:text-[#cfa92d] duration-300 line-clamp-2">
                  {getTranslated(item, "title")}
                </h3>
                <p className="font-inter font-[400] text-[15px] sm:text-[17px] text-[#525252] line-clamp-2">
                  {getTranslated(item, "short_description")}
                </p>
                <div className="w-full h-[1px] bg-[#E0E0E0] mt-[10px]"></div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row gap-[20px]">
            {listNews.slice(0, 2).map((item, idx) => (
              <Link
                to={`/news/${item.slug}`}
                key={idx}
                className="group cursor-pointer w-full md:w-1/2 h-[224px] sm:h-[400px] duration-300 hover:brightness-[70%] rounded-[6px] bg-black"
              >
                <img
                  src={item.image || picture}
                  alt=""
                  className="w-full h-full object-cover opacity-[100%] rounded-[6px]"
                />
                <div className="ml-[20px] sm:ml-[30px] mt-[-86px] sm:mt-[-122px] brightness-[100%] w-[90%] group-hover:opacity-[200%] flex flex-col gap-[8px] sm:gap-[11px]">
                  <h3 className="font-inter font-[700] text-[16px] sm:text-[24px] leading-[100%] text-[#FFFFFF]">
                    {getTranslated(item, "title")}
                  </h3>
                  <div className="flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[14px] sm:text-[18px] text-[#B7B8B7]">
                    {formatDate(item.created_at)} <span>|</span>{" "}
                    <img src={eye} alt="" />{" "}
                    <span>{item.views_count || 0}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-[20px] mt-[30px]">
            {listNews.slice(2, 4).map((item, idx) => (
              <Link
                to={`/news/${item.slug}`}
                key={idx}
                className="flex flex-col gap-[11px] w-full md:w-1/3"
              >
                <h3 className="w-full font-inter font-[700] sm:font-[400] leading-[100%] text-[16px] sm:text-[20px] text-[#303030]">
                  {getTranslated(item, "title")}
                </h3>
                <div className="flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[14px] sm:text-[18px] text-[#C1C1C1]">
                  {formatDate(item.created_at)} <span>|</span>{" "}
                  <img src={eye_white} alt="" />{" "}
                  <span>{item.views_count || 0}</span>
                </div>
                <div className="block md:hidden w-full h-[1px] bg-[#E0E0E0]"></div>
              </Link>
            ))}
          </div>

          <div className="w-full flex justify-center mt-[60px]">
            <div className="flex items-center gap-[10px] sm:gap-[20px]">
              <img
                src={left}
                alt=""
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="cursor-pointer"
              />
              {[...Array(totalPages)].map((_, idx) => (
                <div
                  key={idx}
                  className={`flex justify-center items-center w-[39px] sm:w-[50px] h-[41px] sm:h-[48px] rounded-[4px] font-inter font-[${
                    currentPage === idx + 1 ? 700 : 400
                  }] text-[14px] sm:text-[20px] leading-[100%] cursor-pointer ${
                    currentPage === idx + 1
                      ? "bg-[#14386F] text-[#FFFFFF]"
                      : "bg-white text-[#303030]"
                  }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </div>
              ))}
              <img
                src={right}
                alt=""
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News_main;

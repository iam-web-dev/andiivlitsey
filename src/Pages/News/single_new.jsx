import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import picture from "./Images/picture.svg";
import eye from "./Images/eye.svg";
import Loader_main from "../../Components/Loader/loader_main";

const Single_new = ({ lang }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [singleNews, setSingleNews] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSingleNews();
    fetchOtherNews();
  }, [slug, lang]);

  const fetchSingleNews = async () => {
    try {
      const response = await fetch(
        `https://ctrl.iivandijonlitsey.uz/api/news/${slug}/`
      );
      if (!response.ok) {
        navigate("/404", { replace: true });
        return;
      }
      const data = await response.json();
      if (!data) {
        navigate("/404", { replace: true });
        return;
      }
      setSingleNews(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching single news:", error);
      navigate("/404", { replace: true });
    }
  };

  const fetchOtherNews = async () => {
    try {
      const response = await fetch(
        "https://ctrl.iivandijonlitsey.uz/api/news/"
      );
      const data = await response.json();
      setOtherNews(
        (data.results || []).filter((item) => item.slug !== slug).slice(0, 4)
      );
    } catch (error) {
      console.error("Error fetching other news:", error);
    }
  };

  const translations = {
    uz: {
      home: "Bosh sahifa",
      news: "Yangiliklar",
      otherNews: "Boshqa yangiliklar",
    },
    ru: {
      home: "Главная",
      news: "Новости",
      otherNews: "Другие новости",
    },
    en: {
      home: "Home",
      news: "News",
      otherNews: "Other news",
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
    if (!item) return "";
    return item[`${field}_${lang}`] || item[field] || "";
  };

  if (loading || !singleNews) {
    return <Loader_main className="h-[500px]" />;
  }

  return (
    <div className="w-full h-full flex justify-center bg-[#FFFFFF] animate-fade-in">
      <div className="w-full max-w-[1260px] h-full overflow-hidden flex flex-col md:flex-row gap-[40px] pt-[40px] px-[20px] lg:px-[20px] xl:px-0">
        <div className="flex flex-col w-full md:flex-[2] h-full">
          <div className="flex flex-col gap-[15px]">
            <h1 className="font-inter font-[600] text-[14px] sm:text-[18px] text-[#000000] hover:text-[#cfa92d] duration-150">
              <a href="/">{t.home}</a> <span className="text-gray-400">/</span>{" "}
              <span className="text-[#cfa92d]">{t.news}</span>
            </h1>
            <h1 className="font-inter font-[700] w-full text-[28px] sm:text-[36px] text-[#303030]">
              {getTranslated(singleNews, "title")}
            </h1>
            <div className="flex flex-row items-center text-[14px] sm:text-[16px] text-[#979797] gap-[15px]">
              <span>{formatDate(singleNews.created_at)}</span>
              <span className="w-[1px] h-[15px] bg-[#E0E0E0]"></span>
              <div className="flex items-center gap-1">
                <img src={eye} alt="views" className="w-4 h-4" />
                <span>{singleNews.views_count || 0}</span>
              </div>
            </div>
          </div>

          <img
            src={singleNews.image || picture}
            className="mt-[20px] w-full max-w-[800px] h-[224px] object-cover sm:h-[407px] rounded-[6px]"
            alt=""
            fetchPriority="high"
          />

          <p
            className="mt-[20px] font-inter font-[400] text-[16px] sm:text-[18px] leading-[140%] text-[#303030]"
            dangerouslySetInnerHTML={{
              __html: getTranslated(singleNews, "content").replace(
                /\r?\n/g,
                "<br />"
              ),
            }}
          ></p>
        </div>

        <div className="flex flex-col md:flex-[1] gap-[20px] md:mt-[43px]">
          <h1 className="font-inter font-[700] text-[20px] leading-[140%] text-[#303030]">
            {t.otherNews}
          </h1>
          <div className="flex flex-col gap-[20px]">
            {otherNews.map((item, idx) => (
              <Link
                to={`/news/${item.slug}`}
                key={idx}
                className="flex flex-col"
              >
                <h1 className="font-inter font-[400] text-[16px] sm:text-[18px] leading-[140%] text-[#303030]">
                  {getTranslated(item, "title")}
                </h1>
                <h1 className="mt-[10px] font-inter font-[400] text-[14px] sm:text-[16px] text-[#B7B7B7]">
                  {formatDate(item.created_at)}
                </h1>
                <div className="w-full bg-[#E0E0E0] h-[1px] mt-[20px]"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single_new;

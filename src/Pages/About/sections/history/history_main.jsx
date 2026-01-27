import React, { useState, useEffect } from "react";
import eye from "./Images/eye.svg";
import left from "./Images/left.svg";
import right from "./Images/right.svg";

import Loader_main from "../../../../Components/Loader/loader_main";

const History_main = ({ lang }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://ctrl.iivandijonlitsey.uz/api/about/1")
      .then((response) => response.json())
      .then(setData)
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <Loader_main className="h-[400px]" />;
  }

  const translations = {
    uz: {
      home: "Bosh sahifa",
      about: "Litsey haqida",
    },
    ru: {
      home: "Главная",
      about: "О лицее",
    },
    en: {
      home: "Home",
      about: "About the Lyceum",
    },
  };

  const t = translations[lang] || translations.uz;

  const titleText = data[`title_${lang}`] || data.title_uz || data.title;
  const contentText =
    data[`content_${lang}`] || data.content_uz || data.content;
  const imageUrl = data.image;

  const breadcrumb = (
    <div className="flex items-center gap-2 font-inter font-medium text-sm sm:text-base text-gray-400 mb-2">
      <a
        href="/"
        className="hover:text-[#cfa92d] transition-colors duration-200"
      >
        {t.home}
      </a>
      <span>/</span>
      <span className="text-[#cfa92d] font-semibold">{t.about}</span>
    </div>
  );

  const title = (
    <h1 className="font-inter font-bold text-3xl sm:text-5xl text-[#1a1a1a] tracking-tight leading-tight">
      {titleText}
    </h1>
  );

  const description = (
    <div
      className="font-inter font-normal text-lg sm:text-xl leading-relaxed text-[#4a4a4a] space-y-4"
      dangerouslySetInnerHTML={{
        __html: contentText.replace(/\r?\n/g, "<br />"),
      }}
    ></div>
  );

  return (
    <div className="w-full min-h-screen flex justify-center bg-white animate-fade-in pb-20">
      <div className="w-full max-w-[1220px] flex flex-col pt-10 px-5 md:px-0">
        {/* Navigation & Title Section */}
        <div className="flex flex-col gap-6 mb-12">
          {breadcrumb}
          <div className="flex flex-col gap-4">
            {title}
            <div className="w-20 h-1.5 bg-[#cfa92d] rounded-full"></div>
          </div>
        </div>

        {/* Content Section with Image */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-gray-50/50 rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm content-wrapper">
              {description}
            </div>
          </div>

          {imageUrl && (
            <div className="w-full lg:w-[400px] order-1 lg:order-2">
              <img
                src={imageUrl}
                className="w-full h-[300px] sm:h-[500px] object-cover rounded-3xl"
                alt={titleText}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History_main;

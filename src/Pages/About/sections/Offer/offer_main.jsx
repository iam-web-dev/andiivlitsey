import React, { useState, useEffect } from "react";

import Loader_main from "../../../../Components/Loader/loader_main";

const Offer_main = ({ lang }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://ctrl.iivandijonlitsey.uz/api/charter/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-CSRFTOKEN":
          "qqB3cWqPs0bviSVmFJ369y9Z9D712vaYxoGFn015EEQznb3WTtrnvlDG1MJL43Nf",
      },
    })
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
      charter: "Litsey nizomi",
    },
    ru: {
      home: "Главная",
      charter: "Устав лицея",
    },
    en: {
      home: "Home",
      charter: "Lyceum Charter",
    },
  };

  const t = translations[lang] || translations.uz;

  const titleText = data[`title_${lang}`] || data.title_uz || data.title || "";
  const contentText =
    data[`content_${lang}`] || data.content_uz || data.content || "";

  const breadcrumb = (
    <div className="flex items-center gap-2 font-inter font-medium text-sm sm:text-base text-gray-500 mb-2">
      <a
        href="/"
        className="hover:text-[#cfa92d] transition-colors duration-200"
      >
        {t.home}
      </a>
      <span className="text-gray-300">/</span>
      <span className="text-[#cfa92d] font-semibold">{t.charter}</span>
    </div>
  );

  const title = (
    <h1 className="font-inter font-bold text-3xl sm:text-5xl text-[#1a1a1a] tracking-tight leading-tight">
      {titleText}
    </h1>
  );

  const description = (
    <p
      className="font-inter font-normal text-lg sm:text-xl leading-loose text-[#4a4a4a]"
      dangerouslySetInnerHTML={{
        __html: contentText.replace(/\r?\n/g, "<br /><br />"),
      }}
    ></p>
  );

  return (
    <div className="w-full min-h-screen flex justify-center bg-white animate-fade-in pb-20">
      <div className="w-full max-w-[1220px] flex flex-col pt-10 px-5 md:px-0">
        {/* Navigation & Title Section */}
        <div className="flex flex-col gap-6 mb-12">
          {breadcrumb}
          <div className="flex flex-col gap-4">
            {title}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gray-50/50 rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm">
          <div className="prose prose-lg max-w-none">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Offer_main;

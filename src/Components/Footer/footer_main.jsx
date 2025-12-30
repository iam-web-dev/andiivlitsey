import React, { useState, useEffect } from "react";
import nsd_logo from "../nsd_logo.png";

// Ikonlarni to'g'ridan-to'g'ri import qilamiz
import facebookIcon from "./Images/facebook.svg";
import instagramIcon from "./Images/instagram.svg";
import telegramIcon from "./Images/telegram.svg";
import { Link } from "react-router";

const Footer_main = ({ lang }) => {
  const [contact, setContact] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactRes, socialRes] = await Promise.all([
          fetch("https://ctrl.iivandijonlitsey.uz/api/contact/"),
          fetch("https://ctrl.iivandijonlitsey.uz/api/social-links/"),
        ]);

        const contactData = await contactRes.json();
        const socialData = await socialRes.json();

        setContact(contactData);
        setSocialLinks(socialData.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching footer data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const translations = {
    uz: {
      social: "Ijtimoiy tarmoqlar",
      contact: "Bog‘lanish",
      address: "Manzil",
      email: "Email",
      title: "Ichki ishlar vazirligi Andijon viloyati akademik litseyi",
      copyright: "© 2018-2025. Barcha huquqlar himoyalangan",
    },
    ru: {
      social: "Социальные сети",
      contact: "Контакты",
      address: "Адрес",
      email: "Email",
      title:
        "Академический лицей Андижанской области Министерства внутренних дел",
      copyright: "© 2018-2025. Все права защищены",
    },
    en: {
      social: "Social Networks",
      contact: "Contact",
      address: "Address",
      email: "Email",
      title:
        "Academic Lyceum of Andijan Region under the Ministry of Internal Affairs",
      copyright: "© 2018-2025. All rights reserved",
    },
  };

  const t = translations[lang] || translations.uz;

  const getTranslated = (field) => {
    if (!contact) return "";
    return contact[`${field}_${lang}`] || contact[field] || "";
  };

  // Backenddan kelgan name ga qarab to'g'ri import qilingan ikonni beramiz
  const iconMap = {
    facebook: facebookIcon,
    instagram: instagramIcon,
    telegram: telegramIcon,
  };

  if (loading || !contact) {
    return <div className="w-full h-[200px] bg-[#14386F]" />;
  }

  return (
    <div className="w-full min-h-fit bg-[#14386F] flex flex-col items-center pt-[60px] sm:pt-[80px] pb-[40px] sm:pb-[60px]">
      <div className="w-full px-[20px] md:px-[40px] lg:px-[60px] xl:px-0 xl:w-[1220px]">
        <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-[30px] md:gap-y-[40px] xl:gap-[120px]">
          <div className="flex flex-col gap-[20px]">
            <h1 className="font-inter font-[600] text-[18px] sm:text-[20px] leading-[100%] text-[#FFFFFF] whitespace-nowrap">
              {t.social}
            </h1>
            <div className="flex flex-row gap-[30px]">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${
                    link.name_display || link.name
                  } - Andijon IIV litseyi rasmiy sahifasi`}
                  className="hover:opacity-80 transition-opacity duration-300 flex items-center gap-2 group"
                >
                  <img
                    src={iconMap[link.name]} // Import qilingan ikon
                    alt={link.name_display || link.name}
                    className="w-[32px] h-[32px]"
                  />
                  <span className="sr-only">
                    {link.name_display || link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px] sm:gap-[20px]">
            <h1 className="font-inter font-[600] text-[18px] sm:text-[20px] text-[#FFFFFF]">
              {t.contact}
            </h1>
            <h1 className="font-inter font-[400] text-[16px] sm:text-[18px] text-[#B5D3FF] whitespace-nowrap">
              {contact.phone}
            </h1>
            {contact.phone2 && (
              <h1 className="font-inter font-[400] text-[16px] sm:text-[18px] text-[#B5D3FF] whitespace-nowrap">
                {contact.phone2}
              </h1>
            )}
          </div>

          <div className="flex flex-col gap-[10px] sm:gap-[20px]">
            <h1 className="font-inter font-[600] text-[18px] sm:text-[20px] text-[#FFFFFF]">
              {t.address}
            </h1>
            <h1 className="w-full sm:w-[300px] font-inter font-[400] text-[16px] sm:text-[18px] text-[#B5D3FF]">
              {getTranslated("address")}
            </h1>
          </div>

          <div className="flex flex-col gap-[10px] sm:gap-[20px]">
            <h1 className="font-inter font-[600] text-[18px] sm:text-[20px] text-[#FFFFFF]">
              {t.email}
            </h1>
            <a
              href={`mailto:${contact.email}`}
              className="font-inter font-[400] text-[16px] sm:text-[18px] text-[#B5D3FF] hover:underline"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center mt-[40px] md:mt-[60px] xl:mt-[80px] gap-[20px] md:gap-[0px]">
          <div className="w-full md:w-[350px] xl:w-[283px] font-inter font-[700] text-[18px] sm:text-[20px] text-[#FFFFFF]">
            {lang === "uz"
              ? "Ichki ishlar vazirligi Andijon"
              : lang === "en"
              ? "MIA Andijan"
              : "МВД Андижанский"}
            <br />
            {lang === "uz"
              ? "viloyati akademik litseyi"
              : lang === "en"
              ? "regional academic lyceum"
              : "областной академический лицей"}
          </div>
          <Link
            to="https://t.me/nsd_corporation"
            className="flex flex-col text-white font-[600] text-[13px] cursor-pointer"
          >
            <p className="pl-[12px] md:pr-[13px] font-oregano text-[16px] font-[400]">
              Powered by
            </p>
            <img
              src={nsd_logo}
              className="w-[250px] h-auto"
              alt="NSD Corporation"
            />
          </Link>
        </div>

        <div className="flex flex-col sm:items-center">
          <div className="w-full h-[1px] bg-[#7892ba] mt-[40px] md:mt-[60px]"></div>
          <h1 className="mt-[10px] font-inter font-[400] text-[16px] sm:text-[18px] text-[#6485B7]">
            {t.copyright}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer_main;

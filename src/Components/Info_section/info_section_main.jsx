import { Facebook, Headset, Instagram, Mail, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ContactsService } from "../../Services/contacts";
import { SocialLinksService } from "../../Services/social_links";

const Info_section_main = ({ lang, setLang }) => {
  const [contactInfo, setContactInfo] = useState({
    phone: "...",
    email: "...",
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: "#",
    instagram: "#",
    telegram: "#"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactData, socialData] = await Promise.all([
          ContactsService.getContacts(),
          SocialLinksService.getSocialLinks()
        ]);

        if (contactData) {
          console.log(contactData)
          setContactInfo(contactData);
        }

        if (socialData && socialData.results) {
          const links = socialData.results.reduce((acc, item) => {
            if (item.name === 'facebook') acc.facebook = item.url;
            if (item.name === 'instagram') acc.instagram = item.url;
            if (item.name === 'telegram' || item.name === 'send') acc.telegram = item.url;
            return acc;
          }, { facebook: "#", instagram: "#", telegram: "#" });
          setSocialLinks(links);
        }
      } catch (error) {
        console.error("Failed to fetch info section data:", error);
      }
    };
    fetchData();
  }, []);

  function change_lang(l) {
    setLang(l);
  }


  const formatPhone = (phone) => {
    if (!phone) return "";

    let digits = phone.replace(/\D/g, "");

    if (digits.startsWith("998")) {
      digits = digits.slice(3);
    }

    if (digits.length === 9) {
      return `+998 ${digits.replace(
        /(\d{2})(\d{3})(\d{2})(\d{2})/,
        "$1 $2 $3 $4"
      )}`;
    }

    return phone;
  };



  return (
    <div className="w-full sm:h-[60px] h-[40px] bg-[#FFD859] xl:px-[110px] lg:px-[60px] md:px-[30px] px-[20px] flex items-center xl:justify-between lg:justify-between md:justify-center justify-center text-[#303030]">
      <div className="flex flex-row gap-[20px]">
        {/* Phone */}
        <a
          href={`tel:${contactInfo.phone}`}
          className="flex flex-row gap-[5px] justify-center items-center hover:scale-[102%] active:scale-[99%] cursor-pointer duration-300"
        >
          <Headset className="shrink-0 md:w-[22px] md:h-[22px] w-[15px] h-[15px]" />
          <p className="xl:text-[18px] flex gap-[3px] lg:text-[16px] md:text-[14px] text-[13px] font-[400] whitespace-nowrap">
            {formatPhone(contactInfo.phone)}
            <span className="md:block hidden">
              {lang === "uz" ? "(navbatchi)" : lang === "en" ? "(duty officer)" : "(дежурный)"}
            </span>
          </p>
        </a>

        <a
          href={`mailto:${contactInfo.email}`}
          className="flex flex-row gap-[5px] justify-center items-center hover:scale-[102%] active:scale-[99%] cursor-pointer duration-300"
        >
          <Mail className="shrink-0 md:w-[22px] md:h-[22px] w-[15px] h-[15px]" />
          <p className="xl:text-[18px] lg:text-[16px] md:text-[14px] text-[13px] font-[400]">
            {contactInfo.email}
          </p>
        </a>
      </div>

      <div className="hidden lg:flex flex-row gap-[40px] items-center justify-center">
        {/* Socials */}
        <div className="flex flex-row items-center justify-center gap-[30px]">
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="cursor-pointer hover:scale-[110%] active:scale-[95%] duration-300">
            <Facebook width={26} height={26} />
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="cursor-pointer hover:scale-[110%] active:scale-[95%] duration-300">
            <Instagram width={26} height={26} />
          </a>
          <a href={socialLinks.telegram} target="_blank" rel="noreferrer" className="cursor-pointer hover:scale-[110%] active:scale-[95%] duration-300">
            <Send width={26} height={26} />
          </a>
        </div>

        <hr className="w-[24px] rotate-90 border-[#303030]" />

        {/* Language Switcher */}
        <div className="flex flex-row gap-[20px] text-[#303030]">
          <p
            onClick={() => change_lang("uz")}
            className={`text-[18px] ${lang === "uz" ? "text-[#906e00] font-[600]" : "font-[400]"} cursor-pointer`}
          >
            O'z
          </p>
          <p
            onClick={() => change_lang("ru")}
            className={`text-[18px] ${lang === "ru" ? "text-[#906e00] font-[600]" : "font-[400]"} cursor-pointer`}
          >
            Ру
          </p>
          <p
            onClick={() => change_lang("en")}
            className={`text-[18px] ${lang === "en" ? "text-[#906e00] font-[600]" : "font-[400]"} cursor-pointer`}
          >
            En
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info_section_main;

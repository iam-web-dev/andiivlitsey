import { Link, useLocation } from "react-router";
import logo from "../logo.jpg";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Facebook, Instagram, Send } from "lucide-react";

const Navbar_main = ({ lang, setLang }) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const timerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let timer;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      timer = setTimeout(() => setOpenSubMenuIndex(null), 500);
    }
    return () => clearTimeout(timer);
  }, [mobileOpen]);

  function change_lang(l) {
    if (setLang) setLang(l);
    setMobileOpen(false);
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const path_list = [
    {
      path: "/about",
      name: lang === "uz" ? "Litsey haqida" : lang === "en" ? "About Lyceum" : "О лицее",
      select: [
        { path: "/about/history", name: lang === "uz" ? "Litsey tarixi" : lang === "en" ? "Lyceum History" : "История лицея" },
        { path: "/about/team", name: lang === "uz" ? "Rahbariyat" : lang === "en" ? "Administration" : "Руководство" },
        { path: "/about/offer", name: lang === "uz" ? "Litsey nizomi" : lang === "en" ? "Lyceum Charter" : "Устав лицея" },
      ],
    },
    { path: "/directions", name: lang === "uz" ? "Yo'nalishlar" : lang === "en" ? "Directions" : "Направления", select: [] },
    { path: "/news", name: lang === "uz" ? "Yangiliklar" : lang === "en" ? "News" : "Новости", select: [] },
    { path: "/announcements", name: lang === "uz" ? "E'lonlar" : lang === "en" ? "Announcements" : "Объявления", select: [] },
    { path: "/media", name: lang === "uz" ? "Media" : lang === "en" ? "Media" : "Медиа", select: [] },
  ];

  return (
    <>
      <div className="w-full relative z-[100] bg-white xl:h-[105px] lg:h-[85px] h-[75px] flex flex-col xl:px-[110px] lg:px-[80px] md:px-[30px] px-[20px] items-center justify-between text-[#303030]">
        <div className="flex flex-row items-center h-full justify-between w-full relative z-[101] bg-white">
          <Link to={"/"} className="flex items-center gap-[10px]">
            <img
              src={logo}
              alt="Andijon IIV litseyi"
              loading="eager"
              fetchpriority="high"
              className="xl:w-[60px] xl:h-[60px] lg:w-[50px] lg:h-[50px] w-[45px] h-[45px]"
            />
            <p className="xl:text-[20px] lg:text-[15px] md:text-[13px] text-[14px] font-[700] leading-[120%] whitespace-nowrap">
              {lang === "uz" ? "Ichki ishlar vazirligi Andijon" : lang === "en" ? "MIA Andijan" : "МВД Андижанский"} <br /> {lang === "uz" ? "viloyati akademik litseyi" : lang === "en" ? "regional academic lyceum" : "областной академический лицей"}
            </p>
          </Link>

          <div className="hidden md:flex xl:gap-[30px] lg:gap-[19px] md:gap-[15px] gap-[10px] whitespace-nowrap items-center">
            {path_list.map((item, idx) => (
              <div
                key={idx}
                className="relative py-4"
                onMouseEnter={() => {
                  clearTimeout(timerRef.current);
                  if (item.select.length > 0) setAboutOpen(true);
                }}
                onMouseLeave={() => {
                  timerRef.current = setTimeout(() => setAboutOpen(false), 300);
                }}
              >
                {item.select.length > 0 ? (
                  <>
                    <div className="flex items-center gap-[5px] hover:text-[#cfa92d] duration-300 cursor-pointer xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]">
                      <span>{item.name}</span>
                      <ChevronDown
                        size={16}
                        className={`duration-300 ${aboutOpen ? "rotate-180" : ""}`}
                      />
                    </div>

                    <div
                      className={`absolute xl:top-[60px] lg:top-[50px] top-[45px] left-0 xl:w-[220px] lg:w-[200px] w-[180px] bg-[#14386F] text-white shadow-lg rounded-[8px]
                      overflow-hidden transition-all duration-300 ease-in-out z-50
                      ${aboutOpen ? "max-h-[300px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}
                    >
                      {item.select.map((s, index) => (
                        <Link
                          key={index}
                          to={s.path}
                          className="block px-[16px] py-[12px] xl:text-[18px] lg:text-[14px] text-[13px] hover:bg-[#1B4D9A] duration-200"
                          onClick={() => setAboutOpen(false)}
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onMouseEnter={() => setAboutOpen(false)}
                    className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500] hover:text-[#cfa92d] duration-300"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to={"/form"} className={`xl:px-[20px] xl:py-[15px] lg:px-[13px] lg:py-[11px] md:px-[10px] md:py-[8px] whitespace-nowrap rounded-[5px] bg-[#FFD859] hover:bg-[#14386F] hover:text-white duration-300`} >
              <p className="xl:text-[16px] lg:text-[13px] md:text-[12px] font-[500]">
                {lang === "uz" ? "Ariza qoldirish" : lang === "en" ? "Submit application" : "Оставить заявку"}
              </p>
            </Link>
          </div>

          <div className="md:hidden flex items-center z-[101]">
            {!mobileOpen && (
              <button onClick={() => setMobileOpen(true)} className="text-[#303030] hover:text-[#14386F] transition-colors p-2">
                <Menu size={30} />
              </button>
            )}
          </div>
        </div>
        <hr className="w-full border-[#cccccc]" />
      </div>

      <div
        className={`fixed top-0 left-0 w-full bg-[#14386F]/95 shadow-2xl flex flex-col transition-all duration-500 ease-in-out md:hidden z-[110] backdrop-blur-[1px]
          ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
        style={{ height: 'auto', maxHeight: '90vh' }}
      >
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-row items-center justify-between p-[20px] border-b border-white/20">
            <p className="text-[16px] font-[600] leading-[130%] text-white">
              {lang === "uz" ? "Ichki ishlar vazirligi Andijon" : lang === "en" ? "MIA Andijan" : "МВД Андижанский"} <br /> {lang === "uz" ? "viloyati akademik litseyi" : lang === "en" ? "regional academic lyceum" : "областной академический лицей"}
            </p>
            <button onClick={() => setMobileOpen(false)} className="text-white hover:text-[#FFD859] transition-colors p-2">
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-col gap-4 px-[20px] py-6 overflow-y-auto w-full">
            <div className="flex flex-col w-full">
              {path_list.map((item, idx) => (
                <div key={idx} className="flex flex-col w-full">
                  {item.select.length > 0 ? (
                    <div className="flex flex-col w-full">
                      <div
                        className={`flex items-center justify-between text-[16px] font-[500] py-3 border-b border-white/10 cursor-pointer w-full
                             ${isActive(item.path) ? "text-[#FFD859]" : "text-white hover:text-[#FFD859]"}`}
                        onClick={() => setOpenSubMenuIndex(openSubMenuIndex === idx ? null : idx)}
                      >
                        {item.name}
                        <ChevronDown size={18} className={`transition-transform duration-300 ${openSubMenuIndex === idx ? 'rotate-180' : ''}`} />
                      </div>
                      <div className={`flex flex-col gap-2 pl-4 overflow-hidden transition-all duration-300 w-full ${openSubMenuIndex === idx ? 'max-h-[200px] mt-2' : 'max-h-0'}`}>
                        {item.select.map((sub, i) => (
                          <Link
                            key={i}
                            to={sub.path}
                            className={`text-[15px] py-2 w-full block transition-colors
                                ${isActive(sub.path) ? "text-[#FFD859] font-bold" : "text-white/80 hover:text-white"}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-[16px] font-[500] py-3 border-b border-white/10 w-full block transition-colors
                           ${isActive(item.path) ? "text-[#FFD859]" : "text-white hover:text-[#FFD859]"}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[20px] mt-4 w-full items-center">
              <div className="flex flex-row items-center justify-center gap-[30px]">
                <div className="cursor-pointer hover:scale-[102%] active:scale-[99%] duration-300 text-white hover:text-[#FFD859]">
                  <Facebook width={26} height={26} />
                </div>
                <div className="cursor-pointer hover:scale-[102%] active:scale-[99%] duration-300 text-white hover:text-[#FFD859]">
                  <Instagram width={26} height={26} />
                </div>
                <div className="cursor-pointer hover:scale-[102%] active:scale-[99%] duration-300 text-white hover:text-[#FFD859]">
                  <Send width={26} height={26} />
                </div>
              </div>

              <div className="flex flex-col gap-[10px] items-center text-white">
                <div className="flex gap-4">
                  <p onClick={() => change_lang("uz")} className={`text-[18px] cursor-pointer hover:text-[#FFD859] ${lang == "uz" ? "text-[#FFD859] font-bold" : "text-white"}`}>O'z</p>
                  <p onClick={() => change_lang("ru")} className={`text-[18px] cursor-pointer hover:text-[#FFD859] ${lang == "ru" ? "text-[#FFD859] font-bold" : "text-white"}`}>Ру</p>
                  <p onClick={() => change_lang("en")} className={`text-[18px] cursor-pointer hover:text-[#FFD859] ${lang == "en" ? "text-[#FFD859] font-bold" : "text-white"}`}>En</p>
                </div>
              </div>
            </div>

            <Link
              to={"/form"}
              className="mt-2 w-full text-center py-3 rounded-[5px] bg-[#FFD859] text-[#14386F] hover:bg-white hover:text-[#14386F] duration-300 font-[700]"
              onClick={() => setMobileOpen(false)}
            >
              {lang === "uz" ? "Ariza qoldirish" : lang === "en" ? "Submit application" : "Оставить заявку"}
            </Link>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-[105] md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar_main;

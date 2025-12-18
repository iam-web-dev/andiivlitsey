import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import simg1 from "./imgs/simg.png";
import simg2 from "./imgs/simg2.png";
import simg3 from "./imgs/simg3.jpg";
import { Link } from "react-router";

const slides = [
  {
    img: simg1,
    category: "Yangiliklar",
    date: "12-dekabr, 2025",
    views: 7042,
    title: "Korrupsiyasiz jamiyat – barqaror rivojlanish asosi",
    desc: "Akademik litseyimizda maxsus tadbir tashkillashtirildi.",
  },
  {
    img: simg2,
    category: "Yangiliklar",
    date: "13-dekabr, 2025",
    views: 5021,
    title: "Yangi o‘quv yili boshlanishi",
    desc: "Talabalar va o‘qituvchilar bilan tanishtirish tadbiri o‘tkazildi.",
  },
  {
    img: simg3,
    category: "Yangiliklar",
    date: "14-dekabr, 2025",
    views: 6300,
    title: "Innovatsion loyihalar tanlovi",
    desc: "Litseyimiz talabalari innovatsion loyihalar bilan ishtirok etdilar.",
  },
];

const mediaItems = [
  { type: "video", date: "12-dekabr, 2025", title: "Video lavha 1" },
  { type: "photo", date: "13-dekabr, 2025", title: "Rasm lavha 2" },
  { type: "video", date: "14-dekabr, 2025", title: "Video lavha 3" },
  { type: "photo", date: "15-dekabr, 2025", title: "Rasm lavha 4" },
  { type: "video", date: "16-dekabr, 2025", title: "Video lavha 5" },
  { type: "photo", date: "17-dekabr, 2025", title: "Rasm lavha 6" },
];

const Home_main = () => {
  const [current, setCurrent] = useState(0);
  const [mediaCurrent, setMediaCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handlePosterDot = (idx) => setCurrent(idx);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full h-[550px] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full transition-opacity duration-1000 ${idx === current ? "opacity-100 z-20" : "opacity-0 z-0"
              }`}
          >
            <div className="absolute bg-[#303030] opacity-60 w-full h-full z-10" />
            <div className="absolute w-full pl-[110px] pb-[120px] flex flex-col text-white justify-end gap-[10px] h-full z-20">
              <div className="flex flex-row items-center text-[18px] leading-[120%] gap-[8px]">
                <div>{slide.category}</div>
                <hr className="w-[22px] rotate-90" />
                <div>{slide.date}</div>
                <hr className="w-[22px] rotate-90" />
                <div className="flex flex-row gap-[7px]">
                  <Eye width={22} height={22} /> {slide.views}
                </div>
              </div>
              <p className="text-[42px] text-[#FFD859] font-[700] max-w-[50%] leading-[120%]">
                {slide.title}
              </p>
              <p className="text-[18px] font-[400] max-w-[50%] leading-[120%]">
                {slide.desc}
              </p>
            </div>
            <img
              src={slide.img}
              alt="slide"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-[8px] mt-[22px]">
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => handlePosterDot(idx)}
            className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-all duration-300 ${current === idx ? "bg-[#FFD859]" : "bg-gray-400/50"
              }`}
          />
        ))}
      </div>

      <div className="w-full px-[110px] mt-[80px]">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[36px] text-[#303030] font-[700] tracking-tight">
            E'lonlar
          </p>
          <Link to="/announcements" className="text-[18px] text-[#cfa92d] font-[400] hover:scale-[102%] active:scale-[99%] duration-300">
            Barchasi
          </Link>
        </div>
        <div className="flex w-full justify-center gap-[20px] flex-wrap mt-[30px]">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <Link to={`/announcements/${id}`} className="pl-[20px] pr-[40px] flex flex-col gap-[10px] py-[40px] lg:w-full xl:w-[40%] border border-[#52525289] rounded-[10px] shadow-lg hover:shadow-xl hover:scale-[102%] active:scale-[99%] duration-300 group cursor-pointer">
              <div className="flex flex-row items-center text-[18px] text-[#52525289] leading-[130%] gap-[10px]">
                <div>12-dekabr, 2025</div>
                <hr className="w-[22px] rotate-90" />
                <div className="flex flex-row gap-[7px]">
                  <Eye width={22} height={22} /> 7042
                </div>
              </div>
              <p className="text-[24px] text-[#303030] group-hover:text-[#cfa92d] duration-300 font-[700] leading-[130%]">
                Dissertatsiya himoyasi bo‘yicha e’lon Dissertats himoyasi
                bo‘yicha e’lon
              </p>
              <p className="text-[18px] text-[#525252] font-[400] leading-[130%]">
                Nomzodlar dissertatsiya ishlarini himoya qilishlari mumkin.
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full px-[110px] mt-[80px]">
        <div className="flex flex-row items-center justify-between mb-5">
          <p className="text-[36px] text-[#303030] font-[700] tracking-tight">
            Media
          </p>
          <div className="flex flex-row gap-[20px]">
            <button
              onClick={() => setMediaCurrent((prev) => Math.max(prev - 1, 0))}
              disabled={mediaCurrent === 0}
              className={`rounded-[6px] flex items-center justify-center w-[60px] h-[60px] ${mediaCurrent === 0
                  ? "bg-[#E0E0E0] text-[#52525289] cursor-not-allowed"
                  : "bg-[#FFD859] text-[#303030] cursor-pointer hover:scale-[101%] active:scale-[99%]"
                }`}
            >
              <ArrowLeft />
            </button>

            <button
              onClick={() =>
                setMediaCurrent((prev) =>
                  Math.min(prev + 1, mediaItems.length - 2)
                )
              }
              disabled={mediaCurrent === mediaItems.length - 2}
              className={`rounded-[6px] flex items-center justify-center w-[60px] h-[60px] ${mediaCurrent === mediaItems.length - 2
                  ? "bg-[#E0E0E0] text-[#52525289] cursor-not-allowed"
                  : "bg-[#FFD859] text-[#303030] cursor-pointer hover:scale-[101%] active:scale-[99%]"
                }`}
            >
              <ArrowRight />
            </button>

          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${mediaCurrent * (620)}px)` }}
          >
            {mediaItems.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-[600px] mr-[20px]">
                <div className="bg-gray-300 w-full h-[400px] rounded-[6px] flex items-center justify-center text-[24px] font-[700] text-[#303030]">
                  {item.type === "video" ? "Video" : "Photo"}
                </div>
                <div className="mt-3 text-[18px] text-[#303030]">
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

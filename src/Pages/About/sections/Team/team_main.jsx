import React, { useState, useEffect, useRef } from "react";
import person from "./Images/person.svg";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  Phone,
  Calendar,
  User,
  ArrowRight,
  ShieldCheck,
  Contact,
} from "lucide-react";
import Loader_main from "../../../../Components/Loader/loader_main";

const Team_main = ({ lang }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ctrl.iivandijonlitsey.uz/api/leadership/?page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const sortedData = (json.results || []).sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );
        setData(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader_main className="h-[400px]" />;
  }

  const translations = {
    uz: {
      home: "Bosh sahifa",
      leadership: "Rahbariyat",
      title: "Bizning Rahbariyat",
      subtitle:
        "Litseyimizning ko'p yillik tajribaga ega fidoyi mutaxassislari",
      reception: "Qabul kunlari",
      phone: "Bog'lanish",
    },
    ru: {
      home: "Главная",
      leadership: "Руководство",
      title: "Наше Руководство",
      subtitle:
        "Преданные своему делу специалисты нашего лицея с многолетним опытом",
      reception: "Дни приема",
      phone: "Контакт",
    },
    en: {
      home: "Home",
      leadership: "Leadership",
      title: "Our Leadership",
      subtitle:
        "Dedicated specialists of our lyceum with many years of experience",
      reception: "Reception Days",
      phone: "Contact",
    },
  };

  const t = translations[lang] || translations.uz;

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] flex justify-center py-10 sm:py-16">
      <div className="w-full max-w-[1260px] px-5 lg:px-10 xl:px-0">
        {/* Breadcrumbs & Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 mb-12"
        >
          <nav className="flex items-center gap-2 text-sm font-medium">
            <a
              href="/"
              className="text-slate-400 hover:text-[#cfa92d] transition-colors tracking-tight"
            >
              {t.home}
            </a>
            <span className="text-slate-300">/</span>
            <span className="text-[#cfa92d]">{t.leadership}</span>
          </nav>

          <div className="relative pl-6">
            <div className="absolute left-0 top-1 w-1 h-8 bg-[#cfa92d] rounded-full"></div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
              {t.title}
            </h1>
            <p className="mt-2 text-slate-500 text-base sm:text-lg max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Team List */}
        <div className="flex flex-col gap-10">
          {data.map((item, index) => (
            <TeamCard
              key={item.id}
              item={item}
              lang={lang}
              t={t}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamCard = ({ item, lang, t, index }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 25 };
  const rotateX = useSpring(
    useTransform(mouseY, [-150, 150], [2, -2]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-150, 150], [-2, 2]),
    springConfig
  );

  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(207, 169, 45, 0.05),
    transparent 80%
  )`;

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative w-full bg-white rounded-[28px] overflow-hidden border border-slate-100 flex flex-col md:flex-row shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] transition-all duration-500"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />

      {/* Image Container */}
      <div className="w-full md:w-[280px] lg:w-[360px] h-[350px] md:h-auto relative overflow-hidden shrink-0">
        <img
          src={item.image || person}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          alt={item.full_name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden"></div>
      </div>

      {/* Info Container - Using a subtle background on the right */}
      <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative bg-gradient-to-br from-white to-slate-50/30 overflow-hidden">
        {/* Decorative Graphic Element (subtle user icon background) */}
        <div className="absolute top-1/2 right-[-220px] transform -translate-y-1/2 opacity-[0.02] pointer-events-none text-slate-900 group-hover:opacity-[0.04] group-hover:scale-110 transition-all duration-700">
          <div className="w-[400px] h-[400px] rounded-full bg-black flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full bg-white flex items-center justify-center">
              <div className="w-[190px] h-[190px] rounded-full bg-black"></div>
            </div>
          </div>
        </div>

        <div className="relative z-20">
          {/* Order: Name first, then Position */}
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 group-hover:text-[#cfa92d] transition-colors duration-300 leading-tight">
            {item[`full_name_${lang}`] || item.full_name_uz || item.full_name}
          </h2>

          {/* New Position Design: Integrated and less bulky */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#cfa92d] text-xs lg:text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b border-[#cfa92d]/20 py-[5%] w-fit">
                <ShieldCheck size={30} className="md:inline hidden" />
                {item[`position_${lang}`] || item.position_uz || item.position}
              </span>
            </div>

            {/* Other elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 pt-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                  <Calendar size={14} className="text-[#cfa92d]" />
                  {t.reception}
                </div>
                <p className="text-base lg:text-lg text-slate-600 font-medium">
                  {item[`reception_day_${lang}`] ||
                    item.reception_day_uz ||
                    item.reception_day}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                  <Phone size={14} className="text-[#cfa92d]" />
                  {t.phone}
                </div>
                <a
                  href={`tel:${item.phone}`}
                  className="text-lg lg:text-2xl text-slate-800 font-bold hover:text-[#cfa92d] transition-all flex items-center gap-2 group/btn"
                >
                  {item.phone}
                  <ArrowRight
                    size={20}
                    className="text-[#cfa92d] transition-transform group-hover/btn:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Team_main;

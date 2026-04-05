import React from "react";
import { Link } from "react-router";

const Not_found_main = ({ lang }) => {
  const translations = {
    uz: {
      title: "Voy! Sahifa topilmadi",
      desc: "Kechirasiz, siz qidirayotgan sahifa mavjud emas, nomi o'zgartirilgan yoki vaqtincha olib tashlangan.",
      button: "Bosh sahifaga qaytish",
    },
    ru: {
      title: "Ой! Страница не найдена",
      desc: "К сожалению, страница, которую вы ищете, не существует, была переименована или временно удалена.",
      button: "Вернуться на главную",
    },
    en: {
      title: "Oops! Page Not Found",
      desc: "Sorry, the page you are looking for doesn't exist, has been renamed or is temporarily unavailable.",
      button: "Back to Home",
    },
  };

  const t = translations[lang] || translations.uz;

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center animate-fade-in">
      <div className="relative">
        <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-bold leading-none select-none bg-clip-text text-transparent bg-gradient-to-b from-[#14386F] to-[#14386F]/20">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full animate-float opacity-80 pointer-events-none">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-[#FFD859] rounded-full blur-[80px] mx-auto"></div>
        </div>
      </div>

      <div className="max-w-[600px] mt-8 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#303030]">
          {t.title}
        </h2>
        <p className="text-lg text-[#6F6F6F] leading-relaxed">{t.desc}</p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#FFD859] hover:bg-[#ffcf33] text-[#303030] font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {t.button}
          </Link>
        </div>
      </div>

      <div className="mt-20 flex gap-4 opacity-20 grayscale pointer-events-none select-none overflow-hidden whitespace-nowrap">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <span key={i} className="text-8xl font-black italic">
            ERROR
          </span>
        ))}
      </div>
    </div>
  );
};

export default Not_found_main;

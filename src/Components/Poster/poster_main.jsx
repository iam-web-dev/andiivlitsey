import React from "react";

const Poster_main = ({ lang }) => {
  return (
    <div className="w-full h-[40px] bg-[#14386F] flex items-center justify-center">
      <p className="text-[15px] font-[400] text-white">
        {lang === "uz" ? "Ochiqlik, tezkorlik va xolislik" : lang === "en" ? "Transparency, speed and impartiality" : "Прозрачность, оперативность и беспристрастность"}
      </p>
    </div>
  );
};

export default Poster_main;

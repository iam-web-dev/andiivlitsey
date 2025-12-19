import { Routes, Route, useLocation } from "react-router";
import Home from "./Pages/Home/home_main";
import Media from "./Pages/Media/media_main";
import Directions from "./Pages/Directions/directions_main";
import News from "./Pages/News/news_main";
import Announcements from "./Pages/Announcements/announcements_main";
import About from "./Pages/About/about_main";
import Form from "./Pages/Form/form_main";
import Poster from "./Components/Poster/poster_main";
import Info_section from "./Components/Info_section/info_section_main";
import Navbar from "./Components/Navbar/navbar_main";
import Footer from "./Components/Footer/footer_main";
import { useEffect, useState } from "react";
import Not_found from "./Components/Not_found/not_found_main";

function App() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "uz");
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  return (
    <div>
      <div className="sticky top-0 z-40 shadow-2xl">
        <Poster lang={lang} />
      </div>
      <Info_section lang={lang} setLang={setLang} />
      <div className="sticky top-0 z-50 bg-white">
        <Navbar lang={lang} setLang={setLang} />
      </div>
      <div className="md:pb-[140px] pb-[70px]">
        {/* Body */}
        <Routes>
          <Route path="/" element={<Home lang={lang} />} /> {/* Yodgorbek */}
          <Route path="/media/*" element={<Media />} /> {/* Ibrohimjon */}
          <Route path="/directions/*" element={<Directions lang={lang} />} />
          {/* Yodgorbek */}
          <Route path="/news/*" element={<News />} /> {/* Ibrohimjon */}
          <Route path="/announcements/*" element={<Announcements lang={lang} />} />
          {/* Yodgorbek */}
          <Route path="/about/*" element={<About />} /> {/* Ibrohimjon */}
          <Route path="/form" element={<Form />} /> {/* Ibrohimjon */}
          <Route path="*" element={<Not_found />} /> {/* Ibrohimjon */}
        </Routes>
      </div>
      <div>
        {/* Footer */}
        <Footer /> {/* Ibrohimjon */}
      </div>
    </div>
  );
}

export default App;

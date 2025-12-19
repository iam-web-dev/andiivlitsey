import { BrowserRouter, Routes, Route } from "react-router";
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
  const [lang, setLang] = useState("uz");
  useEffect(() => {
    !localStorage.getItem("lang") && localStorage.setItem("lang", "uz");
  }, []); 
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  return (
    <BrowserRouter>
      <div>
        <div className="sticky top-0 z-40 shadow-2xl">
          <Poster />
        </div>
        <Info_section lang={lang} setLang={setLang} />
        <div className="sticky top-0 z-50 bg-white">
          <Navbar />
        </div>
        <div className="bg-gray-100">
          {/* Body */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Webdev */}
            <Route path="/media/*" element={<Media />} /> {/* Muhammad */}
            <Route path="/directions/*" element={<Directions />} />
            {/* Webdew */}
            <Route path="/news/*" element={<News />} /> {/* Muhammad */}
            <Route path="/announcements/*" element={<Announcements />} />
            {/* Webdew */}
            <Route path="/about/*" element={<About />} /> {/* Muhammad */}
            <Route path="/form" element={<Form />} /> {/* Muhammad */}
            <Route path="*" element={<Not_found />} /> {/* Muhammad */}
          </Routes>
        </div>
        <div>
          {/* Footer */}
          <Footer /> {/* Muhammad done */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

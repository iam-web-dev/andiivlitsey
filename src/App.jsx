import { BrowserRouter, Routes, Route } from "react-router";
import Home_main from "./Pages/Home/home_main";
import Media_main from "./Pages/Media/media_main";
import Directions_main from "./Pages/Directions/directions_main";
import News_main from "./Pages/News/news_main";
import Announcements_main from "./Pages/Announcements/announcements_main";
import About_main from "./Pages/About/about_main";
import Form_main from "./Pages/Form/form_main";
import Poster_main from "./Components/Poster/poster_main";
import Info_section_main from "./Components/Info_section/info_section_main";
import Navbar_main from "./Components/Navbar/navbar_main";
import Footer_main from "./Components/Footer/footer_main";

function App() {
  return (
    <div>
      <div>
        {/* Header */}
        <Poster_main /> {/* Yodgorbek */} {/* Not finished */}
        <Info_section_main /> {/* Yodgorbek */} {/* Not finished */}
        <Navbar_main /> {/* Yodgorbek */} {/* Not finished */}
      </div>
      <div>
        {/* Body */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home_main />} /> {/* Yodgorbek */} {/* Not finished */}
            <Route path="/media" element={<Media_main />} /> {/* Ibrohimjon */} {/* Not finished */}
            <Route path="/directions" element={<Directions_main />} /> {/* Yodgorbek */} {/* Not finished */}
            <Route path="/news" element={<News_main />} /> {/* Ibrohimjon */} {/* Not finished */}
            <Route path="/announcements" element={<Announcements_main />} /> {/* Yodgorbek */} {/* Not finished */}
            <Route path="/about" element={<About_main />} /> {/* Ibrohimjon */} {/* Not finished */}
            <Route path="/form" element={<Form_main />} /> {/* Ibrohimjon */} {/* Not finished */}
          </Routes>
        </BrowserRouter>
      </div>
      <div>
        {/* Footer */}
        <Footer_main /> {/* Ibrohimjon */} {/* Not finished */}
      </div>
    </div>
  );
}

export default App;

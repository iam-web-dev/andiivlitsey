import React, { useState } from 'react'
import History from './sections/history/history_main'
import Team from './sections/Team/team_main'
import Offer from './sections/Offer/offer_main'
import Not_found from '../../Components/Not_found/not_found_main'
import { Route, Routes } from 'react-router'

const About_main = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "uz");
console.log(lang)
  return (  
    <div>
      <Routes>
        <Route path="/history"  element={<History lang={lang} />} />
        <Route path="/team"  element={<Team lang={lang} />} />
        <Route path="/offer"  element={<Offer lang={lang} />} />
        <Route path="*"  element={<Not_found lang={lang} />} />
      </Routes>
    </div>
  )
}

export default About_main
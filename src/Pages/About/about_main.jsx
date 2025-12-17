import React from 'react'
import History from './sections/history/history_main'
import Team from './sections/Team/team_main'
import Offer from './sections/Offer/offer_main'
import Not_found from '../../Components/Not_found/not_found_main'
import { Route, Routes } from 'react-router'

const About_main = () => {
  return (
    <div>
      <Routes>
        <Route path="/history" element={<History />} />
        <Route path="/team" element={<Team />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="*" element={<Not_found />} />
      </Routes>
    </div>
  )
}

export default About_main
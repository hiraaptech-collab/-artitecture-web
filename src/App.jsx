import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar'
import Footer from './components/footer'
import SmoothScrollProvider from './components/SmoothScrollProvider'
import RouteScroll from './components/RouteScroll'

import Home from './pages/home'
import OurStory from './pages/ourstory'
import Team from './pages/team'
import Portfolio from './pages/portfolio'
import Career from './pages/career'
import Connect from './pages/connect'
import Events from './pages/events'
import Press from './pages/press'
import Awards from './pages/awards'
import Insights from './pages/insights'

import ExperienceEntry from './components/experience/ExperienceEntry'
import PageTransition from './components/pagetransition'
import './App.css'
import './refinements.css'

function App() {
  return (
    <BrowserRouter>
      <ExperienceEntry>
        <SmoothScrollProvider>
          <RouteScroll />
          <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about/our-story" element={<OurStory />} />
              <Route path="/about/team" element={<Team />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/career" element={<Career />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/news/events" element={<Events />} />
              <Route path="/news/press" element={<Press />} />
              <Route path="/news/awards" element={<Awards />} />
              <Route path="/news/insights" element={<Insights />} />
            </Routes>
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </ExperienceEntry>
    </BrowserRouter>
  )
}

export default App


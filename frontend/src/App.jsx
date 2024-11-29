import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import ProjectPage from './pages/ProjectPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/new-project" element={<NewProject />} />
          {/* Need to edit above and below, adding ids */}
          <Route path="/new-page" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

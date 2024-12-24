import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import ProjectPage from './pages/ProjectPage';
import bg from './background.jpg'

const BackgroundWrapper = ({ children }) => {
  const location = useLocation();

  const isHome = location.pathname === '/';

  const style = {
    backgroundImage: isHome ? `url(${bg})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: isHome ? 'rgba(0,0,0,0.5)' : 'white',
  };

  return <div style={style}>{children}</div>;
};

const App = () => {
  return (
    <BrowserRouter>
      <BackgroundWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/new-project/:id" element={<NewProject />} />
          <Route path="/new-page/:projectId/:pageId" element={<ProjectPage />} />
        </Routes>
      </BackgroundWrapper>
    </BrowserRouter>
  );
};

export default App;

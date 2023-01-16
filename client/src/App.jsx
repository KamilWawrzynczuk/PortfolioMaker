import React, { useState } from 'react';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Intro from './components/Intro.jsx';
import Line from './components/Line.jsx';
import Projects from './components/Projects.jsx';

function App() {
  return (
    <div>
      <Header />
      <Intro />
      <Line />
      <Projects />
      <Line />
      <Contact />
      <Line />
      <Footer />
    </div>
  );
}

export default App;

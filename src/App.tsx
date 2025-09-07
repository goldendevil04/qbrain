import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import TeamStructure from './components/TeamStructure';
import JoinTeam from './components/JoinTeam';
import TechFocus from './components/TechFocus';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white relative">
      <ParticleBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Achievements />
        <TeamStructure />
        <JoinTeam />
        <TechFocus />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
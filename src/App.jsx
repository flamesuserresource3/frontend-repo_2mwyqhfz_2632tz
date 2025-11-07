import React from 'react';
import Header from './components/Header';
import StoryIntro from './components/StoryIntro';
import GameUI from './components/GameUI';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(30,41,59,0.7),rgba(0,0,0,1))] text-white">
      <Header />
      <main>
        <StoryIntro />
        <GameUI />
      </main>
      <Footer />
    </div>
  );
}

export default App;

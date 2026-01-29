import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { DriverSection } from './components/DriverSection';

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <DriverSection />
      </main>
      <Footer />
    </div>
  )
}

export default App

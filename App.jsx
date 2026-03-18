import './index.css'
import Navbar from './components/Navbar'
import Chatbot from './components/Chatbot'
import Hero from './sections/Hero'
import Stats from './sections/Stats'
import Solucoes from './sections/Solucoes'
import Bess from './sections/Bess'
import IA from './sections/IA'
import Mobilidade from './sections/Mobilidade'
import Setores from './sections/Setores'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Solucoes />
        <Bess />
        <IA />
        <Mobilidade />
        <Setores />
        <CTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

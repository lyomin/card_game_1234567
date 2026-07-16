import Footer from './components/footer/Footer'
import { Toaster } from 'react-hot-toast';
import Game from './components/game/Game';


function App() {

  

  return (
    <>
      <Toaster />
      <Game />
      <div style={{marginTop: 'auto'}}></div>
      <Footer />
    </>
  )
}

export default App

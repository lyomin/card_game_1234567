import Table from './components/table/Table'
import Footer from './components/footer/Footer'
import toast, { Toaster } from 'react-hot-toast';
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

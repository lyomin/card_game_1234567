import Table from './components/table/Table'
import Footer from './components/footer/Footer'
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const handleResetClick = (resultInSec: number) => {
    // Iškviečiame custom toast, kuris grąžina unikalų objekto ID (t)
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
          You done it in {resultInSec} seconds
        </span>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          
          {/* „TAIP“ Mygtukas */}
          <button
            onClick={() => {
              toast.dismiss(t.id); // Uždarome pranešimą
            }}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ef4444', // Raudona (Confirm)
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Taip
          </button>
        </div>
      </div>
    ), {
      duration: Infinity, // Pranešimas neišnyks automatiškai, kol vartotojas nepaspaus mygtuko
      position: 'top-center',
      style: {
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '16px',
        borderRadius: '12px'
      }
    })};

  return (
    <>
      <Toaster />
      <Table height={2} width={4} score={handleResetClick} />
      <Footer />
    </>
  )
}

export default App

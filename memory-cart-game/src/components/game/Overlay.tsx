import type { ReactNode } from "react";
import toast from "react-hot-toast";



const overlay = (children: ReactNode) => {

    toast.custom((t) => (
      <div style={{
    background: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 0 0 100vmax rgba(0, 0, 0, 0.5)', 
    position: 'relative',
    zIndex: 9999
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            Close
          </button>
        </div>
      </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '16px',
        borderRadius: '12px'
      }
    });
}

export default overlay;
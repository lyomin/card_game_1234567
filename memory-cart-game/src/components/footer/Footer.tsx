import React from 'react';


const Footer = () => {
  const currentYear = new Date().getFullYear();

    const styles: { [key: string]: React.CSSProperties } = {
        footer: {
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            padding: '20px 0',
            width: '100%',
            position: 'relative',
            bottom: 0,
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px',
        },
        text: {
            margin: 0,
            fontSize: '14px',
            fontFamily: 'sans-serif',
            color: '#a0a0a0',
        },
        attribution: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        icon: {
            width: '24px',
            height: '24px',
        },
        link: {
            color: '#61dafb', // React blue color
            textDecoration: 'none',
            fontWeight: '500',
        },
    };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Side: Copyright */}
        <p style={styles.text}>
          &copy; {currentYear} Justin Byckovic. All rights reserved.
        </p>

        {/* Right Side: Icons8 Attribution Requirement */}
        <div style={styles.attribution}>
          <span>
            Icon style{' '}
            <a 
              href="https://icons8.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.link}
            >
              Icons8
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
// Quick inline styles for easy copy-pasting


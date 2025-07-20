import React from 'react';

const Realfooter = ({data}) => {
  return (
    <footer
      style={{
        marginLeft: '1rem',
        backgroundColor: '#1f1f27',
        color: '#fff',
        padding: '3rem 4%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '8rem',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Brand Info */}
      <div style={{ flex: '1 1 250px', minWidth: '220px' }}>
        <h2 style={{ color: '#EF0D00', marginBottom: '1rem' }}>NexHub</h2>
        <p style={{ color: '#ccc' }}>
          A platform for coders to learn, collaborate, grow, and launch their
          careers with the best tools, training, and code.
        </p>
      </div>

      {/* Contact */}
      <div style={{ minWidth: '180px' }}>
        <h3 style={{ color: '#EF0D00' }}>Reach Out</h3>
        <p style={{ marginTop: '1rem', color: '#ccc' }}>
          <span>{data.gmail}</span> <br />
          <span>{data.contact }</span>
           <br /> <br /><br />
           Hisar, Haryana, India<br />
          Pin: 125033
        </p>
      </div>
    </footer>
  );
};

const linkStyle = {
  color: '#ccc',
  textDecoration: 'none',
  display: 'block',
  margin: '0.5rem 0',
};

export default Realfooter;

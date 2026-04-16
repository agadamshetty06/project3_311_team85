/**
 * Portal Component
 * Main landing page that provides navigation to different system interfaces
 * Displays cards for each user role with appropriate descriptions
 */

// Import Link component for navigation between routes
import { Link } from 'react-router-dom';

/**
 * Portal component - main entry point for the restaurant management system
 * Shows interface options for different user roles
 */
export default function Portal() {
  // Define inline styles for the portal layout
  const styles = {
    // Main container styling - centered layout with padding
    container: { textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' },
    // Grid layout for interface cards - flexbox with centered alignment
    grid: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '30px' },
    // Card styling for individual interface options
    card: { 
      padding: '30px',           // Inner spacing
      border: '1px solid #ccc',  // Light border
      borderRadius: '8px',       // Rounded corners
      textDecoration: 'none',    // Remove underline from links
      color: '#333',             // Dark text color
      width: '200px',            // Fixed width for consistency
      transition: 'transform 0.2s' // Smooth hover effect
    }
  };

  return (
    // Main container with centered layout
    <div style={styles.container}>
      {/* System title */}
      <h1> OCTAGON - System Portal</h1>
      {/* Instruction text for users */}
      <p>Select your interface to begin.</p>
      
      {/* Grid container for interface cards */}
      <div style={styles.grid}>
        {/* Manager interface card - for desktop use with keyboard & mouse */}
        <Link to="/manager" style={styles.card}>
          <h2>Manager</h2>
          <p>Desktop / Keyboard & Mouse</p>
        </Link>
        
        {/* Cashier interface card - for touchscreen POS systems */}
        <Link to="/cashier" style={styles.card}>
          <h2>Cashier</h2>
          <p>Touchscreen POS</p>
        </Link>
        
        {/* Customer kiosk card - for self-service ordering */}
        <Link to="/customer" style={styles.card}>
          <h2>Customer Kiosk</h2>
          <p>Self-Service Touchscreen</p>
        </Link>

        {/* Menu board card - for display-only menu viewing */}
        <Link to="/menu-board" style={styles.card}>
          <h2>Menu Board</h2>
          <p>Non-Interactive Display</p>
        </Link>
      </div>
    </div>
  );
}
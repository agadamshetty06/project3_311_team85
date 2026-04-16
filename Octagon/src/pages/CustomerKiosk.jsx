/**
 * Customer Kiosk Component
 * Self-service ordering interface for customers
 * Features touch-friendly menu grid and real-time cart management
 */

// Import React hook for state management
import { useState } from 'react';

// Mock menu data for demonstration purposes
// In a real application, this would come from an API or database
const mockMenu = [
  { id: 1, name: 'Classic Milk Tea', price: 4.50 },
  { id: 2, name: 'Brown Sugar Boba', price: 5.50 },
  { id: 3, name: 'Taro Slush', price: 5.25 },
  { id: 4, name: 'Matcha Latte', price: 5.00 },
  { id: 5, name: 'Passionfruit Green Tea', price: 4.75 },
  { id: 6, name: 'Thai Tea', price: 4.75 },
];

/**
 * CustomerKiosk component - self-service ordering interface
 * Designed for touchscreen use with large buttons and clear visual hierarchy
 */
export default function CustomerKiosk() {
  // State to track items in the customer's shopping cart
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => setCart([...cart, item]);
  
  // Calculate total price of all items in the cart
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    // Main container with flexbox layout for side-by-side sections
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Menu Grid Section - takes 2/3 of the width */}
      <div style={{ flex: 2, padding: '20px', backgroundColor: '#f9f9f9' }}>
        <h2>Touch to Order</h2>
        {/* Grid layout for menu items - 2 columns for easy touch access */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {mockMenu.map((item) => (
            // Large touch-friendly menu item button
            <button 
              key={item.id} 
              onClick={() => addToCart(item)}
              style={{ padding: '30px', fontSize: '18px', borderRadius: '12px', border: '1px solid #ddd', cursor: 'pointer', backgroundColor: 'white' }}
            >
              <strong>{item.name}</strong><br/>
              ${item.price.toFixed(2)}
            </button>
          ))}
        </div>
      </div>

      {/* Cart Sidebar Section - takes 1/3 of the width */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderLeft: '2px solid #eee', display: 'flex', flexDirection: 'column' }}>
        <h2>Your Order</h2>
        {/* Scrollable area for cart items */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {/* Show empty cart message when no items are selected */}
          {cart.length === 0 ? <p>Tap an item to add it.</p> : null}
          {/* Display each cart item with name and price */}
          {cart.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', fontSize: '18px' }}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        {/* Checkout section with total and payment button */}
        <div style={{ borderTop: '2px solid #333', padding: '20px 0' }}>
          <h3>Total: ${total.toFixed(2)}</h3>
          {/* Large payment button for easy touch access */}
          <button style={{ width: '100%', padding: '15px', fontSize: '20px', backgroundColor: '#aa3bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
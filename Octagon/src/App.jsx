/**
 * Main App Component
 * Root component that sets up routing for the restaurant management system
 * Provides navigation between different user interfaces
 */

// Import React Router components for client-side routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import page components for different user interfaces
import Portal from './pages/Portal';
import ManagerView from './pages/ManagerView';
import CashierView from './pages/CashierView';
import CustomerKiosk from './pages/CustomerKiosk';
import MenuBoard from './pages/MenuBoard';

/**
 * App component that defines the routing structure
 * Enables navigation between different interfaces of the restaurant system
 */
function App() {
  return (
    // BrowserRouter enables client-side routing without page refreshes
    <BrowserRouter>
      {/* Routes container defines all possible paths in the application */}
      <Routes>
        {/* Centralized Portal Page - main entry point for all users */}
        <Route path="/" element={<Portal />} />
        
        {/* Isolated Interface Views - specific interfaces for different user roles */}
        <Route path="/manager" element={<ManagerView />} />
        <Route path="/cashier" element={<CashierView />} />
        <Route path="/customer" element={<CustomerKiosk />} />
        <Route path="/menu-board" element={<MenuBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
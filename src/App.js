/**
 * App.js
 *
 * Main application entry point with client-side routing.
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarvieLanding from './components/MarvieLanding';
import PricelistPage from './components/PricelistPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarvieLanding />} />
        <Route path="/pricelist" element={<PricelistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

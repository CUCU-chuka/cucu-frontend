import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssetRegistry from './pages/Assets';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<AssetRegistry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
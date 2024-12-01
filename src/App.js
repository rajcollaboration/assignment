import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Link, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import EditEmployee from './pages/Employee/EditEmployee';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='editemployee' element={<EditEmployee />} />
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import SignIn from './Component/SignIn/Signin';
import SignUp from './Component/SignUp/SignUp';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UploadImage from './Component/UploadImage/UploadImge';
import Gallery from './Component/Gallery.js/Gallery';

function App() {
  // const navigat=useNavigate()

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
};
  return (
    

    <div className="App">
      <button onClick={()=>handleLogout()}>log out</button>
      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn setToken={setToken} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload" element={token ? <UploadImage token={token} /> : <Navigate to="/signin" />} />
        <Route path="/gallery" element={token ? <Gallery token={token} /> : <Navigate to="/signin" />} />

        </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;

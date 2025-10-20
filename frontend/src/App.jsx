import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const privateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  }
  return (

    <>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/home' element={<privateRoute element={<Home/>}/>} />  
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

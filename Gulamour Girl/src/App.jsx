import React,{ useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import Login from './Login/Login'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home/Home'
import Navigation from './Navigation/Navigation';
import UserProductOverview from './Components/Product/UserProductOverview';
import ProductList from './Components/Product/ProductList';
import ProductOverview from './Components/Product/ProductOverview';

const UseContext = React.createContext()
const baseUrl = import.meta.env.VITE_REACT_DBURL;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UseContext.Provider value={{ URL : baseUrl }}>
    <BrowserRouter >
        <Navigation />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}/>
            <Route path="/userproduct/:id" element={<UserProductOverview />} />
            <Route path="/product/:id" element={<ProductOverview />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/dashboard" element={<h1>dashboard</h1>} />
        </Routes>
        </BrowserRouter>
        </UseContext.Provider>
    </>
  )
}

export {UseContext}
export default App

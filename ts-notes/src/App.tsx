import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotesProvider from './contexts/NotesContext';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import Add from './pages/Add';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import './App.css'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <NotesProvider>
                <Home />
              </NotesProvider>
            } />

            <Route path="/add" element={<Add />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

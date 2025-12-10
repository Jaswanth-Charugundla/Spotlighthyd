import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Events from './pages/events'
import Home from './pages/home'
import EventDeatils from './pages/eventsDeatils'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDeatils />} />
      
    </Routes>
  )
}

export default App

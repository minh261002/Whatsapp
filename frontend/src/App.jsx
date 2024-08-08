import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useSelector } from 'react-redux'

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route exact path='/' element={
            token ? <Home /> : <Navigate to='/login' />
          } />
          <Route exact path='/login' element={
            token ? <Navigate to='/' /> : <Login />
          } />
          <Route exact path='/register' element={
            token ? <Navigate to='/' /> : <Register />
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
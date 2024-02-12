import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrowseFlashy from './components/browseFlashy';
import Profile from './components/profile';
import Header from './components/header';
import Home from './components/home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/browseFlashy" element={
            <>
              <Header header="Browse Flashy"/>
              <BrowseFlashy />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header header="Profile"/>
              <Profile />
            </>
          } />
          <Route path="/home" element={
            <>
              <Header header="Flashy!"/>
              <Profile />
            </>
          } />
          <Route path="*" element={
            <>
              <Header header="Flashy!"/>
              <Home />
            </>
          } />
        </Routes>
        <nav>
          <ul>
            <li>
              <Link to="/browseFlashy">Browse Flashy</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/home">Flashy!</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;

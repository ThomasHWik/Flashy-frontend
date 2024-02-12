import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrowseFlashy from './components/browseFlashy';
import Profile from './components/profile';
import Header from './components/header';

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
        </Routes>
        <nav>
          <ul>
            <li>
              <Link to="/browseFlashy">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;

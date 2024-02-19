import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import BrowseFlashy from './components/browseFlashy';
import Profile from './components/profile';
import Header from './components/header';
import Home from './components/home';
import CreateFlashy from './components/createFlashy';
import CreateAdmin from './components/createAdmin';
import Login from './components/login';
import CreateUser from './components/createUser';
import Quiz from './components/quiz';
import Edit from './components/edit';

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
              <Home />
            </>
          } />
          <Route path="*" element={
            <>
              <Login />
            </>
          } />
          <Route path="/createFlashy" element={
            <>
              <Header header="Create Flashy"/>
              <CreateFlashy />
            </>
          } />
          <Route path="/createAdmin" element={
            <>
              <Header header="Create Admin"/>
              <CreateAdmin />
            </>
          } />
          <Route path="/createUser" element={
            <>
              <CreateUser />
            </>
          } />
          <Route path ="/quiz" element ={
            <>
              <Header header = "Flash-name"/>
              <Quiz />
              </>
          } />
          <Route path ="/edit" element ={
            <>
              <Header header = "Flash-name"/>
              <Edit />
              </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

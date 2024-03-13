import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowseFlashy from './components/browseFlashy';
import Header from './components/header';
import Profile from './components/profile';
import CreateFlashy from './components/createFlashy';
import Login from './components/login';
import CreateUser from './components/createUser';
import CreateAdmin from './components/createAdmin';
import Quiz from './components/quiz';
import Edit from './components/edit';
import EditProfile from './components/editProfile';
import PublicProfile from './components/publicprofile';

function App() {
  return (
    <Router>
      <div style={{ height: "100vh" }}>
        <Routes>
          <Route path="/browseFlashy" element={
            <>
              <Header header="Browse Flashy" />
              <BrowseFlashy />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header header="Flashy!" />
              <Profile />
            </>
          } />
          <Route path="/" element={
            <>
              <Login />
            </>
          } />
          <Route path="/createFlashy" element={
            <>
              <Header header="Create Flashy" />
              <CreateFlashy />
            </>
          } />
          <Route path="/createAdmin" element={
            <>
              <Header header="Create Admin" />
              <CreateAdmin />
            </>
          } />
          <Route path="/createUser" element={
            <>
              <CreateUser />
            </>
          } />
          <Route path="/quiz" element={
            <>
              <Header header="Flashy!" />
              <Quiz />
            </>
          } />
          <Route path="/edit" element={
            <>
              <Header header="Edit Flashy" />
              <Edit />
            </>
          } />
          <Route path="/EditProfile" element={
            <>
              <Header header="Edit profile" />
              <EditProfile />
            </>
          } />
          <Route path="/publicprofile" element={
            <>
              <Header header="Public profile" />
              <PublicProfile />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import { useState, useEffect } from 'react'
import './App.css'
import logo from '../public/logo.png'
import { Routes, Route, Link } from "react-router-dom";
import Education from './components/Education'
import EducationProgram from './components/EducationProgram'
import AddEducation from './components/AddEducation';
import AddEducationProgram from './components/AddEducationProgram';

function App() {

  return (
    <div className="container App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" ><img src={logo} alt="logo" width="100" heigth="100" />Education App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/program" className='nav-link'>Education Programs</Link>
              </li>
              <li className="nav-item">
                <Link to="/education" className='nav-link'>Educations</Link>
              </li>
              <li className="nav-item">
                <Link to="/educationadd" className='nav-link'>Add Education</Link>
              </li>
              <li className="nav-item">
                <Link to="/educationprogramadd" className='nav-link'>Add Education Program</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="card mt-2">
        <div className="card-body">
          Select which page you want go
        </div>
      </div>
      <Routes>
        <Route path="education" element={<Education />} />
        <Route path="program" element={<EducationProgram />} />
        <Route path="educationadd" element={<AddEducation />} />
        <Route path="educationprogramadd" element={<AddEducationProgram />} />
      </Routes>
    </div>
  )
}

export default App

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Home from './components/home/Home'
import AdmissionForm from './components/form/AdmissionForm';
import Navbar from './components/navbar/Navbar';
import Faculty from './components/faculty/Faculty';
import Vision from './components/vision/Vision';
import Subjects from './components/subjects/Subjects';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <Navbar />
    <Home />
    <AdmissionForm />
    <Faculty />
    <Vision />
    <Subjects />
    <Footer />
    </>
  )
}

export default App
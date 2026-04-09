import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import HomePage from "./Pages/Home";
import ServicePage from "./Pages/ServicePage";
import Header from './Components/Header';
import Portfolio from './Pages/Portfolio';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import BookConsultation from './Pages/BookConsultation';
import RealStory from './Components/RealStory';
import PriceCalc from './Components/PriceCalc';
import InspirationBoard from './Components/InspiretionBoard';

const App = () => {
  return (
    <div>
      <Router>
        <Header/>
         <Routes>
           <Route path='/' element={<HomePage/>}/>
           <Route path='/service' element={<ServicePage/>}/>
           <Route path='/portfolio' element={<Portfolio/>}/>
           <Route path='/about' element={<AboutPage/>}/>
           <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/consultation' element={<BookConsultation/>}/>
          <Route path='/Story' element={<RealStory/>}/>
          <Route path='/priceCalc' element={<PriceCalc/>}/>
          <Route path='/board' element={<InspirationBoard/>}/>
         </Routes>
      </Router>
    </div>
  )
}

export default App

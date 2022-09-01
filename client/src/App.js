import React from 'react';
import { Footer, Header, Sidebar } from '../src/containers/indexCont';
import { Navbar, Dish } from '../src/components/indexComp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Explore from '../src/components/pages/Explore/Explore';
import Home from '../src/components/pages/Home/Home';
import About from '../src/components/pages/About/About';
import Log_In from '../src/components/pages/Log_In/Log_In';
import Review from '../src/components/pages/Review/Review';
import Suggestion from './components/pages/Suggestion/Suggestion';
import './App.css';

const App = () => {
  return (
    <>
        <Router>
        <Navbar/>
        <Switch>
          <Route path="/" > <Home/></Route>
          <Route path="/about" element={About}></Route>
          <Route path="/explore" ><Explore/></Route>
          <Route path="/review" element={Review}></Route>
          <Route path="/suggestions" element={Suggestion}></Route>
          <Route path="/login" element={Log_In}></Route>
        </Switch>
        
        </Router>
      
        
    </>
  )
}

export default App
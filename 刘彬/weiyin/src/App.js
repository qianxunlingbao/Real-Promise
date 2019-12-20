import React, { Component } from 'react'
import Header from './components/Header'
import Title from './components/Title'
import GeDan from './container/GeDan';
import GeCi from './container/GeCi';
import Users from './container/Users';
import Login from './container/Login';
import BangDan from './container/BangDan';
import {BrowserRouter as Router,Route} from 'react-router-dom';

export default class App extends Component {
  render() {
      return (
          <Router>
            <div>
                <Header/>
                <Title/> 
                <div className='main'>
                  <div className="content">
                    <Route exact path='/gedan' component={GeDan} />
                    <Route path='/geci' component={GeCi} />
                    <Route path='/users' component={Users} />
                    <Route path='/login' component={Login} />
                    
                    <Route path='/bangdan' component={BangDan} />
                  </div>
                </div>
            </div>
          </Router>
      )
  }
}

import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DISHES } from '../shared/dishes';

class Main extends Component {
   constructor(props) {
      super(props);
      
      this.state= {
         dishes: DISHES
       }
      }
   
   render() {
      const HomePage = () => {
         return (
         <Home />
         );
      }
   
      return (
         <div>
            <Header />
            <Switch>
               <Route path="/home" component={HomePage} />
               <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
               <Route exact path="/contactus" component={Contact} />
               <Redirect to="/home" />
            </Switch>           
            <Footer />
         </div>
      );
   }
}

export default Main;
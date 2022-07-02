import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
   return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
   }       
}
   
class Main extends Component {
   constructor(props) {
      super(props);
   }
   
   render() {
      const HomePage = () => {
         return (
            <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} promotion={this.props.promotions.filter((promo) => promo.featured)[0]} leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
         );
      }
      
      return (
         <div>
            <Header />
            <Switch>
               <Route path="/home" component={HomePage} />
               <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
               <Redirect to="/home" />
            </Switch>           
            <Footer />
         </div>
      );
   }
}

export default withRouter(connect(mapStateToProps)(Main));
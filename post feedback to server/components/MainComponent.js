import React, { Component } from 'react';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
   return {
   }       
}

const mapDispatchToProps = (dispatch) => ({
   postFeedback: (feedback) => dispatch(postFeedback(feedback)),
   resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});
    
class Main extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const HomePage = () => {
         return (
            <h1>Home</h1>
         );
      }
   
      return (
         <div>
                  <Switch>
                     <Route path="/home" component={HomePage} />
                     <Route exact path="/contactus" component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                     <Redirect to="/home" />
                  </Switch>     
         </div>
      );
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
import { baseUrl } from '../shared/baseUrl';
import fetch from 'cross-fetch';

export const postFeedback = (feedback) => (dispatch) => {
   const newFeedback = {
      firstname: feedback.firstname,
      lastname: feedback.lastname,
      telnum: feedback.telnum,
      email: feedback.email,
      agree: feedback.agree,
      contactType: feedback.contactType,
      message: feedback.message
   }
    
   return fetch(baseUrl + 'feedback', {
      method: 'POST',
      body: JSON.stringify(newFeedback),
      headers: {
         'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
   })
   .then(response => {
      if (response.ok) {
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         throw error;
      }
   }, 
   error => {
      var errmess = new Error(error.message);    
      throw errmess;
   })
   .then(response => response.json())
   .then(response => { console.log("Current State is: " + JSON.stringify(response)); 
                       alert("Thank you for your feedback!<br/>" + JSON.stringify(response)); })
   .catch(error => { console.log('Post comments ', error.message);
                     alert('Your feedback could not be posted\nError: ' + error.message); })
}

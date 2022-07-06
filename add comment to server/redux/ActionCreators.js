import { baseUrl } from '../shared/baseUrl';
import * as ActionTypes from './ActionTypes';
import fetch from 'cross-fetch';

export const addComment = (comment) => ({
   type: ActionTypes.ADD_COMMENT,
   payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
       dishId: dishId,
       rating: rating,
       author: author,
       comment: comment
    }
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
       method: 'POST',
       body: JSON.stringify(newComment),
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
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
    alert('Your comment could not be posted\nError: ' + error.message); })
 }
 

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
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
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})
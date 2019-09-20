import {
    REQUEST_POSTS,
    RECEIVE_POSTS
  } from '../actionTypes'

const initialState ={
    isFetching: false,
    didInvalidate: false,
    items: []
}

export default (state=initialState, action)=>{
//console.log(action.posts);
    switch(action.type){
        case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
      
    default:
      return state
    }
}
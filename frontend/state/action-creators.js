// ❗ You don't need to add extra action creators to achieve MVP
import * as types from './action-types.js'
import axios from 'axios'

export function moveClockwise() { 
  return {type: types.MOVE_CLOCKWISE}
}

export function moveCounterClockwise() { 
  return {type: types.MOVE_COUNTERCLOCKWISE}
}

export function selectAnswer(num) { 
  return { 
    type: types.SET_SELECTED_ANSWER,
     payload: num 
    }
}

export function setMessage (message){ 
  return function (dispatch) {
    return { 
      type: SET_INFO_MESSAGE,
       payload: message 
      }
  }
}

export function setQuiz(quiz) {
    return { 
      type: types.SET_QUIZ_INTO_STATE,
       payload: quiz  
      }
 }

export function inputChange({name, value}) { 
return { 
  type: types.INPUT_CHANGE,
   payload: {name, value} 
  }
}


export function resetForm() {
  return { type: types.RESET_FORM }
 }

export function fetchQuiz() {
  const URL = 'http://localhost:9000/api/quiz/next'
  return function (dispatch) {
    axios.get(URL)
    .then((res) => {
      dispatch({
         type: types.SET_QUIZ_INTO_STATE,
         payload: res.data})
    }).catch((err) => { console.log({err})})
  }
}

export function postAnswer(quizID, answerID) {
 const URL = 'http://localhost:9000/api/quiz/answer'
  return function (dispatch) {
    axios.post(URL, { "quiz_id" : `${quizID}`, "answer_id": `${answerID}` })
    .then((res) => {
    dispatch({
      type: types.SET_SELECTED_ANSWER,
       payload: null
      })
    dispatch({
      type: types.SET_INFO_MESSAGE,
       payload: res.data.message
      })
    dispatch(fetchQuiz())
    }).catch((err) => {
      console.error({err})
    })
  }
}
export function postQuiz(newQuestion, newTrueAnswer, newFalseAnswer) {
  const URL = 'http://localhost:9000/api/quiz/new'
  return function (dispatch) {
    axios.post(URL, { "question_text": `${newQuestion}`, "true_answer_text": `${newTrueAnswer}`, "false_answer_text": `${newFalseAnswer}` })
      .then(() => {
        dispatch({
          type: types.SET_INFO_MESSAGE,
           payload: `Congrats: "${newQuestion}" is a great question!`
          })
        dispatch({
          type: types.RESET_FORM
        })
      })
      .catch((err) => {
        ({
          type: types.SET_INFO_MESSAGE,
           payload: err.message
          })
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
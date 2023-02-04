import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {




  const onChange = evt => {
    const {name, value} = evt.target
    props.inputChange({name, value})
  }

  const onSubmit = evt => {    
    evt.preventDefault() 
    const newQuestion = props.form.newQuestion
    const newTrueAnswer = props.form.newTrueAnswer
    const newFalseAnswer = props.form.newFalseAnswer
    props.postQuiz(newQuestion, newTrueAnswer, newFalseAnswer)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input name="newQuestion" maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion}/>
      <input name="newTrueAnswer" maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value ={props.form.newTrueAnswer} />
      <input name="newFalseAnswer" maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button type="submit" id="submitNewQuizBtn" disabled={props.form.newQuestion.trim().length < 1 || props.form.newTrueAnswer.trim().length < 1 || props.form.newFalseAnswer.trim().length < 1}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  const [load, setLoad] = useState(true)



  const loadingString = 'Loading next quiz...'

  useEffect(()=>{
    if (!props.quiz){
      setLoad(true)
    props.fetchQuiz()
    setLoad(false)
  }
  }, [])


    const onSubmit = (event) => {     
      const quizID = props.quiz.quiz_id
      const answerID = props.selectedAnswer === 1 ? props.quiz.answers[0].answer_id : props.quiz.answers[1].answer_id
      props.postAnswer(quizID, answerID)
    }
  
  return (
    
    <div id="wrapper">
      { props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.selectedAnswer === 1 ? 'selected' : 'answer'}`}>
             {props.quiz.answers[0].text}
                <button label={ props.selectedAnswer === 1 ? 'SELECTED' : 'Select'} onClick={()=>{props.selectAnswer(1)}}>
                {props.selectedAnswer === 1 ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={`answer ${props.selectedAnswer === 2 ? 'selected' : 'answer'}`}>
              {props.quiz.answers[1].text}
                <button label={ props.selectedAnswer === 2 ? 'SELECTED' : 'Select'} onClick={()=>{props.selectAnswer(2)}}>
                {props.selectedAnswer === 2 ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button type='submit' id="submitAnswerBtn" onClick={onSubmit} disabled={!props.selectedAnswer}>Submit answer</button>
          </>
        ) : loadingString  }
    </div>
  )
}

const mapStateToProps = (store) => {
  return store
}
export default connect(st => st, actionCreators)(Quiz)
import React, {Component} from 'react'
import classes from './Quiz.module.sass'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from  '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {   
                id: 1,
                question: 'Сколько у вас детей?',
                rightAnswerId: 2,
                answers: [
                    {text: '1', id: 1},
                    {text: '2', id: 2},
                    {text: 'больше 2', id: 3},
                    {text: 'пока нету', id: 4}
                ]
            },
            {   
                id: 2,
                question: 'В каком году основали СПБ?',
                rightAnswerId: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }


    onAnswerClickHandler = (answerId) => {
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') return
        }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

        if (question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId] : 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    this.setState({ isFinished: true });
                }else{
                    this.setState((state) => ({
                        activeQuestion: state.activeQuestion + 1,
                        answerState: null
                    }));
                }
                window.clearTimeout(timeout)
            }, 500)
        }else{
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId] : 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({ 
            activeQuestion:0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    }

    render(){
        return (
            <div className={classes.Quiz}>  

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz 
                                    quiz={this.state.quiz}
                                    results={this.state.results}
                                    onRetry={this.retryHandler}
                                />
                            : <ActiveQuiz 
                                answers = {this.state.quiz[this.state.activeQuestion].answers}
                                question = {this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick = {this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                              />
                    }
                   
                </div>
            </div>
        )
    }
}

export default Quiz
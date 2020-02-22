import React from 'react';
import classes from './FinishedQuiz.module.sass'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total,key) => {
      if (props.results[key] === 'success') total++
      return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>   
            <ul className={classes.FinishedQuiz__list}>
                { props.quiz.map((quizItem, index) => {
                    console.log('prop',props.results[quizItem.id])
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li className={classes.FinishedQuiz__item}
                            key={index}
                        >
                            <strong>{index + 1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>

            <p>Правильно {successCount} из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type='primary'>Повторить</Button>
                <Link to="/">
                 <Button type='success'>Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz
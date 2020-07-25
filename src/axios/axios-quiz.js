import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-2cfa5.firebaseio.com'
})
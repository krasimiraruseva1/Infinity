const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text')); /*all elements connected to styles*/
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptionAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [ /*questions*/
    {
        question: "Which of the following landmarks does the description apply: The name of the town is also connected with the Great Heath?",
        choice1: 'Thracian cult complex in Mishkova Niva',
        choice2: 'The big scream',
        choice3: 'Uspenie Bogorodichno',
        choice4: 'Church of Tsar Boris Mihail',
        answer: 2, //second option for answer -- > choice 2: ''
    },
    {
        question: "Which of the following landmarks does the description apply: It was built in 1831 on the foundations of another church, called the Holy Trinity?",
        choice1: 'Uspenie Bogorodichno',
        choice2: 'Thracian cult complex in Mishkova Niva',
        choice3: 'Church of Tsar Boris Mihail',
        choice4: 'The big scream',
        answer: 1, //first option for answer -- > choice 1: ''
    },
    {
        question: "Which of the following landmarks does the description apply: Connected with Villa Rustika - the residence of the servants of the temple?",
        choice1: 'The big scream',
        choice2: 'Petrova niva',
        choice3: 'Thracian necropolis and tombs in the area of ​Propada',
        choice4: 'Thracian cult complex in Mishkova Niva',
        answer: 3, //third option for answer -- > choice 3: ''
    },
    {
        question: "Which of the following landmarks does the description apply: In 1903, a congress of the VII Edirne Revolutionary District was held here?",
        choice1: 'The big scream',
        choice2: 'Thracian cult complex in Mishkova Niva',
        choice3: 'Thracian necropolis and tombs in the area of ​Propada',
        choice4: 'Petrova niva',
        answer: 4, //fourth option for answer -- > choice 4: ''
    },
    {
        question: "Which of the following landmarks does the description apply: Small village, popular mostly for its large locality of the rare plant from prehistoric times?",
        choice1: 'Petrova niva',
        choice2: 'Thracian necropolis and tombs in the area of ​Propada',
        choice3: 'The big scream',
        choice4: 'Kondolovo',
        answer: 4, //fourth option for answer -- > choice 4: ''
    }
]

const scorePoints = 100;
const maxQuestions = 5;

startGame = () => { // start game function
    questionCounter = 0
    score = 0
    availableQuestions = [...questions] // to sepate the questions
    getNewQuestion()
}

getNewQuestion = () => { // getNewQuestion function
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) // if number of available question is 0 or number of question is bigger than maxQuestions
    {   
        localStorage.setItem('mostRecentScore', score) // print out the most recent score and corenspondible score

        return window.location.assign('end.html') // end game of the page
    }
        questionCounter++ //increment a question counter
        progressText.innerText = `Question ${questionCounter} of ${maxQuestions}` // Print out the number of question
        progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%` // fulling the progress Bar
    
        const questionsIndex = Math.floor(Math.random() * availableQuestions.length) // set up the current question and randomly choose a question
        currentQuestion = availableQuestions[questionsIndex]
        question.innerText = currentQuestion.question
    
        choices.forEach(choice => { //set up the answers
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })
    
        availableQuestions.splice(questionsIndex, 1) //add the incrementation to make available questions and questions index equal
    
        acceptionAnswers = true //if the answer is correct and move on to the next question or not 
}

choices.forEach(choice => { // function for each choice
    choice.addEventListener('click', e => { // when is clicked
        if (!acceptionAnswers) return

        acceptionAnswers = false;
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') //incrementing a score
        {
            incrementScore(scorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply) //color of the answer according if it is true or false --> false - red, true - green <--

        setTimeout (() => { //time for moving on to the next question
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => { // incrementing the score
    score += num
    scoreText.innerText = score
}

startGame() //starting the game
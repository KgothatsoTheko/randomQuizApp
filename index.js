//Adding the questions
const questions = [
    {
        question: 'Which is the largest animal in the world?',
        answers: [
            { text: 'Shark', correct: false},
            { text: 'Blue Whale', correct: true},
            { text: 'Elephant', correct: false},
            { text: 'Giraffe', correct: false},
        ] 
    }, 
    {
        question: 'Who is wealthiest?',
        answers: [
            { text: 'Elon Musk', correct: true},
            { text: 'Bill Gates', correct: false},
            { text: 'Mark Zuckerberg', correct: false},
            { text: 'Jeff Bezos', correct: false},
        ] 
    },
    {
        question: 'Most influential rapper?',
        answers: [
            { text: 'J cole', correct: false},
            { text: 'Kendrick Lamar', correct: true},
            { text: 'Drake', correct: false},
            { text: 'Eminem', correct: false},
        ] 
    },
    {
        question: 'Most popular platform?',
        answers: [
            { text: 'TikTok', correct: false},
            { text: 'WhatsApp', correct: false},
            { text: 'Instagram', correct: false},
            { text: 'Facebook', correct: true},
        ] 
    },
    {
        question: 'Which power would you have?',
        answers: [
            { text: 'Flight', correct: false},
            { text: 'Telekinesis', correct: false},
            { text: 'Invisibility', correct: false},
            { text: 'Telepathy', correct: true},
        ] 
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

showQuestion = () => {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach( answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

resetState = () => {
    nextButton.style.display = 'none'
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

selectAnswer = (e) => {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true"
    if(isCorrect) {
        selectBtn.classList.add("correct");
        score++
    }else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}

handleNextButton = () => {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore()
    }
}

showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block'
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()
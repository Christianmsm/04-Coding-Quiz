let questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: 'strings', correct: false }, 
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'numbers', correct: false }
        ]
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'parentheses', correct: true },
            { text: 'square brackets', correct: false }
        ]
    },
    {
        question: 'Array in JavaScript can be used to store ____."?',
        answers: [
            { text: 'numbers & string', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'booleans', correct: false },
            { text: 'all of the  above', correct: true }
        ]
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to varriables.',
        answers: [
            { text: 'quotes', correct: true },
            { text: 'curly brackets', correct: false},
            { text: 'parenthesis', correct: false },
            { text: 'commas', correct: false }
        ]
    },
    {
        question: 'Which of the following is NOT a JavaScript keyword?',
        answers: [
            { text: 'let', correct: false },
            { text: 'const', correct: false },
            { text: 'var', correct: false },
            { text: 'git', correct: true }
        ],
    },
    {question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: [
        { text: 'for loops', correct: false},
        { text: 'console.log', correct: true},
        { text: 'JavaScript', correct: false},
        { text: 'terminal', correct: false}
         ],
    }
]

//variables for all the elements
let startButton = document.getElementById('start-btn');
let startScreenEl = document.getElementById('start-screen');
let timeRemainingEl = document.getElementById('time-remaining');
let quizSectionEl = document.getElementById('quiz-section');
let questionEl = document.getElementById('question');
let answerEl = document.getElementById('answers');
let nextButton = document.getElementById('next-btn');
let resultEl = document.getElementById('result');
let resultText = document.getElementById('result-text');
let highScoreEl = document.getElementById('highscores-screen');
let saveScoreEl = document.getElementById('save-highscore');
let viewScoresButton = document.getElementById('high-scores');
let backButton = document.getElementById('back-btn');
let playAgainButton = document.getElementById('play-again-btn');
let submitScoreButton = document.getElementById('save-score-btn');
let rightAnswerAudio = document.getElementById('right-answer');
let wrongAnswerAudio = document.getElementById('wrong-answer');


let shuffledQuestions, currentQuestionIndex;
let timeRemaining = 60;
let timeIntervalId;


startButton.addEventListener('click', startGame);
answerEl.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

viewScoresButton.addEventListener('click', viewScores);
backButton.addEventListener('click', goBack);
submitScoreButton.addEventListener('click', submitScore);
playAgainButton.addEventListener('click', playAgain);

function startGame() {
    startScreenEl.style.display = 'none';
    viewScoresButton.style.visibility = 'hidden';
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizSectionEl.style.display = 'flex';
    setNextQuestion();
    startTimer();
};

function startTimer() {
    timeIntervalId = setInterval(function() {
        timeRemaining--;
        timeRemainingEl.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timeIntervalId);
            endGame();
        }
    }, 1000);
}

function setNextQuestion() {
    clearQuestion();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// displays the question on the screen and confirms the answers are correct
function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerEl.appendChild(button);
    })
};

function clearQuestion() {
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild);
    }
};

// confirms if  the answer is correct
function selectAnswer(j) {
    let selectedButton = j.target
    let correct = selectedButton.dataset.correct
    checkAnswer(document.body, correct);
};

function checkAnswer(button, correct) {
    if (correct) {
        resultText.textContent = ('Correct!');
        resultEl.style.visibility = "visible";
        rightAnswerAudio.addEventListener('click');
        audio.src = src;
        rightAnswerAudio.audio.play();
    } else {
        resultText.textContent = ('Wrong!');
        resultEl.style.visibility = "visible";
        wrongAnswerAudio;
        //if the answer is not correct subtracts 10 seconds from the timer and updates it's display
        timeRemaining -= 10;
        timeRemainingEl.textContent = timeRemaining;
    }
};

function endGame() {
    clearInterval(timeIntervalId);
    quizSectionEl.style.display = "none";
    saveScoreEl.style.display = "flex";
}

function viewScores() {
    startScreenEl.style.display = "none";
    highScoreEl.style.display = "flex";
    viewScoresButton.style.display = "none";
    backButton.style.display = "flex";
}

function goBack() {
    highScoreEl.style.display = "none";
    startScreenEl.style.display = "flex";
    backButton.style.display = "none";
    viewScoresButton.style.display = "flex";
}

function playAgain() {
    highScoreEl.style.display = "none";
    startScreenEl.style.display = "flex";
    backButton.style.display = "none";
    playAgainButton.style.display = "none";
    viewScoresButton.style.display = "flex";
    viewScoresButton.style.visibility = 'visible';
}

function submitScore() {
    saveScoreEl.style.display = "none";
    highScoreEl.style.display = "flex";
    playAgainButton.style.display = "flex";
    viewScoresButton.style.display ="none";
}
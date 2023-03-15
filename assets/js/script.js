// contains all of the questions with the correct & incorrect answers
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
let inputEl = document.getElementById('initials-input');
let recentScoreEl = document.getElementById('scores');
let highscoreListEl = document.getElementById('highscores-list');

let rightAnswerAudio = document.getElementById('right-answer');
let wrongAnswerAudio = document.getElementById('wrong-answer');


let shuffledQuestions, currentQuestionIndex;
let timeRemaining = 60;
let timeIntervalId;
let allHighscores = [];


startButton.addEventListener('click', startGame);
answerEl.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

viewScoresButton.addEventListener('click', function () {
    viewScores();
    displayHighscores();
});
backButton.addEventListener('click', goBack);
submitScoreButton.addEventListener('click', submitScore);
playAgainButton.addEventListener('click', playAgain);

// starts the game
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

 
// shuffles up the questions
function setNextQuestion() {
    clearQuestion();
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endGame();
    } else {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
};


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


function selectAnswer(e) {
    let selectedButton = e.target
    let correct = selectedButton.dataset.correct
    checkAnswer(document.body, correct);
};

function checkAnswer(button, correct) {
    if (correct) {
        resultText.textContent = ('Correct!');
        resultEl.style.visibility = "visible";
    } else {
        resultText.textContent = ('Wrong!');
        resultEl.style.visibility = "visible";
        timeRemaining -= 10;

        if (timeRemaining < 0) {
            timeRemaining = 0;
        }
        timeRemainingEl.textContent = timeRemaining;
    }
};

function endGame() {
    let score = timeRemaining;
    recentScoreEl.textContent = score;
    clearInterval(timeIntervalId);
    timeRemaining = 75;
    timeRemainingEl.textContent = timeRemaining;
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
    let initials = inputEl.value.trim();
    let score = parseInt(recentScoreEl.textContent);
    if (initials && score) {
        allHighscores.push({ initials: initials, score: score });
        localStorage.setItem('highscores', JSON.stringify(allHighscores));
    }
    displayHighscores();
}


// displays the highscores
function displayHighscores() {
    allHighscores.sort(function(a, b) {
        return b.score - a.score;
    });
  

    allHighscores = allHighscores.slice(0, 5);
    highscoreListEl.innerHTML = "";
    allHighscores.forEach(function(highscore) {
        let highscoreItem = document.createElement('li');
        highscoreItem.textContent = highscore.initials + ' - ' + highscore.score;
        highscoreListEl.appendChild(document.createElement('hr'));
        highscoreListEl.appendChild(highscoreItem);
    });
}
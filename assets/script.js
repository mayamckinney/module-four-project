// question object

const questions = [
    {
        question: "What did the people of Haddonfield also call Michael Meyers?",
        choices: ["a. The Boogeyman", "b. The Halloween Killer", "c. The Shape", "d. The Haddonfield Terror"],
        answer: "a. The Boogeyman"
    },
    {
        question: "Who notoriously wears a hockey mask?",
        choices: ["a. Freddy Krueger", "b. Ghostface", "c. Jason Voorhees", "d. Chucky"],
        answer: "c. Jason Voorhees"
    },
    {
        question: "Who puts live bees in their mouth?",
        choices: ["a. Norman Bates", "b. Candyman", "c. Leatherface", "d. all of the above"],
        answer: "b. Candyman"
    },
    {
        question: "Who is known for riding a red tricycle?",
        choices: ["a. Predator", "b. The Bye Bye Man", "c. Jigsaw", "d. Hal"],
        answer: "c. Jigsaw"
    },
    {
        question: "What cult movie franchise is said to be cursed following a series of accidents and tragedies involving actors in the various films?",
        choices: ["a. Poltergeist", "b. Alien", "c. Hostel", "d. Rec"],
        answer: "a. Poltergeist"
    },
    {
        question: "'The Evil Dead' (1981), 'Cabin Fever' (2004), and 'Misery' (1990), all feature what classic horror plot device?",
        choices: ["a. A rainy night", "b. A deranged madman", "c. A haunted house", "d. Chacters stranded in an isolated place"],
        answer: "d. Chacters stranded in an isolated place"
    },
    {
        question: "In both the remake and the original, what type of blood does Carrie get covered in?",
        choices: ["a. Human blood", "b. Chicken blood", "c. Pig blood", "d. Black cat's blood"],
        answer: "c. Pig blood"
    },
    {
        question: "Which of the following did not feature Jamie Lee Curtis?",
        choices: ["a. Friday the 13th", "b. The Fog", "c. Halloween", "d. Prom Night"],
        answer: "a. Friday the 13th"
    },
    {
        question: "What is the occupation of Hannibal Lecter, the serial killer who appears in such films as The Silence of the Lambs?",
        choices: ["a. Chef", "b. Psychologist", "c. Pediatrician", "d. Psychiatrist"],
        answer: "d. Psychiatrist"
    },
    {
        question: "'Psycho' (1960) was the first American film to feature what common household item on screen?",
        choices: ["a. Shower", "b. Toilet", "c. Car", "d. Bed"],
        answer: "b. Toilet"
    },
    {
        question: "When is Rosemary's due date in Rosemary's Baby?",
        choices: ["a. July 1st", "b. June 28th", "c. September 17th", "d. October 31st"],
        answer: "b. June 28th"
    },
    {
        question: "Which of the following was not based on a Stephen King work?",
        choices: ["a. Cujo", "b. Misery", "c. Children of the Corn", "d. The Exorcist"],
        answer: "d. The Exorcist"
    }
];

// variables to link ids

var timer = document.getElementById("time-left");
var startCard = document.getElementById("start");
var startButton = document.getElementById("start-button");
var questionCard = document.getElementById("question-card");
var questionTitle = document.getElementById("question-title");
var answerCheck = document.getElementById("answer-check");
var highScoresCard = document.getElementById("high-scores-card");
var highScores = document.getElementById("list-of-high-scores");
var resultsCard = document.getElementById("results-card");
var viewHighScores = document.getElementById("view-high-scores")
var submitButton = document.getElementById("submit-button");
var finalScore = document.getElementById("final-score");
var backButton = document.getElementById("back-button");
var clearButton = document.getElementById("clear-button");
var userInput = document.getElementById("userInput");

var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");

// other used variables in code

var questionArray = 0;
var scoreTally = 0;
var time = questions.length * 15;
var timerId;

// timer

function clockTick() {
    time--;
    timer.textContent = time;

    if (time <= 0) {
        endGame();
    }

}

// displays question card & starts timer. runs next function

function startQuiz() {
    startCard.style.display = "none";
    questionCard.style.display = "block";
    
    timerId = setInterval(clockTick, 1000);
    timer.textContent = time;

    displayQuiz();

}

function displayQuiz() {
    nextQuestion();
}

// fills questions & choices from object to the html

function nextQuestion() {
    questionTitle.textContent = questions[questionArray].question;
    choiceA.textContent = questions[questionArray].choices[0];
    choiceB.textContent = questions[questionArray].choices[1];
    choiceC.textContent = questions[questionArray].choices[2];
    choiceD.textContent = questions[questionArray].choices[3];
}

//checks answers. cant get this funciton to work with the current code i have. work in progress

function checkAnswer() {
    answerCheck.style.display = "block";

 
    var answer = questions.map(function(el) {
        return el.answer;
      });
   console.log(questions[questionArray].choices);
    if (questions[questionArray].answer === questions[questionArray].choices[answer]) {
        scoreTally++;
        answerCheck.textContent = "Correct!";
    } else {
        time -= 10;
        // timer.textContent = time;
        answerCheck.textContent = "Wrong. The correct answer is " + questions[questionArray].answer;
    }

    questionArray++;

    if (questionArray < questions.length) {
        displayQuiz();
    } else {
        endGame();
    }
}

function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }

function endGame() {
    resultsCard.style.display = "block";
    questionCard.style.display = "none";
    startCard.style.display = "none";
    highScoresCard.style.display = "none";

    timer.textContent = "";

    finalScore.textContent = scoreTally;
}

function saveHighScores(event) {
    event.preventDefault();

    resultsCard.style.display = "none";
    questionCard.style.display = "none";
    startCard.style.display = "none";
    highScoresCard.style.display = "block";

    if (userInput === "") {
        window.alert("Please enter your initials!");
        return;
    }

    var scoresArray;
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    var savedScores = localStorage.getItem("high scores");

    if (savedScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedScores);
    }

    var userScore = {
        initials: userInput.value,
        score: finalScore.textContent
    };

    scoresArray.push(userScore);

    showHighScores();
}

function showHighScores() {
    resultsCard.style.display = "none";
    questionCard.style.display = "none";
    startCard.style.display = "none";
    highScoresCard.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }

    var storedHighScores = JSON.parse(savedHighScores);

    for (var i = 0; i < storedHighScores.length; i++) {
        var newHighScore = document.createElement("p");
        newHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

startButton.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitButton.addEventListener("click", function(event){ 
    saveHighScores(event);
});

viewHighScores.addEventListener("click", function(event) { 
    showHighScores(event);
});

backButton.addEventListener("click", function() {
    startCard.style.display = "block";
    highScoresCard.style.display = "none";
});

clearButton.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    highScores.innerHTML = "High score board is cleared!";
});


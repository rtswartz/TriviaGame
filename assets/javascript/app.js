var q1 = {
    question: "Which Kansas player was drafted fifth in the 2017 NBA Draft?",
    choice: ["Josh Jackson", "Carlton Bragg", "Udoka Azubuike", "Dwight Coleby"],
    rightAnswer: "Josh Jackson",
    image: '<img src="assets/images/JoshJackson.jpg" id="image">',
    explanation: '<div id="legend">Josh Jackson came to Kansas as a McDonalds All America and the hype did not disappoint. Josh averaged 16/7/3/2 and led Kansas to a Big 12 Conference Title and Elite 8. These accolades among others led Josh to being selected 5th in the NBA Draft by the Phoenix Suns</div>'
};
var q2 = {
    question: "Which Kansas player was drafted fifteen in the 2015 NBA Draft?",
    choice: ["Kelly Oubre", "Wayne Selden", "Franke Mason", "Perry Ellis"],
    rightAnswer: "Kelly Oubre",
    image: '<img src="assets/images/KellyOubre.jpg" id="image">',
    explanation: '<div id="legend"> Kelly Oubre was drafted fifteen overall by the Atlanta Hawks by traded on draft day to the Washington Wizards were he still plays today. </div>'
};
var q3 = {
    question: "Which Kansas player wasd drafted first in the 2014 NBA Draft?",
    choice: ["Andrew Wiggins", "Joel Embiid", "Brannen Greene", "Tyler Self"],
    rightAnswer: "Andrew Wiggins",
    image: '<img src="assets/images/AndrewWiggins.jpg" id="image">',
    explanation: '<div id="legend">The highest recruited highschool player since Lebron James comes with alot of pressure. Andrew lead the young Kansas team to a regular season conference title & #1 seed in the NCAA tournament. Andrew also broke the freshman scoring record at Kansas that was over 50 years old! All this along with incredible upside due to athletic potential led Andrew to being selected #1 overall by the Cleveland Cavaliers and then immediately traded to the Minnesota Timberwolves</div>'
};
var q4 = {
    question: "Which Kansas player wasd drafted third in the 2014 NBA Draft?",
    choice: ["Joel Embiid", "Brannen Greene", "Tyler Self", "Andrew White"],
    rightAnswer: "Joel Embiid",
    image: '<img src="assets/images/JoelEmbiid.jpg" id="image">',
    explanation: '<div id="legend">Joel came out of nowhere, literally. As a small recruit from Africa little was truly known about this 7fter. Without a late season back injury Joel would have gone #1 over teammate Andrew Wiggins. Instead he fell to the 76er at #3 where he still plays today.</div>'
};
var q5 = {
    question: "Which Kansas player was drafted seventh in the 2013 NBA Draft?",
    choice: ["Ben McLemore", "Jeff Withey", "Evan Manning", "Kevin Young"],
    rightAnswer: "Ben McLemore",
    image: '<img src="assets/images/BenMcLemore.jpg" id="image">',
    explanation: '<div id="legend">After just 1 redshirt season at Kansas, Ben was spectacular. At 6ft 5inches from St.Louis this SG was selected 7th by the Sacramento Kings</div>'
};
var q6 = {
    question: "Which Kansas player was drafted fifth in the 2012 NBA Draft?",
    choice: ["Thomas Robinson", "Jamari Traylor", "Tyshawn Taylor", "Travis Releford"],
    rightAnswer: "Thomas Robinson",
    image: '<img src="assets/images/ThomasRobinson.jpg" id="image">',
    explanation: '<div id="legend">This was my senior year in college and boy was it fun! Thomas led us to a Big 12 Championship and all the way to the National Championship (which we lost). He still remains one of my all time favorite Jayhawks as he played with tons of passion</div>'
};

var questions = [q1, q2, q3, q4, q5, q6];
var currentQuestion = 0;
var userGuess = '';
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var userChoise = '';
var correctAnswer = '';
var timeLeft = 20;
var counter = 0;

$(document).ready(function () {
    $('.startButton').click(function () {
        displayNext();
    });

    //this is the function that starts the game


    function answerSelection() {
        timeLeft = 20;
        counter = setInterval(timer, 1000)
        $('.answerChoices').click(function () {
            userGuess = $(this).data('userGuess');
            rightAnswer = questions[currentQuestion].rightAnswer;
            if (userGuess === rightAnswer) {
                $('.gameBox').html('<div id="correctIncorrectHeader">Correct!</div>');
                $('.gameBox').append(questions[currentQuestion].explanation).addClass('question');
                $('.gameBox').append(questions[currentQuestion].image);
                resetTimer();
                correctAnswers++;
                currentQuestion++;
                setTimeout(displayNext, 10000);
            } else {
                $('.gameBox').html('<div id="correctIncorrectHeader">Wrong!</div>')
                $('.gameBox').append(questions[currentQuestion].explanation).addClass('question');
                $('.gameBox').append(questions[currentQuestion].image);
                resetTimer();
                wrongAnswers++;
                currentQuestion++;
                setTimeout(displayNext, 10000);
            }
        });
    }

    function displayNext() {
        // resetTimer();
        if (currentQuestion >= questions.length) {
            $('.gameBox').html('<div class="question">Let\'s see how you did!</div>');
            $('.gameBox').append('<div id="correctIncorrect">Correct Answers: ' + correctAnswers + '</div>');
            $('.gameBox').append('<div id="correctIncorrect">Wrong Answers: ' + wrongAnswers + '</div>')
            $('.gameBox').append('<div id="correctIncorrect">Unanswered Questions: ' + unanswered + '</div>')
            $('.gameBox').append('<button class="restartButton hvr-radial-in">Restart Game?</button>')
            $('.restartButton').click(function () {
                $('.gameBox').empty();

                currentQuestion = 0;
                userGuess = '';
                correctAnswers = 0;
                wrongAnswers = 0;
                unanswered = 0;
                userChoise = '';
                correctAnswer = '';
                timeLeft = 20;
                counter = 0;

                $('.gameBox').html("<button class='startButton btn btn-primary center-block'>Start</button>");
                $('.startButton').click(function () {
                    displayNext();
                });
            });
            return false;
        }
        // counter = setInterval(timer,10000);

        $('.gameBox').html('<div class="timeLeft">Time Left: <span id="time">20</span></div>');
        var questionToAnswer = $('<div>').append(questions[currentQuestion].question).addClass('question');
        $('.gameBox').append(questionToAnswer);

        var questionsDiv = $('.gameBox');

        for (var i = 0; i < 4; i++) {
            var newQuestionsDiv = $('<div>').append(questions[currentQuestion].choice[i])
                .addClass('answerChoices')
                .data('rightAnswer', questions[currentQuestion].rightAnswer)
                .data('userGuess', questions[currentQuestion].choice[i]);
            questionsDiv.append(newQuestionsDiv);
        }
        answerSelection();
    }


    function timer() {
        if (timeLeft === 1) {
            $('.gameBox').html('<div id="correctIncorrectHeader"><b>Your time is up!</b></div>');
            $('.gameBox').append(questions[currentQuestion].explanation).addClass('question');
            $('.gameBox').append(questions[currentQuestion].image);
            resetTimer();
            unanswered++;
            currentQuestion++;
            setTimeout(displayNext, 10000);
        }
        timeLeft--;
        $('#time').html(timeLeft);
    }

    function resetTimer() {
        clearInterval(counter);
        counter = 0;
    }
});
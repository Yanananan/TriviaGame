//array of objects containing question and answer sets
var quiz = [
    {question: "How are you?",
    answers: ["I am good.","Could be better.","It's been rough..."],
    quote: "People may hear your words, but they feel your attitude.",
    quoted: "John C. Maxwell"
    // correct: 1  At first I specified correct answers, but I feel this quiz would be more fun if the "correct" answers are randomized.  These questions are silly and have no right answers anyway.
    },
    {question: "How can I help you?",
    answers: ["Tell me a joke.","Sing me a song.","Give me a hug.","Leave me alone."],
    quote: "No one is useless in this world who lightens the burdens of another.",
    quoted: "Charles Dickens"
    },
    {question: "Who are you?",
    answers: ["I don't know.","I am a fabulous and unique being.","I am the sum of my experiences.","I just am."],
    quote: "We know what we are, but not what we may be.",
    quoted: "William Shakespeare"
    },
    {question: "What brings you here?",
    answers: ["Where am I?","Bart...Bart brought me here.","My sense of adventure brought me here.","My love of alcohol."],
    quote: "It's being here now that's important.",
    quoted: "George Harrison"
    },
    {question: "What do you see?",
    answers: ["I see the light.","I see riches.","I see dead people.","Icy Hot: Icy to dull the pain. Hot to relax it away."],
    quote: "The most pathetic person in the world is someone who has sight but no vision.",
    quoted: "Helen Keller"
    },
    {question: "What will you do?",
    answers: ["I will bid you farewell.","I will go to Disney Land!","I~~~~iiiiIII will always love you."],
    quote: "Glory lies in the attempt to reach one's goal and not in reaching it.",
    quoted: "Mahatma Gandhi"
    }
]
var questionCounter = 0;//counter to keep track of questions
var answerID="";//variable for selected answer, will be "" if not selected
var questionTimer;//timer for answering question
var questionCountdown;//counter to display timer on screen
var correctCounter = 0;//counter for correct answers
var wrongCounter = 0;//counter for incorrect answers
var idleCounter = 0;//counter for non-answers

//function to display question page
function fillQuestion(){
    $("#content").empty();
    $("#content").append($("<div>").attr("id","timerDiv").html("Time Remaining: <span id='timerSpan'></span>"));
    $("#content").append($("<div>").attr("id","questionDiv").html(quiz[questionCounter].question));
    $("#content").append($("<div>").attr("id","answersDiv"));
    var randomNumber = 0;
    for (var i in quiz[questionCounter].answers){
        randomNumber = Math.random();
        if (randomNumber<0.5){//randomize the order of the choices
            $("#answersDiv").append($("<div>").attr({"class":"choice","id":"choice"+i}).html(quiz[questionCounter].answers[i]));
        } else {
            $("#answersDiv").prepend($("<div>").attr({"class":"choice","id":"choice"+i}).html(quiz[questionCounter].answers[i]));
        }
    }
    var counter = 5;
    questionCountdown = setInterval(function(){
        counter--;
        $("#timerSpan").text(counter);
        
    },1000)
    questionTimer = setTimeout(fillAnswer,5000);
}

//function to display answer page, will redirect to question page or result page after a timer, depending on situation
function fillAnswer(){
    console.log("answerID="+answerID);
    clearInterval(questionTimer);
    clearInterval(questionCountdown);
    $(".choice").remove();//make sure all choice divs are removed
    var correct = Math.floor(Math.random()*(quiz[questionCounter].answers.length));//randomized "correct" answer
    console.log("correct="+correct);
    if (answerID==correct){
        $("#questionDiv").html("You have a point.");
        correctCounter++;
    } else {
        if (answerID==""){
            $("#questionDiv").html("Let's revisit this later...");
            idleCounter++;
        } else {
            $("#questionDiv").html("We have room to improve.");
            wrongCounter++;
        }
        $("#answersDiv").append($("<div>").attr({"id":"correctChoice"}).html("I think you meant: "+quiz[questionCounter].answers[correct]));
    }
    $("#content").append($("<div>").attr("id","quoteDiv").html(quiz[questionCounter].quote));
    $("#content").append($("<div>").attr("id","quotedDiv").html(quiz[questionCounter].quoted));
    

    answerID="";
    questionCounter++;
    if (questionCounter==quiz.length){//if no more questions
        setTimeout(fillResult,3000);
    } else {
        setTimeout(fillQuestion,3000);
    }
}

//function to display final result page
function fillResult(){
    clearInterval(questionTimer);
    clearInterval(questionCountdown)
    $("#questionDiv").html("Let us review:");
    $("#correctChoice").remove();
    $("#answersDiv").append($("<div>").attr({"id":"correctCounter"}).html("Number of valid points: "+correctCounter));
    $("#answersDiv").append($("<div>").attr({"id":"wrongCounter"}).html("Opportunities for change: "+wrongCounter));
    $("#answersDiv").append($("<div>").attr({"id":"idleCounter"}).html("Topics to delve into: "+idleCounter));
    $("#answersDiv").append($("<div>").attr({"id":"reset"}).html("Shall we try again?"));
    $("#quoteDiv").remove();
    $("#quotedDiv").remove();
}

//on click function to change from start page to first game page
$(document).on("click","#start",fillQuestion);

//on click function to change from game page to result page
$(document).on("click",".choice",function(){
    answerID = $(this).attr("id").substr(6,7);
    fillAnswer();
})

//on click function to change from final result page to first game page
$(document).on("click","#reset",function(){
    questionCounter = 0;
    correctCounter = 0;
    wrongCounter = 0;
    idleCounter = 0;
    fillQuestion();
})

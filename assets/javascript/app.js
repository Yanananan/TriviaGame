//array of objects containing question and answer sets
var quiz = [
    {question: "How are you?",
    answers: ["I am good.","Could be better."],
    correct: 1},
    {question: "How can I help you?",
    answers: ["Tell me a joke.","Sing me a song.","Leave me alone."],
    correct: 2},
]
var questionCounter = 0;
var answerID="";
var questionTimer;
var questionCountdown;
//commonly used functions: clear screen, fill screen with question, fill screen with answer, fill screen with result
// function clearScreen(){
//     $("#content").remove();
// }

function fillQuestion(){
    $("#content").remove();
    $("#center").append($("<div>").attr("id","content"));
    $("#content").append($("<div>").attr("id","timerDiv").html("Time Remaining: <span id='timerSpan'></span>"));
    $("#content").append($("<div>").attr("id","questionDiv").html(quiz[questionCounter].question));
    $("#content").append($("<div>").attr("id","answersDiv"));
    for (var i in quiz[questionCounter].answers){
        $("#answersDiv").append($("<div>").attr({"class":"choice","id":"choice"+i}).html(quiz[questionCounter].answers[i]));
    }
    var counter = 5;
    questionCountdown = setInterval(function(){
        counter--;
        $("#timerSpan").text(counter);
        
    },1000)
    questionTimer = setTimeout(fillAnswer,5000);
    
    
}

function fillAnswer(){
    console.log("answerID="+answerID);
    //stop timer, show stopped timer
    clearInterval(questionTimer);
    clearInterval(questionCountdown)
    $(".choice").remove();//make sure all choice divs are removed
    if (answerID==quiz[questionCounter].correct){
        $("#questionDiv").html("You are right!");
    } else {
        if (answerID==""){
            $("#questionDiv").html("You are too slow!");
        } else {
            $("#questionDiv").html("You are wrong!");
        }
        $("#answersDiv").append($("<div>").attr({"id":"correctChoice"}).html("The correct answer: "+quiz[questionCounter].answers[quiz[questionCounter].correct]));
    }
    //insert some graphics
    questionCounter++;
    setTimeout(fillQuestion,5000);
}
//on click function to change from start page to first game page
$(document).on("click","#start",fillQuestion);

//on click function to change from game page to result page
$(document).on("click",".choice",function(){
    answerID = $(this).attr("id").substr(6,7);
    fillAnswer();
})
//on timer function to change from game page to result page, should timer expires
// setTimeout(fillAnswer(answerID),10000);
//on timer function to change from result page to next game page

//on click function to change from last game to final result page

//on timer function to change from last game to final result page, should timer expire

//on click function to change from final result page to first game page
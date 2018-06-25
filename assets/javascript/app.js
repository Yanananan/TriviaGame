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
//commonly used functions: clear screen, fill screen with question, fill screen with result
function clearScreen(){
    $("#content").remove();
}

function fillQuestion(){
    $("#center").append($("<div>").attr("id","content"));
    $("#content").append($("<div>").attr("id","timerDiv").html("Time Remaining:<span id='timerSpan'></span>"));
    $("#content").append($("<div>").attr("id","questionDiv").html(quiz[questionCounter].question));
    $("#content").append($("<div>").attr("id","answerDiv"));
    for (var i in quiz[questionCounter].answers){
        $("#answerDiv").append($("<div>").attr({"class":"answer","id":"answer"+i}).html(quiz[questionCounter].answers[i]));
    }
}
//on click function to change from start page to first game page
$("#start").on("click",function(){
    clearScreen();
    fillQuestion();
    // questionCounter++;
})
//on click function to change from game page to result page
$(document).on("click",".answer",function(){
    var answerID = $(this).attr("id").substr(6,7);
    if (answerID==quiz[questionCounter].correct){
        //do correct answer screen
    } else {
        //do incorrect answer screen
    }
})
//on timer function to change from game page to result page, should timer expires

//on timer function to change from result page to next game page

//on click function to change from last game to final result page

//on timer function to change from last game to final result page, should timer expire

//on click function to change from final result page to first game page
let userClickedPattern = [];
let gamePattern = [];

const buttonColours=["red", "blue", "green", "yellow"];

let level = 0;
let started = false;

$(document).keypress(()=>{
    if(!started)
    {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
    }})

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    animatePress(userChosenColour); 
    playSound(`./sounds/${userChosenColour}.mp3`);
    checkAnswer(userClickedPattern.length -1);
})

const playSound = (name) =>
{
    let audio = new Audio(name);
    audio.play();
}
const nextSequence=()=>
{
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    
    $(`#${randomChosenColour}`).fadeOut().fadeIn();
    playSound(`./sounds/${randomChosenColour}.mp3`);
}
function animatePress(currentColour)
{
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(()=>{
         $(`#${currentColour}`).removeClass("pressed")
    },100);
}
const checkAnswer = (currentLevel) => {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("succes");
         if(userClickedPattern.length === gamePattern.length)
         {
             setTimeout(()=>{
                nextSequence();
                },1000);
         }
    }  
    else{
        console.log("wrong");
        gameOver();
        startOver();
    }
    
}
const gameOver =()=>
{
    playSound("./sounds/wrong.mp3");
    $(document.body).addClass("game-over");
    setTimeout(()=> {
        $(document.body).removeClass("game-over");
    },2000);
    $("#level-title").text("Game Over, Press Any Key to Restart");
}
const startOver=()=> 
{
    level = 0;
    gamePattern = [];
    started = false;
}
   

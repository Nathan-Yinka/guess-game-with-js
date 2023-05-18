// selecting DOM elements
const display = document.querySelector('#display');
const check = document.querySelector('.check');
const reset = document.querySelector('.again');
let guess = document.querySelector('.guess');
let number = document.querySelector('.number');
let trials = document.querySelector('.trials');
const warning = document.querySelector('.warning');
const msg = document.querySelector('.message');
const body = document.querySelector('body');
let score = document.querySelector(".label-highscore");
let awards = document.querySelector(".awards");
let audio = document.querySelectorAll("audio");
let random;
let clearTimer;
let highScore =[];
let entries = ["1","2","3","4","5","6","7","8","9","0"];
// all Event Listeners
check.addEventListener("click",handleCheck);
reset.addEventListener("click",resetAll);
guess.addEventListener("click",()=>{Sound(3)});
window.addEventListener("keydown",(event)=>{
    Sound(3);
    event.key=="Enter"? handleCheck():"";
    event.key=='Escape'? resetAll():"";
})
window.addEventListener("keydown",(event)=>{
    if(entries.includes(event.key)){
        guess.value = event.key
    }
})
// 
// function to check when the check button has been pressed.
function handleCheck(){
    randomNum()
    Sound(2);
    if(check.disabled){}
    else if (guess.value == null || guess.value < 1 || guess.value > 5 || guess.value == ""){
        invaild()
        handleTrials()
    }
    else if(guess.value == random){
        handleTrials();
        youWin();
        
    }
    else{
            incorrect();
            handleTrials();
        }
}
// function to genarate random number from 1-5
function randomNum(){
    random = Math.floor(Math.random()*5)+1;
}

//  function to run when the guess is correct 
function youWin(){
    display.innerHTML = "Correct!!!";
    number.innerHTML = random;
    body.classList.remove("fail")
    body.classList.remove("body")
    body.classList.add("correct")
    check.setAttribute("disabled", "true")
        guess.setAttribute("disabled", "true")
        msg.innerHTML = "Play again!!"
    highScore.push(5-trials.innerHTML)
    handleHighScore(highScore)
    handleAwards("you win");
    Sound(0)
}
// function when an invaild guess has been entered
function invaild(){
    warning.style.display = "block";
        setTimeout(()=> warning.style.display = "none", 3000);
        guess.value = "";
}

// function that handles number of trial..... the hightest number of trial is 5...
function handleTrials(){
    trials.innerHTML --
    if(trials.innerHTML == 0 && guess.value != random){
        display.innerHTML = "Game Over!!!";
        body.classList.add("fail")
        body.classList.remove("correct")
        body.classList.remove("body")
        setTimeout(()=>{
            body.classList.remove("fail")
            body.classList.add("body")
        },1000)
        clearTimer =setInterval(()=>{
            body.classList.remove("body")
            body.classList.add("fail")
            setTimeout(()=>{
                body.classList.remove("fail")
                body.classList.add("body")
            },1000)
        },2000)
        number.innerHTML = random;
        check.setAttribute("disabled", "true")
        guess.setAttribute("disabled", "true")
        msg.innerHTML = "Play again!!"
        handleAwards("you lose")
        Sound(1)
    }
    trials.innerHTML < 0? trials.innerHTML = 0 :""
}
//  function that runs when the entered guess isnt correct
function incorrect(){
    body.classList.remove("body")
    body.classList.remove("correct")
    body.classList.add("fail")
    display.innerHTML = "Opps you're wrong!"
    msg.innerHTML = "Continue playing"
    guess.value = "";
}

// fumnction that reset the game back to default 
function resetAll(){
    guess.value = "";
    number.innerHTML = "?";
    trials.innerHTML=5;
    display.innerHTML= "Guess My Number!"
    msg.innerHTML= "Start guessing..."
    body.classList.remove("fail")
    body.classList.remove("correct")
    body.classList.add("body")
    clearInterval(clearTimer);
    check.removeAttribute("disabled")
    guess.removeAttribute("disabled")
    warning.style.display = "none"
    handleAwards("")
    Sound(4)
}

// function that handles the high score so that the highest score is always displayed
function handleHighScore(high){
    let max = Math.min(...high)
    max != Infinity ? score.innerHTML = `Highscore:${max} Trials`:max=0
}
// funnction that show you award when you win or lose
function handleAwards(text){
    text = text.toUpperCase();
    awards.innerHTML = text;
    setInterval(()=>{
        awards.style.fontSize = "800%"
    },2000);
    setInterval(()=>{
        awards.style.fontSize = "600%"
    },3000);
}
// function that plays the sound
function Sound(e){
    audio[e].play()
}








































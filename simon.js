// take a array to track the game and user sequence

let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false; // initialy started is false
let level=0;
let highScore = 0;


let h2=document.querySelector("h2");
//here applly the event lister which check the whether any key is pressed or not to start the game
// this is applyed on the document


document.addEventListener("keypress",function(){
    // console.log("game started");  // here every time when the key is pressed agine need not to the game started becuase 
    // there are many key will pressed so do this

    if(started==false){
        console.log("game started");
        started=true;

        levelUp(); // call the level when game started
    }

    // step-1 completed

    
});

// step-2 when the random down preesed then the falsh and level-1


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);  // here when the btn is pressed then the color become white for a sec and again come back to original

}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);  // here when the btn is pressed then the color become white for a sec and again come back to original

}

function levelUp(){
    userSeq=[];  // when we enter to new level then the user need to enter it again from the beggining
    level++;
    h2.innerText=`level ${level}`;   // change when the level changes


    // random btn choose

    let randIdx=Math.floor(Math.random()*4);
    let randCol=btns[randIdx];
    let randbtn=document.querySelector(`.${randCol}`);
    
    // console.log(randIdx);
    // console.log(randCol);
    // console.log(randbtn);

    gameSeq.push(randCol);
    console.log(gameSeq);
    gameFlash(randbtn); // to do the reapated work for both user and app.js 

}

// step-3 to add the event listner


// check the user and game sequence
function checkAns(idx){
    // console.log("curr level: ",level);
    // let idx=level-1;
    
    if(userSeq[idx]===gameSeq[idx]){
        // console.log("smae value");
        // two things when user in middle don't do the level up just check
        // when user reach to same sequence as the game then level then make the changes in the level

        if(userSeq.length==gameSeq.length){

            setTimeout(levelUp,1000);  // here the level changes
        }
    }
    else {

    // Update high score
    if (level > highScore) {
        highScore = level;
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b>
    <br>Highest Score: <b>${highScore}</b>
    <br>Press any key to start`;

    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
    }, 150);  // for again restarting

    reset();
}
}

function btnPress(){
    // console.log(this);
    let btn=this;
    userFlash(btn);   // this is added becuase when user press the btn then also the flash occures
    userCol=btn.getAttribute("id");
    userSeq.push(userCol);
    // console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}
let gameseq=[];
let userseq=[];

let color=["red","yellow","green","purple"];

let highscore=0;

let level=0;
let start=false;

let h2=document.querySelector("h2");
let body=document.querySelector("body");
let hs=document.querySelector("#hs");

document.addEventListener("keypress",function(){
    if(start==false){
        console.log("--------------------   GAME STARTED   ------------------");
        start=true;
        levelup();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randomidx=Math.floor(Math.random()*4);
    let randomcolor=color[randomidx];
    let btn=document.querySelector(`#${randomcolor}`);
    btnflash(btn);
    gameseq.push(randomcolor);
    console.log(gameseq);
}


function userbtnpress(){
    let btn=this;
    let btncolor=btn.attributes[2].nodeValue;
    btnflash(btn);
    // console.log(btncolor);
    userseq.push(btncolor);
    checkseq(userseq.length-1);
} 

function checkseq(idx) {
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    }else{
        h2.innerHTML=`Game Over!! Your Score : <b>${level}</b><br>Press any key to Start`;
        gameover();
        resetgame();
    }
}

let btns=document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click",userbtnpress);
}

function gameover(){
    // console.dir(body);
    body.classList.add("gameover");
    setTimeout(function(){
        body.classList.remove("gameover");
    },200);
}

function resetgame(){
    highscore=(highscore<level)?level:highscore;
    userseq=[];
    gameseq=[];
    level=0;
    start=false;
    hs.innerText=`High Score : ${highscore}`;
}
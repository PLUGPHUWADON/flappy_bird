let main = document.getElementById("main");
let boxgame = document.querySelector(".boxgame");
let bird = document.querySelector(".bird");
let score = document.querySelector(".score");
let highscore = document.querySelector(".highscore");
let inputimg = document.getElementById("inputimg");

let speedpoletop = [];
let speedpolebottom = [];
let cscore = 0;
let chighscore = 0;
let birdy = 0;
let dropbird = 2;
let poletop;
let polebottom;

//create pole top and pole bottom
let createpolestep = setInterval(() => {
    let createpoletop = document.createElement("div");
    createpoletop.className = "poletop";
    createpoletop.classList.add("addpoletop");
    createpoletop.style.height = `${Math.floor(Math.random() * 120) + 50}px`;
    speedpoletop.push(850);
    createpoletop.style.left = `${speedpoletop[speedpoletop.length - 1]}px`;
    boxgame.appendChild(createpoletop);
    poletop = document.querySelectorAll(".poletop");

    let createpolebottom = document.createElement("div");
    createpolebottom.className = "polebottom";
    createpolebottom.classList.add("addpolebottom");
    createpolebottom.style.height = `${Math.floor(Math.random() * 120) + 50}px`;
    speedpolebottom.push(850);
    createpolebottom.style.left = `${speedpolebottom[speedpolebottom.length - 1]}px`;
    boxgame.appendChild(createpolebottom);
    polebottom = document.querySelectorAll(".polebottom");
},2500);

//move pole top and pole bottom
let movepoletop = setInterval(() => {
    poletop = document.querySelectorAll(".poletop");
    for (let i = 0 ; i < poletop.length ; i++) {
        speedpoletop[i] -= 1;
        poletop[i].style.left = `${speedpoletop[i]}px`;
    }

    polebottom = document.querySelectorAll(".polebottom");
    for (let i = 0 ; i < polebottom.length ; i++) {
        speedpolebottom[i] -= 1;
        polebottom[i].style.left = `${speedpolebottom[i]}px`;
    }

    for (let i = 0 ; i < poletop.length ; i++) {
        let position_boxgame = boxgame.getBoundingClientRect();
        let position_bird = bird.getBoundingClientRect();
        let position_poletop = poletop[i].getBoundingClientRect();
        let position_polebottom = polebottom[i].getBoundingClientRect();

        //del pole and count score
        if (position_poletop.right < position_boxgame.left) {
            cscore += 1;
            score.innerHTML = `SCORE : ${cscore}`;
            boxgame.removeChild(poletop[i]);
            boxgame.removeChild(polebottom[i]);
            speedpoletop.splice(0,1);
            speedpolebottom.splice(0,1);
            poletop = document.querySelectorAll(".poletop");
            polebottom = document.querySelectorAll(".polebottom");

            if (cscore > chighscore) {
                chighscore += 1;
                highscore.innerHTML = `HIGHSCORE : ${chighscore}`;
            }
        }

        //check bird crash pole
        if (position_bird.top < position_poletop.bottom &&
            position_bird.bottom > position_poletop.top &&
            position_bird.left < position_poletop.right &&
            position_bird.right > position_poletop.left ||
            position_bird.top < position_polebottom.bottom &&
            position_bird.bottom > position_polebottom.top &&
            position_bird.left < position_polebottom.right &&
            position_bird.right > position_polebottom.left) {
                cscore = 0;
                score.innerHTML = `SCORE : ${cscore}`;
        }
    }

    if (window.innerWidth <= 800) {
        boxgame.style.width = `${window.innerWidth}px`;
    }

    let checkborder = boxgame.getBoundingClientRect();
    let checkbird = bird.getBoundingClientRect();
    
    if (checkbird.bottom > checkborder.bottom) {
        dropbird = -20;
    }
    if (checkbird.bottom < checkborder.bottom) {
        dropbird = 2;
    }
},10);

//click bird
let movebird = setInterval(() => {
    birdy += dropbird;
    bird.style.transform = `translateY(${birdy}px)`;
},10);
main.addEventListener("click",() => {
    birdy -= 100;
});

//input file img
inputimg.addEventListener("change",(event) => {
    let flieimg = event.target.files[0];
    let url = URL.createObjectURL(flieimg);
    let img = document.querySelector(".bird").children[0];
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.src = url;
});
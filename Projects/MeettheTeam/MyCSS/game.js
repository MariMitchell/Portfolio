console.log("hello");

//Get canvas
const canvas = document.getElementById("snakeGame");
//sets context of game to 2d
const ctx = canvas.getContext("2d");

//Changes lenght of snake when collides with apple
class grow{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}


let speed = 7;

//Sets number of tiles across and down
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

//Sets snake head to middle of screen
let headX = 10
let headY = 10;

const grows = [];
let tailLength = 2;

//Sets velocity that allows user to move snake
let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

//score
let score = 0;

//game loop that updates screen and calls the function xtimes per second
function game() {
    changePosition();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();
    checkCollision();
    apple();
    snake();
    drawScore();
    setTimeout(game, 1000/speed);
}

//Game Over Checks
function isGameOver(){
    let gameOver = false;

    //Makes certain game has started before checking against the body
    if (yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    if(headX < 0){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true;
    }
    else if(headY < 0 ){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }

    //body check
    for(let i = 0; i < grows.length; i++){
        let part = grows[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver){
        ctx.fillStyle = "red";
        ctx.font = "50px Verdanda";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

//Keeps track of score
function drawScore(){
    ctx.fillStyle = "black";
    ctx.font = "10px";
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

//clears the screen
function clearScreen(){
    ctx.fillStyle = "white";
    //fills rectangle with the above color starting at the x and y points indicated to the width of the canvas
    ctx.fillRect(0,0, canvas.width, canvas.height); 
}

//defines the snake
function snake(){

    ctx.fillStyle = "black";
    for(let i = 0; i < grows.length; i++){
        let part = grows[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    grows.push(new grow(headX, headY));
    if(grows.length > tailLength){
        grows.shift();
    }
    
    ctx.fillStyle = "#66105E";
    //draws snake in the middle of screen and sets width and height to tileSize
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

//Changes the snakes position
function changePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function apple(){
    ctx.fillStyle = "#033270";
    //positions apple and sets width and height to tile size
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        //addds onto tail length if hit
        tailLength++;
        score++;
    }
}

//Adds an event listener that knows when the arrow keys are pressed
document.body.addEventListener("keydown", keyDown);

//Moves snake according to the arrow keys pressed
function keyDown(event){
    
    //left
    if(event.keyCode == 37){
        //Doesnt allow right movement if moving left
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //up
    if(event.keyCode == 38){
        //Doesnt allow downwards movement if moving up
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //right
    if(event.keyCode == 39){
        //Doesnt allow left movement if moving right
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
    //down
    if(event.keyCode == 40){
        //Doesnt allow upwards movement if moving down
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
}

game();
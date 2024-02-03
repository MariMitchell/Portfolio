//Function that changes Html element when a button is clicked
let backgroundChange = document.querySelector("#elementChange");

backgroundChange.addEventListener("click", () =>{
    document.body.style.backgroundImage = "url('images/background.jpg')";
});

//Function that changes css property when button is clicked
let btn2 = document.querySelector("#cssChange");

btn2.addEventListener("click", ()=>{
    document.getElementById("cssChange").style.backgroundColor = "red";
    
})
let textButton = document.querySelector("#textEntry");
let userInput = document.querySelector("#textBox");

function myFunction() {
    var x = "Your name is " + document.getElementById("textBox").value;
    document.getElementById("output").innerHTML = x;
  }
  

var finalNum;

// Button that changes the css of the title to black, and back
let titleButton = document.querySelector("#titleButton");
titleButton.addEventListener("click", ()=>{
    if(document.getElementById("blackTitle").style.backgroundColor== "black") {
        document.getElementById("blackTitle").style.backgroundColor= "#305f72";
    } else {
        document.getElementById("blackTitle").style.backgroundColor= "black";
    }
    
    
})

function randomFunction() 
{
    var maxNum = document.getElementById("maxBox").value;
    var minNum = document.getElementById("minBox").value;

    //inserts range into random number function
    finalNum = getRandomIntInclusive(minNum,maxNum)
    console.log(finalNum)
        
    //displays random number
    document.getElementById("numOutput").innerHTML = finalNum;
}

//makes random number from ranges given above
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }


function createBalloons(){

    document.getElementById("balloonId").innerHTML = "";

    for(i = 0; i < finalNum; i++)
    {
        
        // let divElement = document.createElement('div')

        // // create text node
        // let divElementText = document.createTextNode('BALLOON')

        // // append text node to div
        // divElement.appendChild(divElementText)

        // let balloons = document.querySelector('#balloonId')

        // // append div element to document
        // balloons.appendChild(divElement)

        var img = document.createElement('img');
        img.src = "images/balloon.png";
        document.getElementById('balloonId').appendChild(img);
    

    }
}



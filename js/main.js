let cards = document.querySelectorAll(".card"),
    wrongTries = document.querySelector(".liveResult .wrongTry span"),
    playerName = document.querySelector(".liveResult .name span"),
    matchedAudio = document.querySelector("audio.matchedCardAudio"),
    NotMatchedAudio = document.querySelector("audio.NotMatchedCardAudio");

let start = document.querySelector(".overlay .start");
let overlay = document.querySelector(".overlay");

let winingOverlay = document.querySelector(".win");
let rePlay = document.querySelector(".win .playAgain")

let wrongAnswer = 0, rightAnswer = 0, flipCounter = 0;
let firstElement;

if(rightAnswer != 8){
    winingOverlay.hidden = true;
}

// give a rodom order 
cards.forEach((el) => {
    el.style.order = `${Math.floor(Math.random() * 16)}`;
})


// checker
function checker(event){
    
    if(Array.from(event.classList).includes("card")){
        
        if(flipCounter == 0){

            event.classList.add("rotate");
            firstElement = event;
            firstElement.style.pointerEvents = "none";
            flipCounter = 1;

        }else if(flipCounter == 1){
            event.classList.add("rotate");

            if(!(firstElement.dataset.type == event.dataset.type && event != firstElement)){
                setTimeout(() => {
                    event.classList.remove("rotate");
                    NotMatchedAudio.play();
                    
                },500 )

                updateWrongAnswer();
            }else {
                event.firstElementChild.style.color = "green";
                firstElement.firstElementChild.style.color = "green";
                rightAnswer += 1;
                flipCounter = 0;

                event.style.pointerEvents = "none";
                
               
                setTimeout(()=>{
                    matchedAudio.play();
                    event.classList.remove("rotate");
                    firstElement.classList.remove("rotate");
                }, 500)
            }

        }
        
    }

    if(rightAnswer == 8){
        winingOverlay.hidden = false;
        document.querySelector(".win h3 span").textContent = playerName.textContent;
        document.querySelector("audio.win").play();
        rePlay.addEventListener("click", function(){
            location.reload();
        })
    }
}

// update wrong answer
function updateWrongAnswer(){
    wrongAnswer++;
    wrongTries.textContent = wrongAnswer;
}

// flip cards


cards.forEach(el => {
    el.addEventListener("click", function(event){
        checker(this);
    })
})




start.onclick = function(){
    let fullName = prompt("Your Name");

    if(fullName){
        playerName.textContent = fullName;
        overlay.style.display = "none";

        memories()
    }
}


// 

function memories(){
    setTimeout(() => {
        cards.forEach(ele => {
            ele.classList.add("rotate");
            ele.style.pointerEvents = "none"
        })
    
        setTimeout(()=> {
            cards.forEach(ele => {
                ele.classList.remove("rotate");
                ele.style.pointerEvents = "auto"
            })
        }, 6000)
    }, 1000)
}

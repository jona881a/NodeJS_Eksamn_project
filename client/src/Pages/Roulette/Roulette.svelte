<script>
import { onMount } from "svelte";

let keyEmojie = "🔑";
let lockEmojie = "🔒";
let rouletteArray = [lockEmojie, lockEmojie, lockEmojie, lockEmojie, keyEmojie];
let buildRoulette = false;
let playing = false;

let gameHasStopped = false;
let youHaveWon = null;

onMount(async () =>{
    rouletteArray.sort((a, b) => 0.5 - Math.random());
    buildRoulette = true;
})

let rouletteDivFocus = "rouletteDivFocus1";

function changeField1(){
    rouletteDivFocus = "rouletteDivFocus1";
}
function changeField2(){
    rouletteDivFocus = "rouletteDivFocus2";
}
function changeField3(){
    rouletteDivFocus = "rouletteDivFocus3";
}
function changeField4(){
    rouletteDivFocus = "rouletteDivFocus4";
}
function changeField5(){
    rouletteDivFocus = "rouletteDivFocus5";
}


let playingTheWheel;
let iterationNumber = 1;
function spinTheRoulette(){
     playingTheWheel = setInterval(function(){
       playing = true;
       console.log(iterationNumber);
        if(iterationNumber == 1){
            changeField1();
        }else if(iterationNumber == 2){
            changeField2();
        }else if(iterationNumber == 3){
            changeField3();
        }else if(iterationNumber == 4){
            changeField4();
        }else if(iterationNumber >= 5){
            changeField5();
            iterationNumber = 0;
        }
        iterationNumber++;
    }, 50)
}
let stoppingTheWheel;
let stopCount = 0;
let currentField = ""
function stopTheRoulette(){
   
    clearInterval(playingTheWheel);
    stoppingTheWheel = setInterval(function(){
        if(stopCount < 5){
    
       playing = true;
       if(iterationNumber == 1){
            changeField1();
            stopCount++;
            currentField = rouletteArray[iterationNumber-1];
        }else if(iterationNumber == 2){
            changeField2();
            stopCount++;
            currentField = rouletteArray[iterationNumber-1];
        }else if(iterationNumber == 3){
            changeField3();
            stopCount++;
            currentField = rouletteArray[iterationNumber-1];
        }else if(iterationNumber == 4){
            changeField4();
            stopCount++;
            currentField = rouletteArray[iterationNumber-1];
        }else if(iterationNumber >= 5){
            changeField5();
            stopCount++;
            currentField = rouletteArray[iterationNumber-1];
            iterationNumber = 0;
        }
        iterationNumber++;
    }else if(stopCount >= 5){
        clearInterval(stoppingTheWheel);
        console.log("wheel has stopped!")
        gameHasStopped = true;
        if(currentField === keyEmojie){
            console.log(currentField, "YOU WIN");
            youHaveWon = true;
        }else if(currentField != keyEmojie){
            console.log(currentField, "YOU LOSE");
            youHaveWon = false;
            document.getElementById(rouletteDivFocus).style.backgroundColor = "red";

        }
    }

    }, 1000)
}



</script>




{#if buildRoulette === true}

<div id="playButtonDiv">
    {#if playing === false}
    <button id="playButton" on:click={spinTheRoulette}>Play the Roulette!</button>
    {:else}
    <button id="stopButton" on:click={stopTheRoulette}>Stop the Roulette!</button>
    {/if}   
</div>

<div id="rouletteContent">
{#each rouletteArray as rouletteField}
<div class="rouletteDiv">
    <p id="itemfield">{rouletteField}</p>
</div>
{/each}
<div id={rouletteDivFocus}></div>
</div>

    {#if gameHasStopped === true}
        {#if youHaveWon === true}
        <div id="winningDiv">
            <h1 class="rewardText">You Win!</h1>
            <h1 class="rewardEmojie">{keyEmojie}</h1>
        </div>
        {:else if youHaveWon === false}
        <div id="losingDiv">
            <h1 class="rewardText">You Lose!</h1>
            <h1 class="rewardEmojie">{lockEmojie}</h1>
        </div>
        {/if}
    {/if}
{/if}


<style>

#playButtonDiv{
    margin: 100px auto;
    width: max-content;
}

#playButton{
    background-color: black;
    color: white;
    width: 300px;
    height: 50px;
    font-family: fantasy;
    letter-spacing: 3px;
    border-radius: 30px;
}
#playButton:hover{
    background-color: rgb(0, 207, 35);
    color: white;
    width: 300px;
    height: 50px;
}

#stopButton{
    background-color: black;
    color: white;
    width: 300px;
    height: 50px;
    font-family: fantasy;
    letter-spacing: 3px;
    border-radius: 30px;
}
#stopButton:hover{
    background-color: red;
    color: white;
    width: 300px;
    height: 50px;
    font-family: fantasy;
    letter-spacing: 3px;
    border-radius: 30px;
}



#rouletteContent{
    background-color: black;
    border-radius: 40px;
    width: 1200px;
    height: 240px;
    margin: 20px auto;
}
.rouletteDiv{
    width: 200px;
    height: 200px;
    float: left;
    margin: 20px;
    background-color: white;
    border-radius: 60px;
}

#itemfield{
    font-size: 60px;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    transform: translate(130%, 0);
}

#rouletteDivFocus1,
#rouletteDivFocus2,
#rouletteDivFocus3,
#rouletteDivFocus4,
#rouletteDivFocus5{
background-color: greenyellow;
width: 200px;
height: 200px;
border-radius: 60px;
opacity: 40%;
}
#rouletteDivFocus1{
    transform: translate(20px,20px);
}
#rouletteDivFocus2{
    transform: translate(260px,20px);
}
#rouletteDivFocus3{
    transform: translate(500px,20px);
}
#rouletteDivFocus4{
    transform: translate(740px,20px);
}
#rouletteDivFocus5{
    transform: translate(980px,20px);
}

#winningDiv, #losingDiv{
    width: 400px;
    height: 400px;
    margin: 20px auto;
    border-radius: 60px;
    background-color: white;
}
#winningDiv{
    border: 10px solid greenyellow;
}
#losingDiv{
    border: 10px solid red;
}

.rewardText{
    font-size: 60px;
    text-align: center;
}

.rewardEmojie{
    font-size: 100px;
    text-align: center;
}

</style>
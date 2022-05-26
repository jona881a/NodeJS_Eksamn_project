<script>
import { onMount } from "svelte";



let keyEmojie = "🔑";
let lockEmojie = "🔒";
let rouletteArray = [lockEmojie, lockEmojie, lockEmojie, lockEmojie, lockEmojie, lockEmojie, lockEmojie, lockEmojie, lockEmojie, keyEmojie];
let buildRoulette = false;

onMount(async () =>{
    rouletteArray.sort((a, b) => 0.5 - Math.random());
    buildRoulette = true;
})


function spinTheRoulette(){

}
</script>




{#if buildRoulette === true}
<div id="playButtonDiv">
    <button id="playButton" on:click={spinTheRoulette}>Play the Roulette!</button>
</div>
<div id="rouletteContent">
{#each rouletteArray as rouletteField}
<div id="rouletteDiv">
    <p id="itemfield">{rouletteField}</p>
</div>
{/each}
</div>
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

#rouletteContent{
    background-color: black;
    border-radius: 40px;
    width: 1200px;
    height: 480px;
    margin: 20px auto;
}
#rouletteDiv{
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

</style>
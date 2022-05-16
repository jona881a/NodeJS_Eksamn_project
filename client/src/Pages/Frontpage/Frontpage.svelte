<script>
import Carousel from "svelte-carousel";
import { onMount } from 'svelte';
let caro = false;
    
    let coverArray = [];
    async function loadData(){
        const response = await fetch("http://localhost:3000/store/covergames");
        const data = response.json();
        data.then(data => {
            if(data.errorMessage) {
                console.error(data.errorMessage);
            } else {
                coverArray = data.data;
                console.log(coverArray)
               caro=true;
            }
        })
    }
    
</script>


{#if caro===false}
<button on:click={loadData}>START</button>
{:else}
<div class="game-imagecarousel">
    <Carousel autoplay
    autoplayDuration={3000}
    >
    {#each coverArray as image}
    <img id="coverImage" src={image.cover_image} alt="coverImage">
    {/each}
    </Carousel>
</div>
{/if}

<style>

#coverImage{
    width: 900px;
    height: 450px;
    max-width: 900px;
    max-height: 450px;
}


   

</style>
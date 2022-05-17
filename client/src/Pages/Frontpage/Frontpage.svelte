<script>
import Carousel from "svelte-carousel";
import { onMount } from 'svelte';
let carouselIsReady = false;
    
    let coverArray = [];
    onMount(async () => {
        const response = await fetch("http://localhost:3000/store/covergames");
        const data = response.json();
        data.then(data => {
            if(data.errorMessage) {
                console.error(data.errorMessage);
            } else {
                coverArray = data.data;
                console.log(coverArray)
                carouselIsReady = true;
            }
        })
    })
    
</script>



{#if carouselIsReady}
<div id="carouselDiv">
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

#carouselDiv, #coverImage{
    width: 900px;
    height: 400px;
    margin: 50px auto;
}


   

</style>
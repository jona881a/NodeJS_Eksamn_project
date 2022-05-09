<script>
    import { selectedGame } from '../../stores/stores.js'
    import Carousel from 'svelte-carousel'

</script>

<div class="container">


    <div class="game-image-carousel">
        <Carousel autoplay
        autoplayDuration={5000}
        >
        {#each $selectedGame.carousel_images as image}
          <img src="{image}" alt="screenshots">
        {/each}
        </Carousel>
    </div>
    <div class="game-body">
        <div>
            <div class="game-container-description">
                <div class="game-description">
                    <p>Hello</p>
                </div>
            </div>
            <div class="game-container-reviews">
                <div class="game-reviews">
                    <p>Hello</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .container {
        width: 900px;
        height: 1100px;
        margin: 0 auto;
    }
    .game-image-carousel {
        width: 898px;
        max-width: 898px;
        height: 300px;
        max-height: 300px;
        
        border-width: 1px;
        border-style: solid;
        border-color: black;
    }
    .game-container-description {
        width: 598px;
        border: 1px;
        border-width: 1px;
        border-style: solid;
        border-color: black;
        float: left;
        
    }
    .game-description {
        padding-left: 7px;
        padding-right: 7px;
    }
    .game-container-reviews {
        width: 298px;
        border-width: 1px;
        border-style: solid;
        border-color: black;
        float: right;
    }
    .game-reviews {
        padding-left: 7px;
        padding-right: 7px;
    }
</style>
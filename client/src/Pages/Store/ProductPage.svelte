<script>
    import { selectedGame } from '../../stores/stores.js'
    import Carousel from 'svelte-carousel'
</script>

<div class="container">
    <div class="game-imagecarousel">
        <Carousel autoplay
        autoplayDuration={4000}
        pauseOnFocus
        >
        {#each $selectedGame.carousel_images as image}
          <img src="{image}" alt="carousel_images" class="game-imagecarousel-image">
        {/each}
        </Carousel>
    </div>
    <div class="game-container">
        <div>
            <div class="game-container-description">
                <div class="game-description">
                    <span>Hello</span>
                </div>
            </div>
            <div class="game-container-reviews">
                <!--
                        {forEach array.reviews as review}
                        <div class="game-reviews">
                            <img src="" alt="profilePic" ></img>
                        </div>
                        {/each}
                    -->
                    <div class="game-reviews">
                        <div class="game-reviews-user">
                            <div class="game-reviews-user-pfp">
                                <img src="pics/thumb.png" alt="profilePic" width="5px" height="5px" />
                            </div>
                            <div class="game-reviews-user-name">
                                <span>TrollUser1</span>
                            </div>
                        </div>
                        <div class="game-reviews-body">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
                        </div>
                    </div>
                    <div class="game-reviews">
                        <div class="game-reviews-user">
                            <div class="game-reviews-user-pfp">
                                <img src="pics/thumb.png" alt="profilePic" width="5px" height="5px" />
                            </div>
                            <div class="game-reviews-user-name">
                                <span>TrollUser2</span>
                            </div>
                        </div>
                        <div class="game-reviews-body">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
                        </div>
                    </div>
                    <div class="game-reviews">
                        <div class="game-reviews-user">
                            <div class="game-reviews-user-pfp">
                                <img src="pics/thumb.png" alt="profilePic" width="5px" height="5px" />
                            </div>
                            <div class="game-reviews-user-name">
                                <span>TrollUser1</span>
                            </div>
                        </div>
                        
                        <div class="game-reviews-body">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
                        </div>
                    </div>
                    <div class="game-reviews">
                        <div class="game-reviews-user">
                            <div class="game-reviews-user-pfp">
                                <img src="pics/thumb.png" alt="profilePic" width="5px" height="5px" />
                            </div>
                            <div class="game-reviews-user-name">
                                <span>TrollUser1</span>
                            </div>
                        </div>
                        <div class="game-reviews-body">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
                        </div>
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
    .game-imagecarousel {
        width: 900px;
        height: 400px;
        max-width: 900px;
        max-height: 400px;
        overflow: hidden;
        margin-top: 15px;
    }
    .game-imagecarousel-image {
        max-width: 900px;
        max-height: 400px;
        overflow: hidden;
    }
    .game-container {
        margin-top: 15px;
    }
    .game-container-description {
        width: 598px;
        height: 400px;

        border: 1px;
        border-width: 1px;
        border-style: solid;
        border-color: black;
        border-right: 0px;
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
        height: 400px;
        max-height: 400px;
        overflow-y: scroll;
    }
    .game-reviews {
        padding-left: 7px;
        padding-right: 7px;
        width: auto;
        overflow-x: hidden;
        overflow-y: auto;
        border-width: 1px;
        border-color: black;
        border-style: solid;
        border-top: 0px;
        border-left: 0px;
    }
    .game-reviews-user {
        height: 40px;
        display: flex;
        margin-top: 7px;
    }
    .game-reviews-user span{
        display: inline-block;
    }
    .game-reviews-user-pfp {
        height: 40px;
        width: 40px;
        display: inline-block;
    }
    .game-reviews-user-name {
        height: 40px;
        width: 200px;
        
        justify-content: center;
        align-items: center;
    }
    .game-reviews-body {
        margin-bottom: 10px;
    }

</style>
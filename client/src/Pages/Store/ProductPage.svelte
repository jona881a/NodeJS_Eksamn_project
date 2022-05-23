<script>
    import { selectedGame } from '../../stores/stores.js';
    import { onMount } from 'svelte';
    import Carousel from 'svelte-carousel';
    import ReviewModal from '../../Components/Modals/Modal.svelte';

    let gameReviews = [];
    const url = "http://localhost:3000/reviews";
    const reviewsString = { game_id : $selectedGame.id };

    let isOpen = false;
    let dataLoaded = false;
    let review;
    let game;

    onMount( async () => {
        
        const gamesResponse = await fetch(`http://localhost:3000/store/getallgames/${$selectedGame.id}`);
        const data = gamesResponse.json();
        data.then(data =>  {
            if(data.errorMessage) {
                console.error(data.errorMessage);
            } else {
                game = data.data;
                dataLoaded = true;
            }
        })
        .catch(error => console.error(error));
    
        const gameReivewResponse = await fetch(url,{
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewsString)}).json();
        
        gameReivewResponse
        .then(response => response.json())
        .then(data => { 
            gameReviews = data.reviews.reverse();
        })
        .catch(error => console.error(error));
    });
    function openModal() {
        if(!isOpen) {
            isOpen = true;
        } else {
            isOpen = false;
        }
    }
    function closeModal(event) {
        isOpen = event.detail.isOpen;
    }
    function updateArray(event) {
        review = event.detail.review;
        if(review) {
            gameReviews.reverse();
            gameReviews.push(review);
            gameReviews.reverse();
            gameReviews = gameReviews;
        }
        isOpen = false;
    }

</script>
{#if dataLoaded}
<div class="container">
    <div class="game-imagecarousel">
        <Carousel autoplay
        autoplayDuration={4000}
        pauseOnFocus
        >
        {#each game.carousel_images as image}
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
            <div class="game-container-reviews-topbar">
                <button on:click="{openModal}">Write a review</button>
                {#if isOpen}
                    <ReviewModal on:close-modal="{closeModal}" on:saved-review="{updateArray}"/>
                {/if}
            </div>
            <div class="game-container-reviews">
                {#each gameReviews as review}
                <div class="game-reviews">
                    <div class="game-reviews-user">
                        <div class="game-reviews-user-pfp">
                            {#if review.profile_pic}
                            <img src="{review.profile_pic}" alt="profilePic" class="game-reviews-user-pfp-image"/>
                            {:else}
                            <img src="http://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png" alt="profilePic" class="game-reviews-user-pfp-image"/>
                            {/if}
                        </div>
                        <div class="game-reviews-user-name">
                            <span>{review.username}</span>
                        </div>
                    </div>
                    <div class="game-reviews-body">
                        <span>{review.review_content}</span>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>
</div>
{/if}
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
        height: 360px;
        border-width: 1px;
        border-style: solid;
        border-color: black;
        float: right;
        max-height: 360px;
        overflow-y: scroll;
        background-color: darkgray;
    }
    .game-container-reviews-topbar {
        width: 298px;
        height: 40px;
        border-width: 1px;
        border-style: solid;
        border-color: black;
        float: right;
        border-bottom: 0px;
        background-color: darkgray;
    }
    .game-reviews {
        width: auto;
        overflow-x: hidden;
        overflow-y: auto;
        border-width: 1px;
        border-color: black;
        border-style: solid;
        margin: 5px;
        border-radius: 10px ;
        background-color: lightgray;
    }
    .game-reviews-user {
        height: 40px;
        display: flex;
        margin: 7px;
        border-width: 1px;
        border-color: black;
        border-style: solid;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
    }
    .game-reviews-user span{
        display: inline-block;
    }
    .game-reviews-user-pfp {
        height: 40px;
        width: 40px;
        display: inline-block;
    }
    .game-reviews-user-pfp-image {
        height: 100%;
        width: 100%;
    }
    .game-reviews-user-name {
        height: 40px;
        width: 200px;
        
        justify-content: center;
        align-items: center;
    }
    .game-reviews-body {
        margin: 7px;
    }

</style>
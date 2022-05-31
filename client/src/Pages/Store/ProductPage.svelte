<script>
    import { selectedGame } from '../../stores/stores.js';
    import { onMount } from 'svelte';
    import Carousel from 'svelte-carousel';
    import { toasts } from 'svelte-toasts';
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
    
        const gameReviewResponse = await fetch(url,{
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewsString)
        });
        const dataJson = gameReviewResponse.json();
        dataJson.then(data => { 
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
        arrows={false}

        >
        {#if game.carousel_images === null} 
             <div class="game-imagecarousel empty">
                <img src={$selectedGame.cover_image} alt="cover_image" class="game-imagecarousel-image">
            </div>
        {:else}
            {#each game.carousel_images as image}
            <img src="{image}" alt="carousel_images" class="game-imagecarousel-image">
            {/each}
        {/if}
        </Carousel>
        <div class="game-info">
            <h1>{game.title}</h1>
        </div>
    </div>
    <div class="game-container">
        <div class="game-container-description">
            <div class="game-description">
                {#if game.description !== null}
                    <span>{game.description}</span>
                {:else}
                    <span>No description on this game</span>
                {/if}
            </div>
        </div>
        <div class="game-container-reviews">
            <button on:click="{openModal}">Write a review</button>
            {#if isOpen}
                <ReviewModal on:close-modal="{closeModal}" on:saved-review="{updateArray}"/>
            {/if}
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
{/if}
<style>
    .container {
        width: 100%;
        margin: 0 auto;
    }
    .game-imagecarousel {
        height: 600px;
        max-height: 600px;
        overflow: hidden;
    }
    .game-imagecarousel-image {
        max-height: 600px;
        overflow: hidden;
    }
    .game-info {
        position: absolute;
        width: 100%;
        bottom: 20px;
        color: #fff;
        background-color: #16181a;
        opacity: 70%;
        padding-left: 20px;
    }
    .game-container {
        display: flex;
        background-color: #212529;
        color: #fff;
    }
    .game-container-description {
        width: 70%;
        height: fit-content;
        line-height: 1.5;
        padding: 20px;
    }
    .game-description {
        background-color: #212529;
        width: 60%;
        margin: 0 auto;
    }
    .game-container-reviews {
        width: 30%;
        max-height: 360px;
        margin-right: 20px;
        overflow-y: scroll;
    }
    button {
        margin-top: 10px;
        border-radius: 20px;
        padding: 10px 15px;
    }
    button:hover {
        cursor: pointer;
        background-color: #16181a;
        color: #fff;
    }
    .game-reviews {
        overflow-x: hidden;
        overflow-y: auto;
        margin: 5px;
        border-radius: 10px ;
        background-color: #fff;
        color: #333;
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
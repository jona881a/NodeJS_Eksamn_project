<script>
    import { createEventDispatcher } from 'svelte'
    import { session, selectedGame } from '../../stores/stores';
    import { toasts } from 'svelte-toasts'

    const dispatch = createEventDispatcher();

    let reviewContent;
    let review;

    function handleCloseModal() {
        dispatch('close-modal', {isOpen:false});
    }

    function handleSavedReview() {
        dispatch('saved-review', {review});
    }

    async function handleSubmit() {
        const url = "http://localhost:3000/createReview";
        const reviewContents = {
            username: $session.user.username,
            game_id: $selectedGame.id,
            profile_pic: $session.user.profile_pic,
            user_id: $session.user.id,
            review_content: reviewContent
        };
        await fetch(url, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewContents)})
            .then(response => response.json())
            .then(data => { 
            if(data.message) {
                toasts.error('Error','An error occurred, review was not saved');
            } else {
                review = data.review
                toasts.success('Success', 'Your review was added!');
                handleSavedReview();
            }
        })
        .catch(error => console.log(error));
    }
</script>

<div class="modal">
    <div class="modal-content">
        <span>Write a review!</span><br>
        <input type="text" bind:value="{reviewContent}" placeholder="Text goes here"><br>
        <button class="button" on:click="{handleSubmit}" type="submit">Submit comment</button>
        <button class="button" on:click="{handleCloseModal}">Cancel</button>
    </div>
</div>

<style>
    .modal {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
    }

    .button {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .button:hover,
    .button:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
</style>
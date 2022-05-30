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
        if (!$session) {
            toasts.warning("Review not added", "Please log in before writing a comment")
            return
        }

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
        <div class="modal-header">
            <h2>Write a review!</h2>
        </div>
        <div class="modal-body">
            <textarea type="text" cols="86" rows="8" bind:value="{reviewContent}" placeholder="Text goes here"/><br>
        </div>
        <div class="modal-footer">
            <button class="button" on:click="{handleCloseModal}">Cancel</button>
            <button class="button" on:click="{handleSubmit}" type="submit">Submit comment</button>
        </div>
    </div>
</div>

<style>
.modal {
    position: fixed; /* Stay in place */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    width: 50%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    animation-name: animatetop;
    animation-duration: 0.4s;
    border-radius: 20px;
    overflow: hidden;
}

/* Add Animation */
@keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
}

.modal-header {
    margin-left: 6;
    padding: 2px 2px;
    background-color: darkgray;
    color: white;
}

/* Modal Body */
.modal-body {
    padding: 2px 16px;
    height: 200px;
}

.modal-body textarea {
    size: 175px;
}

/* Modal Footer */
.modal-footer {
    padding: 2px 16px;
    height: 74px;
    background-color: darkgray;
}

.button {
    color: lightgray;
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
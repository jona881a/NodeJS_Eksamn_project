<script>
  import { onDestroy, onMount } from "svelte";
  import { session } from "../../stores/stores";

  export let socket;
  export let user;

  let userResponse;
  $: messageLog = user.messages;

  function handleSubmitMessage() {
    messageLog.push({response: userResponse, isUserResponse: true});
    messageLog = [...messageLog];
    socket.emit("send-reply", {message: userResponse, username: user.username});
    userResponse = null;
  }
  
  function onKeyPress(e) {
    if(e.charCode === 13) {
      handleSubmitMessage();
      userResponse = null; 
    }
  }
  </script>

    <div class="chat">
      <h2>{user.username}</h2>
      <div class="chat-messages">
        {#each messageLog as message}
          {#if message.isUserResponse}
            <div class="messagebubble-userresponse">
              <p class="response">{message.response}</p>
            </div>
          {:else}
            <div class="messagebubble-response">
              <p class="user-response">{message.response}</p>
            </div>
          {/if}
        {/each}
    </div>
      <div class="chat-reply">
        <input class="chat-messagebox" type="text" placeholder="type..." bind:value={userResponse} on:keypress={onKeyPress}/>
        <button class="send-button" on:click={handleSubmitMessage} ><i class="fas fa-paper-plane"></i> Send</button>
      </div>
    </div>
  
  <style>
    .chat {
      height: 100%;
    }

    h2 {
      margin-left: 10px;
    }
    
    .chat-messages {
      overflow: auto;
      height: 80%;
    }
    .messagebubble-userresponse {
      display: flex;
      justify-content: flex-end;
    }

    .messagebubble-response {
      display: flex;
      justify-content: flex-start;
    }

    p {
      display: block;
      border-radius: 20px;
      padding: 10px 15px;
      margin: 10px 10px;
      width: fit-content;
      max-width: 75%;
    }
  
    .response {
      background-color: #228be6;
    }
  
    .user-response {
      float: right;
      background-color: #f1f3f5;
    }
  
    .chat-reply {
      display: flex;
    }
  
    .chat-messagebox {
      height: 20%;
      width: 70%;
      margin-left: 20px;
      border-radius: 15px;
    }
  
    .send-button {
      margin-left: 10px;
      border-radius: 20px;
  
    }
  </style>
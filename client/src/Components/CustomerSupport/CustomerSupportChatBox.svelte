<script>

import io from "socket.io-client";
import { onMount} from "svelte";
import { session } from "../../stores/stores";
import {Router, Link} from "svelte-navigator";

const socket = io("http://localhost:3000");

let userResponse;
let messageLog = [];

onMount( async () => {
  if($session) socket.emit("open-chat", {username: $session.user.username});
});

socket.on("chat-started", ({message}) => {
  messageLog.push({response: message, isUserResponse: false});
  messageLog = [...messageLog];
});

socket.on("reply",({message}) => {
  messageLog.push({response: message, isUserResponse: false});
  messageLog = [...messageLog];
});

function handleSubmitMessage() {
  messageLog.push({response: userResponse, isUserResponse: true});
  messageLog = [...messageLog];
  socket.emit("send-message", {message: userResponse, username: $session.user.username});
  userResponse = null;
}

function onKeyPress(e) {
  if(e.charCode === 13) {
    handleSubmitMessage();
    userResponse = null; 
  }
}

</script>
  <div class="opened-chat">
    {#if $session !== null}
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
    {:else}
      <div class="no-user">
        <p>Sorry, but you have to be logged in in order to use the support chat</p>
        <button>
          <Router>
            <Link to="/profile">Login</Link>
          </Router>
        </button>
      </div>
    {/if}
  </div>

<style>
  .opened-chat {
    display: flex;
    flex-direction: column;
    width: 60vh;
    height: 75vh;
    z-index: 1;
    bottom: 10%;
    right: 5%;
    position: fixed;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
  }
  .chat-reply {
    position: relative;
  }
  .chat-messages {
    min-height: 40%;
    height: 90%;
    overflow: auto;
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
    border-radius: 20px;
    padding: 10px 15px;
    margin: 10px 10px;
    width: fit-content;
    max-width: 75%;
  }
  .response {
    background-color: #f1f3f5;
  }
  .user-response {
    background-color: #228be6;
  }
  .chat-reply {
    display: flex;
  }
  .chat-messagebox {
    width: 70%;
    margin-left: 20px;
    border-radius: 15px;
    align-self: center;
  }
  .send-button {
    margin-left: 10px;
    margin-right: 20px;
    border-radius: 20px;
    align-self: center;
  }
  .no-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    text-align: center;
  }
  .no-user p {
    font-size: 18px;
    font-weight: 300;
  }
  .no-user button {
    border-radius: 20px;
    background-color: #212529;
    color: #ffffff;
    padding: 10px 15px;
  }
</style>
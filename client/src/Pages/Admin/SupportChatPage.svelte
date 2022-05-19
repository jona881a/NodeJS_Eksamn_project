<script>
  import io from "socket.io-client";
  import { onDestroy } from "svelte";
  import SupportChatMessageBox from "../../Components/CustomerSupport/SupportChatMessageBox.svelte";
  import SupportChatMessageWindow from "../../Components/CustomerSupport/SupportChatMessageWindow.svelte";

  const socket = io("http://localhost:3000");

  let usersNeedingSupport = [];
  let selectedUser;
  
  socket.on("message-recieved", ({message, username}) => {
    const foundUserIndex = usersNeedingSupport.findIndex(user => user.username === username);
    if(foundUserIndex !== -1) {
      usersNeedingSupport[foundUserIndex].messages.push({response: message, isUserResponse: false});
    } else {
      usersNeedingSupport.push({username, messages: [{response: message, isUserResponse: false}]});
      usersNeedingSupport = usersNeedingSupport;
    }
  });

  function handleMessageDispatchEvent(event) {
    selectedUser = event.detail.user;
  }

  onDestroy(() => {
    //Der skal indikeres til chats at der er sket et disconnect
  });

</script>
  <div class="container">
    <div class="row">
      <div class="support-chat-message-overview">
        {#if usersNeedingSupport.length === 0}
          <div class="default-message">
            <h1>No Users in need of support at the moment</h1>
          </div>
        {:else}
          {#each usersNeedingSupport as userNeedingSupport}
            <SupportChatMessageBox userNeedingSupport={userNeedingSupport} on:open-chatwindow={handleMessageDispatchEvent}/>
          {/each}
        {/if}
      </div>
      <div class="support-chat-message-window">
        {#if selectedUser}  
          <SupportChatMessageWindow user={selectedUser} socket={socket}/>
        {/if}
      </div>
    </div>
  </div>
<style> 
  .container {
    width: 1200px;
    margin: 0 auto;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    height: 80vh;
  }

  .row {
    display: flex;
    margin-top: 20px;
    border-radius: 20px;
    overflow: hidden;
    height: 80vh;
  }

  .support-chat-message-overview {
    background-color: #ffffff;
    width: 40%;
    border-right: 2px solid #f1f3f5;
  }

  .default-message {
    width: 1200px;
    text-align: center;
    z-index: 1;
    position: fixed;
    margin: 0 auto;

  }

  h1 {
    font-weight: 500;
    color: #868e96;
  }

  .support-chat-message-window {
    background-color: #ffffff;
    width: 60%;
  }
</style>
<script>
  import CustomerSupportChatBox from "./CustomerSupportChatBox.svelte";

  let chatOpened = false;

  function handleOnChatOpened() {
    if(chatOpened) {
      chatOpened = false;
    } else {
      chatOpened = true;
    }
  }

  function handleCloseChat(event) {
    chatOpened = !event.detail.close;
  }

</script>
  <div class="closed-chat" on:click={handleOnChatOpened}>
    <i class="fas fa-headset fa-2xl"></i>
  </div>

  {#if chatOpened}
    <CustomerSupportChatBox on:close-chatwindow={handleCloseChat}/>
  {/if}

<style>
  .closed-chat {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    top: 90%;
    bottom: 10px;
    right: 3%;
    z-index: 1;
    position: fixed;
    border-radius: 100%;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
    background-color: #212529;
    color: white;
    cursor: pointer;
  }
</style>
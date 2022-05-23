<script>
  import { createEventDispatcher } from 'svelte';
  
  export let userNeedingSupport;

	const dispatch = createEventDispatcher();

  function handleOpenChatWindow() {
    dispatch('open-chatwindow', {
      user: userNeedingSupport
    });
  }

</script>
    <div class="userbox" on:click={handleOpenChatWindow}>
      <p class="username">{userNeedingSupport.username}</p>
      <p class="preview-text">{userNeedingSupport.messages.at(-1).response}</p>
    </div>
<style>
  .userbox {
    height: fit-content;
    margin-left: 20px;
    cursor: pointer;
  }

  .username {
    font-size: 18px;
    font-weight: 500;
  }
  
  .preview-text {
    color: #868e96;
    text-overflow: ellipsis;
  }
</style>
<script>

</script>
  <div class="opened-chat">
    <div class="chat-messages">
      <p>Hello, How may i help you?</p>
    </div>
    <div class="chat-reply">
      <input class="chat-messagebox" type="text" placeholder="type..."/>
      <button class="send-button"><i class="fas fa-paper-plane"></i> Send</button>
    </div>
  </div>

<style>
.opened-chat {
    width: 300px;
    height: 300px;
    z-index: 1;
    bottom: 10%;
    right: 5%;
    position: fixed;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
  }

  .chat-messages {
    height: 80%;
  }

  .chat-messagebox {
    height: 20%;
    margin-left: 20px;
    border-radius: 15px;
  }

  .send-button {
    border-radius: 15px;
  }
</style>
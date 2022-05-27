<script>
  import { session } from "../../stores/stores.js";
  import { toasts } from "svelte-toasts"; 
  export let orderItem;
  export let cartId;

  async function handleRevealCode(order_item) {
    if($session) {
      const response = await fetch(`http://localhost:3000/gamekey/getgamekey/${cartId}/${$session.user.username}`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({gameTitle: order_item.title})
      }); 
      const data = response.json();
      data.then(data => {
        order_item.gameKey = data.key.gamekey;
        console.log(order_item);
        orderItem.order_items = orderItem.order_items;
      })
      .catch(error => {
        console.error(error);
        toasts.error("Error occured", "Something went wron when retrieving your key, please contact support");
      }); 
    } else {
      toasts.error("Access denied","You are not logged in, log in to reveal key");
    }
  }

</script>
  <div class="order-item">
    {#each orderItem.order_items as order_item}
    <div class="item-card">
      <div class="item-body">
      <!-- svelte-ignore a11y-missing-attribute -->
      <img class="item-img" src={order_item.cover_image} width="100px" height=100px>
        <div class="item-info">
          <p>{order_item.title}</p>
          <p>{order_item.price} DKK</p> 
        </div>
      </div>
      {#if !order_item.gameKey}
        <button class="btn" on:click={() => handleRevealCode(order_item)}>Reveal code</button>
      {:else}
        <p class="game-key">{order_item.gameKey}</p>
      {/if}
    </div>
    {/each}
  </div>
<style>
  .order-item {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .item-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item-body {
    display: flex;
    align-items: center;
  }
  .item-img {
    border-radius: 20px;
    overflow: hidden;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  p {
    display: block;
    font-size: 20px;
  }
  button {
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 20px;
    width: fit-content;
  }
  .btn {
    background-color: #212529;
    color: #f8f9fa;
  }
  .btn:hover {
    background-color: #ffff;
    color: #212529;
  }
  .game-key {
    
  }
</style>
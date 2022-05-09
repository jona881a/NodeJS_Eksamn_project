<script>
  import { selectedGame } from "../../stores/stores.js";
    export let product;

    function handleBuyGame() {
      
    }

    function handleOpenDetailView() {
      selectedGame.set(product);
      console.log($selectedGame);
    }

</script>

<div class="card" on:click={handleOpenDetailView}>
  <div class="card-img">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={product.images[0]} width="200" height="200"/>
  </div>
  <div class="card-body">
    <div class="game-title">
      <span>{product.title}</span>
    </div>
    <div class="game-genre">
      <span>{product.genre}</span>
    </div>
    <div class="card-footer">
      <span class="game-price">DKK {product.price}</span>
      <button class="card-purchase-btn" on:click={handleBuyGame}>
        Buy 
        <i class="fa-solid fa-basket-shopping"></i>
      </button>
    </div>
  </div>
</div>

<style>
  .card {
    display: flex;
    margin: 20px;
    width: 300px;
    cursor: pointer;
  }

  .card-img {
    height: 200px;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
  }

  .game-title {
    font-size: 28px;
    overflow: hidden;
    text-overflow: clip;
  }

  .game-price {
    display: inline-block;
    font-size: 18px;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
  }

  .card-purchase-btn {
    padding: 10px 15px;
    background-color: #212529;
    color: #f8f9fa;
    width: 100px;
  }

</style>
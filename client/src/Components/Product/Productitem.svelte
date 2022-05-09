<script>
  import { selectedGame } from "../../stores/stores.js";
    export let product;

    function handleBuyGame() {
      selectedGame.set(product);
      console.log($selectedGame);
    }

</script>

<div class="card">
  <div class="card-img">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={product.img1} width="200" height="200"/>
  </div>
  <div class="card-body">
    <div class="game-title">
      <p>{product.title}</p>
    </div>
    <div class="game-genre">
      <p>{product.genre}</p>
    </div>
    <button class="card-purchase-btn" on:click={handleBuyGame}>
      Buy 
      <i class="fa-solid fa-basket-shopping"></i>
    </button>
  </div>
</div>

<style>
  .card-purchase-btn {
    padding: 10px 15px;
    background-color: #212529;
    color: #f8f9fa;
    width: 100px;
  }

</style>
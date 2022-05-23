<script>
  import { selectedGame } from "../../stores/stores.js";
  import { cartContents, itemsInCart, totalPrice } from "../../stores/cartStore.js";
  import { useNavigate } from "svelte-navigator";
  import { onMount } from "svelte";
  export let product;
  export let disabled;
  let disabledclass = "";

  const navigate = useNavigate();

  onMount(() => {
    if(disabled) {
      disabledclass = "disabled";
    }
  }); 

  function handleBuyGame() {
    itemsInCart.update(items => items + 1);
    totalPrice.update(price => price += product.price);
    if($cartContents !== null) {
      cartContents.update(contents => [...contents, product]);
    } else {
      cartContents.update(contents => [contents, product]);
    }
  }
    
  function handleOpenDetailView() {
      selectedGame.set(product);
      navigate("/product", { replace: true });
  }

</script>

<div class=" card" on:click={handleOpenDetailView}>
  <div class="card-img">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={product.cover_image} width="200" height="200"/>
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
      {#if !disabled}
        <button class="card-purchase-btn" on:click|stopPropagation={handleBuyGame}>
          Buy 
          <i class="fa-solid fa-basket-shopping"></i>
        </button>
      {/if}
    </div>
  </div>
</div>

<style>

  .card {
    display: flex;
    margin: 20px;
    width: fit-content;
    max-width: 500px;
    cursor: pointer;
  }

  .card:hover {
    background-color: #e9ecef;
    border-radius: 20px;
    overflow: hidden;
  }

  img {
    border-radius: 20px;
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
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: #212529;
    color: #f8f9fa;
    width: 100px;
  }

  .card-purchase-btn:hover {
    background-color: #ffff;
    color: #212529;
  }

</style>
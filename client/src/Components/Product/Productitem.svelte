<script>
    export let product;

</script>

<div class="card">
  <div class="card-img">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={product.img1} width="300" height="500"/>
  </div>
  <div class="card-body">
    <div class="game-title">
      <p>{product.title}</p>
    </div>
    <div class="game-genre">
      <p>{product.genre}</p>
    </div>
    <button class="card-purchase-btn">
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
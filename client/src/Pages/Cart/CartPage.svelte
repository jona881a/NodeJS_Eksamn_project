<script>
  import {itemsInCart, cartContents, totalPrice} from "../../stores/cartStore.js";
  import { session } from "../../stores/stores.js";
  import Productitem from "../../Components/Product/Productitem.svelte";
  import { toasts } from "svelte-toasts"; 
  
  async function handleCheckout() {
    if($session) {
      console.log($session.user);
      const response = await fetch(`http://localhost:3000/cart/checkout/${$session.user.id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: {orderItems: $cartContents, totalPrice: $totalPrice}
      });
      const data = response.json(); 
    } else {
      toasts.error("You are not logged in","to purchase your games, please log in");
    }
  }

  function handleClearCart() {
    cartContents.set([]);
    itemsInCart.set(0);
    totalPrice.set(0);
  }

</script>
  <div class="container">
    {#if $itemsInCart === 0}
      <div class="no-cart-content">
        <h1>There is no products in your cart yet...</h1>
        <h2><a href="/store">Click here</a> to browse amazing games</h2>
        <div class="images">

        </div>
      </div>
    {:else}
      <div class="cart-content">
        {#each $cartContents as cartItem}
          {#if cartItem !== null}
            <div class="cart-item">
              <Productitem product={cartItem} disabled={true}/>
            </div>
          {/if}
        {/each}
        <div class="cart-footer">
          <h2 class="total">Total: {$totalPrice.toFixed(2)} </h2>
          <button class="checkout-button" on:click={handleCheckout}> Checkout <i class="fa-solid fa-basket-shopping"></i></button>
          <button class="clear-button" on:click={handleClearCart}>Clear <i class="fa-solid fa-x"></i></button>
        </div>
      </div>
    {/if}
  </div>
<style>
  .container {
    width: 80vw;
    margin: 20px auto;
  }
  .no-cart-content {
    text-align: center;
  }
  h1 {
    font-size: 56px;
    font-weight: 500;
  }

  h2 {
    font-weight: 400;
    margin: 0;
  }

  a {
    color: #333;
  }
  .cart-content {
    background-color: #ffff;
    border-radius: 20px;
    padding-top: 5px;
  }
  .cart-item {
    border-bottom: 1px solid #212529;
  }
  .cart-footer {
    display: flex;
    margin-top: 20px;
    align-items: center;
  }

  .total {
    padding: 10px 15px;
  }

  button {
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 20px;
    width: fit-content;
  }
 
  .checkout-button {
    background-color: #212529;
    color: #f8f9fa;
  }

  .checkout-button:hover {
    background-color: #ffff;
    color: #212529;
  }

  .clear-button {
    color: #fff;
    background-color: #f03e3e;
  }

  .clear-button:hover {
    background-color: #c92a2a;
  }

</style>
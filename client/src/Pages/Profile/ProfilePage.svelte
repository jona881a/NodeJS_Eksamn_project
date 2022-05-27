<script>
  import { onMount } from "svelte";
  import { session } from "../../stores/stores.js";
  import OrderItem from "../../Components/Product/OrderItem.svelte";
  import Select from "svelte-select";
  import { toasts } from "svelte-toasts"; 

  let orderArray;
  let searchString;

  onMount( async () => {
    if($session) {
      const response = await fetch(`http://localhost:3000/cart/getorders/${$session.user.id}`);
      const data = response.json();
      data.then(result => {
        orderArray = result.data;
      })
      .catch(error => toasts.error(error));
    }
  });

  async function handleSignOut() {
    const response = await fetch("http://localhost:3000/auth/signout");
    const data = response.json();
    data.then(result => {
      session.set(null);
      toasts.success(result.message);
    })
    .catch(error => console.error(error));
  }

</script>
<div class="container">
  <div class="row">
    <div class="col">
      <div class="profile">
        <h1>Hello {$session.user.username}!</h1>
        <div class="profile-body">
          <!-- svelte-ignore a11y-missing-attribute -->
          <img src={$session.user.profile_pic} class="profile-pic">
          <input>
        </div>
        <div class="profile-footer">
          <button on:click={handleSignOut} class="btn">Sign out</button><br>
          <a href="/changepassword" style="color: black;">Change password</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="order-history">
        {#if orderArray}
        <div class="order-history-header">
          <h1>Order History</h1>
          <input class="searchbar" bind:value={searchString} placeholder="search..." />
          <!--<Select/>-->
        </div>
          {#each orderArray as order}
          <div class="order">
            <div class="order-header">
              <h2>Order #{order.id}</h2>
              <span>Total order price: <strong>{order.total_price} DKK</strong></span>
            </div>
            <OrderItem orderItem={order} cartId={order.id}/>
          </div>
          {/each}
        {:else}
          <h1>No orders yet</h1>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .container{
    width: 90vw;
    height: 80vh;
    margin: 20px auto 20px auto;
    border-radius: 20px;
    background-color: #fff;
    overflow: auto;
  }
  .row {
    display: flex;
  }
  .col {
    width: 50%;
  }
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
  }
  .profile-body{
    display: flex;
    flex-direction: column;
  }
  .profile-pic {
    border-radius: 100%;
    height: 200px;
    width: 200px;
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

  .order-history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .searchbar {
    border-radius: 20px;
    margin: 0;
  }

  .order-history {
    display: flex;
    flex-direction: column; 
    margin-right: 20px;
  }

  .order {
    display: flex;
    flex-direction: column;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #212529;
  }
  
  h1 {
    text-align: center;
  }
  span {
    font-size: 22px;
    font-weight: 300;
  }

  @media screen and (max-width: 768px) {
    .row {
      flex-direction: column;
    }
    .col {
      width: 100%;
    }
    .order-history {
      margin: 0 20px 0 20px
    }
  }
</style>
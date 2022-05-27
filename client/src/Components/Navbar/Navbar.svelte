<script>
  import {Router, Link, Route } from "svelte-navigator";
  import AboutPage from "../../Pages/About/AboutPage.svelte";
  import FrontPage from "../../Pages/FrontPage/Frontpage.svelte";
  import LoginPage from "../../Pages/Authentication/LoginPage.svelte";
  import PrivateRoute from "../PrivateRouteGuard/PrivateRoute.svelte";
  import ProfilePage from "../../Pages/Profile/ProfilePage.svelte";
  import { session } from "../../stores/stores.js";
  import { itemsInCart } from "../../stores/cartStore.js";
  import SignupPage from "../../Pages/Authentication/SignupPage.svelte";
  import ForgotPage from "../../Pages/Authentication/ForgotPage.svelte";
  import AddProductsPage from "../../Pages/Admin/AddProductsPage.svelte";
  import Cart from "../../Pages/Cart/CartPage.svelte";
  import ChangePasswordPage from "../../Pages/Authentication/ChangePasswordPage.svelte";
  import Contactpage from "../../Pages/Contactpage/Contactpage.svelte";
  import ProductPage from "../../Pages/Store/ProductPage.svelte";
  import StorePage from "../../Pages/Store/StorePage.svelte";
  import SupportChatPage from "../../Pages/Admin/SupportChatPage.svelte";
  import { Dropdown } from "carbon-components-svelte";
  import Roulette from "../../Pages/Roulette/Roulette.svelte";
import { component_subscribe } from "svelte/internal";

  let adminSessionClass = "";

  $: if($session) {
    if($session.admin === true) {
      adminSessionClass = "admin-session";
    }
  }

  $: innerWidth = window.innerWidth;
</script>

<svelte:window 
	bind:innerWidth
  />

<Router primary={false}>
  
  <header>
    <h1>
      <a href="/" class="siteTitle">Digi-KeyStore</a>
    </h1>
      <nav class={adminSessionClass}>
        {#if innerWidth > 768}
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {#if $session}
            {#if $session.admin === true}
              <Link class="supportchat" to="/supportchat">Supportchat</Link>
              <Link class="addproducts" to="/addproducts">Add Products</Link>
            {/if}
            {#if $session.admin !== true}
            <div class="profile-container">
              <img src="{$session.user.profile_pic}" alt="a" class="profile-avatar"/>
              <Link class="profile" to="/profile">{$session.user.username}</Link>
            </div>
            {/if}
          {:else}
            <Link class="profile" to="/profile">Login</Link>
          {/if}
            <Link class="cart" to="/cart"><i class="fa-solid fa-basket-shopping"></i> <span class="cart-items">({$itemsInCart})</span></Link>
        {:else}
          <Link class="cart" to="/cart"><i class="fa-solid fa-basket-shopping"></i> <span class="cart-items">({$itemsInCart})</span></Link>
          <div class="dropdown">
            <button class="dropbtn"><i class="fa-solid fa-bars"></i></button>
            <div class="dropdown-content">
              <Link to="/">Home</Link>
              <Link to="/store">Store</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              {#if $session}
                {#if $session.admin !== true}
                <div class="profile-container">
                  <img src="{$session.user.profile_pic}" alt="a" class="profile-avatar"/>
                  <Link class="user-profile" to="/profile">{$session.user.username}</Link>
                </div>
                {:else}
                  <Link class="profile" to="/profile">Login</Link>
                {/if}
                {#if $session}
                  {#if $session.admin === true}
                    <Link class="supportchat" to="/supportchat">Supportchat</Link>
                    <Link class="addproducts" to="/addproducts">Add Products</Link>
                  {/if}
                {/if}
              {:else}
                <Link class="profile" to="/profile">Login</Link>
              {/if}
            </div>
          </div>
        {/if}
      </nav>
  </header>
  <div>
    <Route path="/" component={FrontPage}/>
    <Route path="store" component={StorePage} />
    <Route path="about" component={AboutPage}/>
    <Route path="product" component={ProductPage}/>
    <Route path="contact" component={Contactpage}/>
    <Route path="cart" component={Cart}><Cart/></Route>
    <Route path="login" component={LoginPage}/>
    <Route path="signup" component={SignupPage}/>
    <Route path="forgot" component={ForgotPage}/>
    <Route path="changepassword" component={ChangePasswordPage}/>
    <PrivateRoute path="addproducts" let:location>
      <AddProductsPage/>
    </PrivateRoute>
    <PrivateRoute path="profile" let:location>
      <ProfilePage/>
    </PrivateRoute>
    <PrivateRoute path="supportchat" let:location>
      <SupportChatPage/>
    </PrivateRoute>
    <Route path="roulette" component={Roulette}/>
  </div>
</Router>

<style>
  .admin-session {
    grid-template-columns: 1fr 1fr 1fr 4fr 1fr 1fr 1fr;
  }

  header {
    display: flex;
    background-color: #212529;
  }

  h1 {
    padding-left: 10px;
    display: inline-block;
    width: 350px;
  }
  .siteTitle,
  .siteTitle:hover,
  .siteTitle:visited,
  .siteTitle:active {
    text-decoration: none;
    color: #f8f9fa;
    margin-right: 20px;
  }
  nav {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 8fr 1fr 1fr;
    align-self: center;
    font-size: 18px;
    padding-right: 10px;
    width: 100%;
  }
  @media screen and (max-width: 1430px) {
    .admin-session,
    nav {
      grid-template-columns: 1fr 1fr 1fr 2fr 1fr 1fr;
    }
  }
  @media screen and (max-width: 1170px) {
    .admin-session,
    nav {
      grid-template-columns: 0.5fr 0.5fr 0.5fr 1fr 2fr 1fr 0.5fr;
      justify-content: center;
      gap: 20px;
    }
    :global(.supportchat),
    :global(.addproducts) {
      justify-self: end;
    }
    :global(.addproducts) {
      text-align: center;
      margin-right: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    .admin-session,
    nav {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    h1 {
      width: 400px;
    }

  }

  :global(.profile) {
    justify-self: end;
  }

  :global(.cart) {
    margin-right: 10px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    justify-content: center;
  }
  
  .cart-items {
    color: #868e96;
  }

  .profile-container {
    display: flex;
    align-items: center;
    vertical-align: middle;
    justify-content: flex-end;
  }

  .profile-avatar {
    height: 30px;
    width: 30px;
    border-radius: 100%;
  }

  .dropbtn {
    background-color: #212529;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    margin-top: 10px;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown-content :global(a) {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

.dropdown-content :global(a:hover) {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #f1f1f1;
  color: #333;
}

</style>
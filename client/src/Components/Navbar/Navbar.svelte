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

  let adminSessionClass = "";
  let innerWidth = window.innerWidth;

  $: if($session) {
    if($session.admin === true) {
      adminSessionClass = "admin-session";
    }
  }

  $: console.log(innerWidth);
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
        {#if innerWidth !== "768"}
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
              <Link class="profile" to="/profile">{$session.user.username}</Link>
            {/if}
          {:else}
            <Link class="profile" to="/profile">Login</Link>
          {/if}
            <Link class="cart" to="/cart"><i class="fa-solid fa-basket-shopping"></i> <span class="cart-items">({$itemsInCart})</span></Link>
        {:else}
          <Dropdown class="dropdown"/>
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
    <PrivateRoute path="roulette" let:location>
      <Roulette/>
    </PrivateRoute>
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
      grid-template-columns: 1fr 1fr 1fr 2fr 1fr 1fr 1fr;
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
    :global(.dropdown) {
      float: right;
    }
  }

  :global(.profile) {
    justify-self: end;
  }

  :global(.cart) {
    justify-self: end;
    margin-right: 10px;
  }
  
  .cart-items {
    color: #868e96;
  }

</style>
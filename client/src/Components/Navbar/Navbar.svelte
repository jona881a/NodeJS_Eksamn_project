<script>
  import {Router, Link, Route } from "svelte-navigator";
  import About from "../../Pages/About/About.svelte";
  import FrontPage from "../../Pages/FrontPage/Frontpage.svelte";
  import Login from "../../Pages/Authentication/Login.svelte";
  import PrivateRoute from "../PrivateRouteGuard/PrivateRouteGuard.svelte";
  import Profile from "../../Pages/Profile/Profile.svelte";
  import { session } from "../../stores/stores.js";
  import { itemsInCart } from "../../stores/cartStore.js";
  import Signup from "../../Pages/Authentication/Signup.svelte";
  import Forgot from "../../Pages/Authentication/Forgot.svelte";
  //import Cart from "../Cart/Cart.svelte";
  import ChangePassword from "../../Pages/Authentication/ChangePassword.svelte";
  import Frontpage from "../../Pages/FrontPage/Frontpage.svelte";

</script>

<Router>
  <header>
    <h1>
      <a href="/" class="siteTitle">Digi-keystore</a>
    </h1>
    
    <nav>
      <Link to="/">Home</Link>
      <Link to="/store">Store</Link>
      <Link to="/about">About</Link>
      <Link to="/cart"><i class="fa-solid fa-basket-shopping"></i> <span class="cart-items">({$itemsInCart})</span></Link>
      {#if $session}
        <Link to="/profile">Profile</Link>
      {:else}
      <Link to="/profile">Login</Link>
      {/if}
    </nav>
  </header>
  <div>
    <Route path="/" component={Frontpage}><FrontPage/></Route>
    <Route path="about" component={About}><About/></Route>
    <!--<Route path="cart" component={Cart}><Cart/></Route>-->
    <Route path="login" component={Login}><Login /></Route>
    <Route path="signup" component={Signup}><Signup /></Route>
    <Route path="forgot" component={Forgot}><Forgot/></Route>
    <Route path="changepassword" component={ChangePassword}><ChangePassword/></Route>
  </div>
  <PrivateRoute path="profile" let:location>
    <Profile />
  </PrivateRoute>
</Router>

<style>
  header {
    display: flex;
  
    background-color: #212529;
    width: 100%;
  }

  h1 {
    padding-left: 10px;
    display: inline-block;
  }
  .siteTitle,
  .siteTitle:hover,
  .siteTitle:visited,
  .siteTitle:active {
    text-decoration: none;
    color: #f8f9fa;
  }

  nav {
    align-self: center;
    font-size: 18px;
    padding-right: 10px;
  }

  .cart-items {
    color: #868e96;
  }

</style>
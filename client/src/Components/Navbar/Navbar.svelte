<script>
  import {Router, Link, Route } from "svelte-navigator";
  import AboutPage from "../../Pages/About/AboutPage.svelte";
  import FrontPage from "../../Pages/FrontPage/Frontpage.svelte";
  import LoginPage from "../../Pages/Authentication/LoginPage.svelte";
  import PrivateRoute from "../PrivateRouteGuard/PrivateRouteGuard.svelte";
  import ProfilePage from "../../Pages/Profile/ProfilePage.svelte";
  import { session } from "../../stores/stores.js";
  import { itemsInCart } from "../../stores/cartStore.js";
  import SignupPage from "../../Pages/Authentication/SignupPage.svelte";
  import ForgotPage from "../../Pages/Authentication/ForgotPage.svelte";
  //import Cart from "../Cart/Cart.svelte";
  import ChangePasswordPage from "../../Pages/Authentication/ChangePasswordPage.svelte";
  import Frontpage from "../../Pages/FrontPage/Frontpage.svelte";
  import Contactpage from "../../Pages/Contactpage/Contactpage.svelte";

</script>

<Router>
  <header>
    <h1>
      <a href="/" class="siteTitle">Digi-KeyStore</a>
    </h1>
    
    <nav>
      <Link to="/">Home</Link>
      <Link to="/store">Store</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/cart"><i class="fa-solid fa-basket-shopping"></i> <span class="cart-items">({$itemsInCart})</span></Link>
      {#if $session}
        <Link to="/profile">Profile</Link>
      {:else}
      <Link to="/profile">Login</Link>
      {/if}
    </nav>
  </header>
  <div>
    <Route path="/" component={FrontPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="contact" component={Contactpage}/>
    <!--<Route path="cart" component={Cart}><Cart/></Route>-->
    <Route path="login" component={LoginPage}/>
    <Route path="signup" component={SignupPage}/>
    <Route path="forgot" component={ForgotPage}/>
    <Route path="changepassword" component={ChangePasswordPage}/>
  </div>
  <PrivateRoute path="profile" component={ProfilePage} let:location/>
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
    margin-right: 20px;
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
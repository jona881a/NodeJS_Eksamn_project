<script>
  import { useNavigate} from "svelte-navigator";
  import { toasts } from "svelte-toasts";
  import { session } from "../../stores/stores.js";
  import {Router, Link} from "svelte-navigator";
  
  const navigate = useNavigate();
  
  let username;
  let password;
  
  async function handleSubmit() {
    const url = "http://localhost:3000/auth/login";
    const userCredentials = {username: username, password: password};
    
    await fetch(url, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials)})
      .then(response => response.json())
      .then(data => { 
        if(data.message) {
          toasts.warning('Failed to log in', 'Please check that username and password is correct')
        } else {
          $session = data.session;
          toasts.success('Successfully logged in', 'Welcome back ' + $session.user.username)
          navigate("/profile", { replace: true });
        }
      })
      .catch(error => console.log(error));
  }

  function onKeyPress(e) {
    if(e.charCode === 13) {
      handleSubmit();
    }
  }
</script>

  <div id="loginDiv" on:keypress={onKeyPress}>
    <h3 id="loginPageHeadline">Login</h3>
    <input class="login" bind:value={username} name="username" type="text" placeholder="Username"><br/>
    <input class="password" bind:value={password} name="password" type="password" placeholder="Password"><br/>
    <Router>
    <button id="loginButton" on:click={handleSubmit}>Login</button><br>
      <Link id="forgot" to="/forgot">Forgot Password?</Link>
      <br/>
      <Link id="signup" to="/signup">Don't have an Account? Click here</Link>
      <br/>
    </Router>
  </div>
  
  <style>
    #loginDiv{
      width: 500px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }

    #loginPageHeadline{
      font-size: 44px;
      font-weight: 500;
      text-align: center;
    }

    .login, .password, #loginButton{
      width: 90%;
      padding: 10px;
      border-radius: 20px;
      align-self: center;
    }
    #loginButton {
      cursor: pointer;
      padding: 10px 15px;
      border-radius: 20px;
      background-color: #212529;
      color: #f8f9fa;
      width: 90%;
    }
    #loginButton:hover {
      background-color: #ffff;
      color: #212529;
    }

    :global(#signup) {
      color: black;
      margin-left: 25px;
    }

    :global(#forgot) {
     color: black;
     margin-left: 25px;
    }

  </style>
<script>
  import { useNavigate} from "svelte-navigator";
  import { session } from "../../stores/stores.js";
  
  const navigate = useNavigate();
  
  let displayErrorBox = 'error-display-none';
  let errorMessage = "";
  
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
          errorMessage = data.message;
          displayErrorBox = 'errorBox-display';
        } else {
          $session = data.session;
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
    <div class={displayErrorBox}>{errorMessage}</div>
    <input class="login" bind:value={username} name="username" type="text" placeholder="Username"><br/>
    <input class="password" bind:value={password} name="password" type="password" placeholder="Password"><br/>
    <a href="/forgot">Forgot Password?</a><br/>
    <button id="loginButton" on:click={handleSubmit}>Login</button><br>
    <a href="/signup">Don't have an Account? Click here</a>
  </div>

  
  <style>

    #loginDiv{
      width: 500px;
      margin: 50px auto;
    }

    #loginPageHeadline{
      font-size: 20px;;
    }

    .login, .password, #loginButton{
      width: 400px;
      padding: 10px;
      border: 1px solid black;
    }

    .errorBox-display {
      display: block;
      width:fit-content;
      background-color: pink;
      color: red;
    }
  
    .errorBox-display-none {
      display: none;
    }

    a {
      color: black;
    }
  </style>
<script>
  import { useNavigate} from "svelte-navigator";
  import { session } from "../../stores/stores.js";
  
  const navigate = useNavigate();
  
  let fullname;
  let username;
  let email;
  let password;

  async function handleSignUp() {
    const url = "http://localhost:3000/auth/signup";
    const userCredentials = {fullname: fullname, email: email, username: username, password: password};
    
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
          console.log("Validated");
        }
      })
      .catch(error => console.log(error));
      navigate("/validated", {replace: true});
  }

  
  
</script>



<div id="signUpDiv">
<h3 id="signUpPageHeadline">Sign Up</h3>
<input id="fullname" bind:value={fullname} name="fullname" type="text" placeholder="full name" required><br>
<input id="username" bind:value={username} name="username" type="text" placeholder="Username" required><br>
<input id="email" bind:value={email} name="email" type="text" placeholder="email" required><br>
<input id="password" bind:value={password} name="password" type="password" placeholder="password" required><br>
<button id="signUp" on:click={handleSignUp}>Sign up</button><br>
<a id="cancel" href="/login">Cancel</a>

</div>



<style>

#signUpDiv{
    width: 500px;
    margin: 50px auto;
}

#signUpPageHeadline{
    font-size: 20px;
}
#cancel{
    color: black;
}

#fullname, #username, #email, #password, #signUp{
    width: 400px;
    padding: 10px;
    border: 1px solid black;
}

</style>
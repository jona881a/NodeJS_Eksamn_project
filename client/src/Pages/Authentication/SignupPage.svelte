<script>
  import { useNavigate} from "svelte-navigator";
  import { session } from "../../stores/stores.js";

  
  const navigate = useNavigate();
  
  let fullname;
  let username;
  let email;
  let password;
  let signedUp=false;

  let to;

  let redirectTime = 5;
function redirectTimer(){
  const redirect = setInterval(function(){
    if (redirectTime <= 0){
      clearInterval(redirect);
      navigate("/login", {replace: true});
    }
    document.getElementById("time").innerText = "Redirecting to login in " + redirectTime + "    seconds";
    redirectTime -= 1;
  }, 1000)

}

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
      signedUp = true;
      sendMailVarification();
  }


async function sendMailVarification(){
  const response = await fetch("http://localhost:3000/sendmailvarification", {
        method: 'POST',
        body: JSON.stringify({
           email
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const json = await response.json();
    redirectTimer();
}

  
</script>


{#if signedUp === false}
<div id="signUpDiv">
<h3 id="signUpPageHeadline">Sign Up</h3>
<input id="fullname" bind:value={fullname} name="fullname" type="text" placeholder="full name"><br>
<input id="username" bind:value={username} name="username" type="text" placeholder="Username"><br>
<input id="email" bind:value={email} name="email" type="text" placeholder="email"><br>
<input id="password" bind:value={password} name="password" type="password" placeholder="password"><br>
<button id="signUp" on:click={handleSignUp}>Sign up</button><br>
<a id="cancel" href="/login">Cancel</a>
</div>
{:else if signedUp === true}
<div id="approvedDiv">
  <h1>Succesfully signed up</h1>
  <h2>Email has been sent to</h2>
  <h3>{email}</h3>
  <p id="time"></p>
</div>
{/if}



<style>

#signUpDiv, #approvedDiv{
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
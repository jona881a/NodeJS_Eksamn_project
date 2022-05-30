<script>
  import { useNavigate} from "svelte-navigator";
  import { session } from "../../stores/stores.js";
  import { toasts } from "svelte-toasts";
  import { Router, Link } from "svelte-navigator";
  
  const navigate = useNavigate();
  
  let fullname;
  let username;
  let email;
  let password;
  let confirmPassword;
  let signedUp = false;

  let avatar, fileinput;
  let maxKb = 550;

  let redirectTime = 5;
  
  function redirectTimer(){
    const redirect = setInterval(function(){
    if (redirectTime <= 0){
      clearInterval(redirect);
      navigate("/login", {replace: true});
    }
    document.getElementById("time").innerText = "Redirecting to login in " + redirectTime + "    seconds";
    redirectTime -= 1;
    }, 1000);
  }

  async function handleSignUp() {
    if (password !== confirmPassword) {
      toasts.warning('Passwords do not match','Please reconfirm password')
      return
    }

    const url = "http://localhost:3000/auth/signup";
    let userCredentials = {fullname: fullname, email: email, username: username, profile_pic: avatar, password: password};
    
    let reader = new FileReader();
    if(userCredentials.profile_pic == null) {
      userCredentials.profile_pic = "http://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png"
    }

    await fetch(url, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials)})
      .then(response => response.json())
      .then(data => { 
        if(data.message) {
          toasts.success('Successfully signed up');
          signedUp = true;
          sendMailVerification();
        } else {
          toasts.error('You were not signed up', 'An error occurred, please try again');
        }
    })
    .catch(error => console.log(error));
  }

  async function sendMailVerification(){
    const response = await fetch("http://localhost:3000/sendmailverification", {
      method: 'POST',
      body: JSON.stringify({
        email,
        username
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  const json = await response.json();
  redirectTimer();
  }
	
	const onFileSelected =(e)=>{
    let image = e.target.files[0];
    let kb = image.size / 1024; // convert the file size from byte to kb

    let reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onload = e => {
      if (kb < maxKb) {
        avatar = e.target.result;
      } else {
        toasts.warning('Picture size too large', 'Please select smaller image');
      }
    };
  }

  function onKeyPress(e) {
    if(e.charCode === 13) {
      handleSignUp();
    }
  }
</script>

{#if signedUp === false}
<div id="signUpDiv" on:keypress={onKeyPress}>
<h3 id="signUpPageHeadline">Sign Up</h3>
<input id="fullname" bind:value={fullname} name="fullname" type="text" placeholder="full name"><br>
<input id="username" bind:value={username} name="username" type="text" placeholder="Username"><br>
<input id="email" bind:value={email} name="email" type="text" placeholder="email"><br>
<input id="password" bind:value={password} name="password" type="password" placeholder="password"><br>
<input id="confirmPassword" bind:value={confirmPassword} name="confirmPassword" type="password" placeholder="Confirm password"><br>
<div class="preview-image-div">
  {#if avatar}
  <img class="preview-image" src="{avatar}" alt="d" />
  <img class="preview-image-comment" src="{avatar}" alt="d" />
  {:else}
  <img class="preview-image" src="http://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png" alt="" />
  <img class="preview-image-comment" src="http://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png" alt="" />
  {/if}
</div>
<div class="image-upload-div">
  <div class="image-upload">
    <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
    <div class="chan" on:click={()=>{fileinput.click();}}>Choose profile picture</div>
    <input style="display:none" type="file" accept=".jpg, .jpeg, .png " on:change={(e) => onFileSelected(e)} bind:this={fileinput} >
  </div>
</div>
<div class="footer">
  <button id="signUpButton" on:click={handleSignUp}>Sign up</button><br>
  <Router>
    <Link id="cancelButton" to="/login">Cancel</Link>
  </Router>
</div>
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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#signUpPageHeadline{
  font-size: 44px;
  font-weight: 500;
  text-align: center;
}

input{
  width: 90%;
  padding: 10px;
  border-radius: 20px;
}

.preview-image-div {
	width: 50%;
	justify-self: center;
  align-self: center;
}

.preview-image {
	overflow: hidden;
  border-radius: 100%;
	width: 200px;
  height: 200px;
  max-width: 200px;
  max-height: 200px;
  border: 1px solid black;
}  

.preview-image-comment {
	overflow: hidden;
  border-radius: 100%;
	width: 40px;
  height: 40px;
  border: 1px solid black;
}  

.image-upload-div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 60px;
  margin-bottom: 20px;
}

.upload{
	height:40px;
	width:40px;
	cursor:pointer;
	margin-left: 25px;
  align-self: center;
}
.chan {
  display: inline-block;
}
.footer {
  display: flex;
  justify-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

#signUpButton {
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: #212529;
  color: #f8f9fa;
  width: 100px;
  margin-bottom: 0;
}

#signUpButton:hover {
  background-color: #ffff;
  color: #212529;
}

:global(#cancelButton) {
  display: block;
  border-radius: 20px;
  padding: 10px 15px;
  width: 80px;
  color: #fff;
  background-color: #f03e3e;
  text-align: center;
  cursor: pointer;
}
:global(#cancelButton:hover) {
  background-color: #c92a2a;
}
</style>
<script>
  import { useNavigate} from "svelte-navigator";
  import { session } from "../../stores/stores.js";
  import { toasts } from "svelte-toasts";
  
  const navigate = useNavigate();
  
  let fullname;
  let username;
  let email;
  let password;
  let signedUp = false;

  let avatar, fileinput;
  let maxKb = 18.6;

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
    const url = "http://localhost:3000/auth/signup";
    const userCredentials = {fullname: fullname, email: email, username: username, profile_pic: fileinput, password: password};
    
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
    sendMailVerification();
  }

  async function sendMailVerification(){
    const response = await fetch("http://localhost:3000/sendmailverification", {
      method: 'POST',
      body: JSON.stringify({
        email
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
    let kb = image.size / 1024; // convert the file size into byte to kb

    let reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onload = e => {
      if (kb < maxKb || kb > maxKb) {
        avatar = e.target.result;
      } else {
        toasts.warning('Picture size too large', 'Please select smaller image');
      }
    };
  }

  const onFileReselect =(e)=>{
    let image = e.target.files[0];
    let kb = image.size / 1024; // convert the file size into byte to kb
    console.log(fileinput.click())

    let reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onload = e => {
    if (kb < maxKb) {
      fileinput = e.target.result;
      avatar = e.target.result;
    } else {
      toasts.warning('Picture size too large', 'Please select smaller image');
    }
    };
  }
</script>


{#if signedUp === false}
<div id="signUpDiv">
<h3 id="signUpPageHeadline">Sign Up</h3>
<input id="fullname" bind:value={fullname} name="fullname" type="text" placeholder="full name"><br>
<input id="username" bind:value={username} name="username" type="text" placeholder="Username"><br>
<input id="email" bind:value={email} name="email" type="text" placeholder="email"><br>
<input id="password" bind:value={password} name="password" type="password" placeholder="password"><br>
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

.preview-image-div {
	  width: 50%;
	  justify-self: center;
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
}

.upload{
		height:40px;
		width:40px;
		cursor:pointer;
		margin-left: 25px;
}

</style>
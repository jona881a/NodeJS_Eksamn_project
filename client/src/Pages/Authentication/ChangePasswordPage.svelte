<script>
    import { session } from "../../stores/stores.js";
    import { useNavigate} from "svelte-navigator";
    import { toasts } from "svelte-toasts";
    
    const navigate = useNavigate();
    
    let username;
    let password;
    let newPassword;
    let confirmNewPassword;
    
    async function handleSubmit() {
    if (password === confirmPassword) {
        toasts.warning('Passwords do not match','Please reconfirm password')
        return
    }

    const url = "http://localhost:3000/auth/changePassword";
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
                toasts.warning('Update failed', 'Please check that username and password is correct')
            } else {
                toasts.success('Password successfully changed', 'An email has been sent to' + data.session.email)
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
  
<div id="changePasswordDiv" on:keypress={onKeyPress}>
    <h3 id="changePasswordPageHeadline">Change password</h3>
    <input class="changePassword" bind:value={username} name="username" type="text" placeholder="Username"><br/>
    <input class="password" bind:value={password} name="password" type="password" placeholder="Password"><br/>
    <input class="newPassword" bind:value={newPassword} name="newPassword" type="password" placeholder="New password"><br/>
    <input class="confirmNewPassword" bind:value={confirmNewPassword} name="confirmNewPassword" type="password" placeholder="New password"><br/>
    <button id="changePasswordButton" on:click={handleSubmit}>Update</button><br>  
</div>
    
<style>
    #changePasswordDiv{
        width: 500px;
        margin: 50px auto;
    }
  
    #changePasswordPageHeadline{
        font-size: 20px;;
    }
  
    .changePassword, .password, #changePasswordButton{
        width: 400px;
        padding: 10px;
        border: 1px solid black;
    }
</style>
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
    if (newPassword !== confirmNewPassword) {
        toasts.warning('Passwords do not match','Please reconfirm password')
        return
    }

    const url = "http://localhost:3000/auth/changepassword";
    const userCredentials = {username: username, password: password, newPassword: newPassword};
      
    await fetch(url, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)})
        .then(response => response.json())
        .then(data => { 
            if(data.message) {
                toasts.success('Password successfully changed', 'A confimation email has been sent to you')
                navigate("/profile", { replace: true });
            } else {
                toasts.warning('Update failed', 'Please check that username and password is correct')
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
    <input class="confirmNewPassword" bind:value={confirmNewPassword} name="confirmNewPassword" type="password" placeholder="Confirm new password"><br/>
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
  
    .changePassword, .password, .newPassword, .confirmNewPassword, #changePasswordButton{
        width: 400px;
        padding: 10px;
        border: 1px solid black;
    }
</style>
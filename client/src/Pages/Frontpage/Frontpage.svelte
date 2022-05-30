<script>
import Carousel from "svelte-carousel";
import { onMount } from 'svelte';
import {Router, Link, Route } from "svelte-navigator";

let carouselIsReady = false;    
    let coverArray = [];
    onMount(async () => {
        const response = await fetch("http://localhost:3000/store/covergames");
        const data = response.json();
        data.then(data => {
            if(data.errorMessage) {
                console.error(data.errorMessage);
            } else {
                coverArray = data.data;
                carouselIsReady = true;
            }
        })
    })
</script>

{#if carouselIsReady}
<div id="carouselDiv">
    <Carousel autoplay
    autoplayDuration={3000}
    arrows={false}
    dots={false}
    >
    {#each coverArray as image}
    <img id="coverImage" src={image.cover_image} alt="coverImage">
    {/each}
     </Carousel>
     <div  id="frontpageCarouselTextDiv">
     <h1>"Games everywhere for everyone"</h1>
     <div id="signUpAdvisor">
     <p>Start your free account to receive mails about keys on discount</p>
     <button id="frontpageSignUp">
         <Router>
            <Link  to="/signup">Sign up now!</Link>
         </Router>
     </button>
    </div>
    </div>
</div>
{/if}
<div id="servicesContentDiv">
    <div class="first">
        <h3 class="serviceText">Your own personal profile!</h3>
        <div class="imgDiv">
             <img class="serviceImg" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="rouolette">
        </div>
        <div id="loginButtonDiv">
        <button id="loginButton">
            <Router>
                <Link  to="/login">Login Here!</Link>
             </Router>
        </button>
    </div>
    </div>
    <div class="second">
        <h3 class="serviceText">Chance of winning free keys!</h3>
        <div class="imgDiv">
             <img class="serviceImg" src="https://cdn-icons-png.flaticon.com/512/1254/1254356.png" alt="rouolette">
        </div>
        <div id="dailySpinButtonDiv">
        <button id="dailySpinButton">
            <Router>
                <Link  to="/roulette">Daily Spin!</Link>
             </Router>
        </button>
    </div>
    </div>
    <div class="third">
        <h3 class="serviceText">24h Support!</h3>
        <div class="imgDiv">
             <img class="serviceImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQT4CbjtNZPSBhnzGYFPXH4W7neMa6Cfv1imrj1MAeew_2ACu5TPkTblIDYweZPmDj5YI&usqp=CAU" alt="rouolette">
        </div><br><br>
        <h3 class="serviceText">Free chat service</h3>
    </div>
</div>




<style>
#servicesContentDiv{
    width: 100%;
    height: max-content;
    margin: 0px auto;
    border: 1px solid none;
    overflow: hidden; /* add this to contain floated children */
    background-color: #212529;
    display: flex;
    justify-content: center;
}
.first, .second, .third{
    width: 400px;
    height: 300px;
    float:left; /* add this */
    border: 4px solid rgb(236, 109, 24);;
    border-radius: 30px;
    margin-left: 30px;
    background-color: white;
}

.imgDiv{
    width: max-content;
    height: max-content;
    transform: translate(77%, 20%);
}

.serviceImg{
    width: 150px;
    height: 150px;
}
.serviceText{
    text-align: center;
    font-size: 25px;
}
.serviceText, .serviceImg{
    margin: auto;
}

#carouselDiv{
    width: auto;
    height: 600px;
}
#coverImage{
    width: auto;;
    height: 600px;;
}

#frontpageCarouselTextDiv{
    width: 1150px;
    position: absolute;
    top: 250px;
    left: 50%;
    transform: translate(-50%, -50%);
}

h1 {
    font-size: 60px;
    font-family: fantasy;
    letter-spacing: 5px;
    text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
    transform: translate(10%, 0%);
    width: 1100px;
    color: rgb(236, 109, 24);
}


#signUpAdvisor{
    width: 300px;
    position: absolute;
    left: 50%;
    transform: translate(-18%, 500%);
}
#signUpAdvisor p{
    width: 600px;
    position: absolute;
    left: 50%;
    transform: translate(-60%, -200%);
    font-size: 25px;
    color: white;
    font-family: fantasy;
    text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
}
#frontpageSignUp, #dailySpinButton, #loginButton{
background-color: orange;
color: white;
font-family: fantasy;
letter-spacing: 1px;
}
#frontpageSignUp:hover, #dailySpinButton:hover, #loginButton:hover{
background-color: rgb(143, 96, 8);
color: white;
}
#dailySpinButtonDiv, #loginButtonDiv{
    margin: 20px auto;
    width: max-content;
    height: max-content;
    transform: translate(0%, 70%);
}

</style>
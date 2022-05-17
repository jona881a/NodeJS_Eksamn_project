<script>
import Carousel from "svelte-carousel";
import { onMount } from 'svelte';
import { useNavigate} from "svelte-navigator";
import {Router, Link, Route } from "svelte-navigator";
const navigate = useNavigate();

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
                console.log(coverArray)
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
    >
    {#each coverArray as image}
    <img id="coverImage" src={image.cover_image} alt="coverImage">
    {/each}
     </Carousel>
     <div  id="frontpageCarouselTextDiv">
     <h1>"Games everywhere for everyone"</h1>
     <h4>- Digi-KeyStore</h4>
     <div id="signUpAdvisor">
     <p>Start your free account to recieve mails about keys on discount</p>
     <button id="frontpageSignUp">
         <Router>
            <Link  to="/signup">Sign up now!</Link>
         </Router>
     </button>
    </div>
    </div>
</div>
{/if}

<style>



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

h1, h4 {
    width: 1100px;
    color: rgb(236, 109, 24);
}
h1 {
    font-size: 60px;
    font-family: fantasy;
    letter-spacing: 5px;
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
}
#frontpageSignUp{
background-color: orange;
color: white;
}
#frontpageSignUp:hover{
background-color: rgb(143, 96, 8);
color: white;
}

</style>
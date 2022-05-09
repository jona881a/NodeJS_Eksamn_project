<script>
  import { onMount } from "svelte";
  import Productitem from "../../Components/Product/Productitem.svelte";
  let games = [];

  onMount( async () => {
		const response = await fetch("http://localhost:3000/store/getallgames");
    const data = response.json(); //The reason why it is handled this way is because it gets undefined when destructuring
    data.then(data =>  {
      if(data.errorMessage) {
        console.error(data.errorMessage);
      } else {
        games = data.data;
      }
    })
  });
</script>

<div class="container">
<div class="store-title">
  <h1>Showing {games.length} games</h1>
</div>
<div class="container">
  {#each games as game}
    <Productitem product={game} />
  {/each}
</div>
</div>

<style>
  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .store-title {
    margin-left: 20px;
  }
</style>
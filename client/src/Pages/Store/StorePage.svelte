<script>
  import { onMount } from "svelte";
  import Productitem from "../../Components/Product/Productitem.svelte";
  let games = [];
  let searchString;

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
<div class="store-header">
  <h1 class="games-in-store">Showing {games.length} games</h1>
  <input class="searchbar" bind:value={searchString} placeholder="search..." />
</div>
<div class="wrapper">
  {#each games as game}
    <Productitem product={game} />
  {/each}
</div>
</div>

<style>
  .container {
    max-width: 80%;
    margin: 0 auto;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .store-header {
    /*display: flex;*/
  }

  .games-in-store {
    display: inline-block;
    margin-left: 20px;
  }

  .searchbar {
    border-radius: 20px;
  }

  @media screen and (max-width: 1850px) {
    .wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 1150px) {
    .wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .container {
      margin-left: 100px;
    }
  }
</style>
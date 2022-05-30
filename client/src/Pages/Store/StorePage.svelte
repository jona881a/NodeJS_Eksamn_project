<script>
  import { onMount } from "svelte";
  import Productitem from "../../Components/Product/Productitem.svelte";
  let games = [];
  let searchedGames = [];
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
    });
  });

  function searchGame() {
    searchedGames = []
    games.forEach(game => {
      if(game.title.toLowerCase().includes(searchString.toLowerCase())) {
        searchedGames.push(game)
        searchedGames = searchedGames;
      }
    });
  }
</script>

<div class="container">
<div class="store-header">
  <h1 class="games-in-store">Showing {games.length} games</h1>
  <input class="searchbar" bind:value={searchString} on:change="{searchGame}" placeholder="search..." />
</div>
<div class="store-content">
  {#if !searchString}
    {#each games as game}
      <Productitem product={game} disabled={false}/>
    {/each}
  {:else}
    {#if searchedGames.length !== 0}
      {#each searchedGames as game}
        <Productitem product={game} disabled={false}/>
      {/each}
    {:else}
      <h3>Sorry, we could not find a game containing: {searchString}</h3>
    {/if}
  {/if}
</div>
</div>

<style>
  .container {
    max-width: 90%;
    margin: 0 auto;
  }

  .store-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: #ffffff;
    border-radius: 20px;
    padding: 20px;
  }
  
  .store-header {
    display: flex;
    gap: 20px;  
    align-items: center;
  }

  .games-in-store {
    display: inline-block;
    margin-left: 20px;
  }

  .searchbar {
    border-radius: 20px;
    margin: 0;
  }
  
  @media screen and (max-width: 1850px) {
    .store-content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 1388px) {
    .store-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      max-width: 90%;
    }
  }

  @media screen and (max-width: 940px) {
    .store-content {
      display: grid;
      grid-template-columns: 1fr;
      max-width: 90%;
    }
  }
</style>
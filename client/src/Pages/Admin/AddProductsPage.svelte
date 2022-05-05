<script>
	let  avatar, fileinput, imageAsUrl;
	let title, genre, company, releasedate;

	async function handleSubmit() {
		const response = await fetch("http://localhost:3000/admin/addproducts", {
			method: "POST",
      headers: {
      'Content-Type': 'application/json',
      },
			body: JSON.stringify({
				title,
				genre, 
				company, 
				releasedate, 
				image: imageAsUrl
			})
		});
		const { message } = await response.json();
		console.log(message);
	} 
	
	const onFileSelected = async (e) => {
  	let image = e.target.files[0];
  	let reader = new FileReader();

		reader.readAsDataURL(image);

    reader.onload = e => {
      imageAsUrl = e.target.result;
    };
	}
	
</script>
<div id="app">
	<h1>Add Game to gamecatalog</h1>

	<div class="formbody">
		<label for="title">Game title</label>
		<input id="title" bind:value={title} placeholder = "" />

		<label for="genre">Game genre(s)</label>
		<input id="genre" bind:value={genre} placeholder = "separate with commas" />

		<label for="company">Game dev company</label>
		<input id="company" bind:value={company} />

		<label for="releasedate">Game releasedate</label>
		<input id="releasedate" bind:value={releasedate} />
		<button on:click={handleSubmit}>Add game</button>
	</div>
  
        {#if avatar}
        <img class="avatar" src="{avatar}" alt="d" />
        {:else}
        <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
        {/if}
				<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
        <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png " on:change={(e) => onFileSelected(e)} bind:this={fileinput} >

</div>
<style>
	#app{
	display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
}
 
	.upload{
		display:flex;
	height:50px;
		width:50px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:200px;
		width:200px;
	}
</style>

 
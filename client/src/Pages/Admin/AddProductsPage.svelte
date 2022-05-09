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
			avatar = e.target.result;
      imageAsUrl = e.target.result;
    };
	}
	
</script>

	<div class="container">
		<div class="row">
			<div class="preview-image">
				{#if avatar}
				<img class="avatar" src="{avatar}" alt="d" />
				{:else}
				<img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
				{/if}
			</div>
			<div class="formbody">
				<h1>Add Game to gamecatalog</h1>

				<label for="title">Game title</label>
				<input id="title" bind:value={title} placeholder = "" />
		
				<label for="genre">Game genre(s)</label>
				<input id="genre" bind:value={genre} placeholder = "separate with commas" />
		
				<label for="company">Game dev company</label>
				<input id="company" bind:value={company} />
		
				<label for="releasedate">Game releasedate</label>
				<input id="releasedate" bind:value={releasedate} />
				
				<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
				<div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
				<input style="display:none" type="file" accept=".jpg, .jpeg, .png " on:change={(e) => onFileSelected(e)} bind:this={fileinput} >
				
				<button on:click={handleSubmit}>Add game</button>
			</div>
		</div>
	</div>
<style>

	.row {
		display: flex;
	}

	.preview-image {
		width: 50%;
		justify-self: center;
	}

	.formbody {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		padding: 10px 20px;
		width: 600px;
	}
 
	.upload{
		height:50px;
		width:50px;
		cursor:pointer;
	}

	.avatar {
		overflow: hidden;
		width: 100%;
	}

</style>

 
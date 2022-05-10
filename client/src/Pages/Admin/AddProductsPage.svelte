<script>
	let previewImage, fileinput, imageAsUrl;
	let title, genre, company, releasedate, cover_image;
	let imageUrlArray = [];
	let imageArray = [];

	async function handleSubmit() {
		cover_image = imageUrlArray[0];
		imageUrlArray.splice(0,1);

		console.log(imageUrlArray);

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
				cover_image,
				carousel_images: imageUrlArray
			})
		});
		const { message } = await response.json();
	} 
	
	const onFileSelected = async (e) => {
  	let image = e.target.files[0];
		imageArray.push(image);
		imageArray = [...imageArray];
	
		console.log(imageArray);

  	let reader = new FileReader();

		reader.readAsDataURL(image);

    reader.onload = e => {
			previewImage = e.target.result;
      //imageAsUrl = ;
			imageUrlArray.push(e.target.result);
			imageUrlArray = [...imageUrlArray]
    };
	}
	
</script>

	<div class="container">
		<div class="row">
			<div class="preview-image-div">
				{#if previewImage}
				<img class="preview-image" src="{previewImage}" alt="d" />
				{:else}
				<img class="preview-image" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
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
				
				<div class="image-upload-div">
					<div class="image-upload">
						<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
						<div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
						<input style="display:none" type="file" accept=".jpg, .jpeg, .png " on:change={(e) => onFileSelected(e)} bind:this={fileinput} >
					</div>
					<button on:click={handleSubmit}>Add game</button>
				</div>
				<div class="fileupload-list">
					{#if imageArray.length !== 0}
					<h3>Images added</h3>
					{/if}
					<ul>
						{#each imageArray as uploadedImage}
							<li>{uploadedImage.file}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
<style>

	.row {
		display: flex;
	}

	.preview-image-div {
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
		margin-left: 25px;
	}

	.preview-image {
		overflow: hidden;
		width: 100%;
	}

	.image-upload-div {
		display: flex;
		align-items: center;
	}

	.fileupload-list {
		height: 200px;
		width: 100%;
	}
	

</style>

 
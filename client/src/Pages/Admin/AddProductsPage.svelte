<script>
	import { useNavigate } from "svelte-navigator";
	import { toasts } from "svelte-toasts"; 

	const navigate = useNavigate();

	let previewImage, fileinput;
	let title, genre, company, description, releasedate, price, cover_image;
	let imageUrlArray = [];
	let imageArray = [];

	async function handleSubmit() {
		cover_image = imageUrlArray[0];
		imageUrlArray.splice(0,1);

		const response = await fetch("http://localhost:3000/admin/addproducts", {
			method: "POST",
      headers: {
      	'Content-Type': 'application/json',
      },
			body: JSON.stringify({
				title,
				genre, 
				company, 
				description,
				releasedate, 
				price,
				cover_image,
				carousel_images: imageUrlArray
			})
		});
		const data = await response.json();
		if(data.message !== undefined) {
			toasts.success(data.message);
			navigate("/store", {replace: true});
		} else if (data.errorMessage !== undefined) {
			toasts.error(data.errorMessage);
		}

	} 
	
	const onFileSelected = async (e) => {
  	let image = e.target.files[0];
		imageArray.push(image);
		imageArray = [...imageArray];

  	let reader = new FileReader();

		reader.readAsDataURL(image);

    reader.onload = e => {
			previewImage = e.target.result;
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

				<label for="description"> Game description</label>
				<input id="description" bind:value={description} />
		
				<label for="company">Game dev company</label>
				<input id="company" bind:value={company} />
		
				<label for="releasedate">Game releasedate</label>
				<input id="releasedate" bind:value={releasedate} />

				<label for="price">Price</label>
				<input id="price" type="number" bind:value={price} />
				
				<div class="image-upload-div">
					<div class="image-upload">
						<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
						<div class="chan" on:click={()=>{fileinput.click();}}>Choose Image(s)</div>
						<input style="display:none" type="file" accept=".jpg, .jpeg, .png " on:change={(e) => onFileSelected(e)} bind:this={fileinput} >
					</div>
					<button class="btn" on:click={handleSubmit}>Add game</button>
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
		width: 90%;
		border-radius: 20px;
	}
 
	.upload{
		height:40px;
		width:40px;
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

	.btn {
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: #212529;
    color: #f8f9fa;
    width: 150px;
  }

  .btn:hover {
    background-color: #ffff;
    color: #212529;
  }

</style>

 
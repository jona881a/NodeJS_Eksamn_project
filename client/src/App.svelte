<script>
import Navbar from "./Components/Navbar/Navbar.svelte";
import CustomerSupport from "./Components/CustomerSupport/CustomerSupport.svelte";
import { toasts, ToastContainer, FlatToast } from "svelte-toasts"; 
import {itemsInCart, cartContents} from "./stores/cartStore.js";
import { onMount } from "svelte";

onMount(() => {
	if(localStorage.getItem("cartContent")) {
		console.info(localStorage.getItem("cartContent"));
		cartContents.update(contents => [...localStorage.getItem("cartContent")]);
	}
	//localStorage.getItem("cartContent") ? localStorage.setItem("cartContent",[]) : localStorage.setItem("cartContent",$cartContents);
});


if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  console.info( "This page is reloaded" );
	console.info($cartContents);
	localStorage.setItem("cartContent", $cartContents);

}

</script>
	<Navbar />
	<CustomerSupport />
	<ToastContainer placement="top-right" let:data>
		<FlatToast {data}/>
	</ToastContainer>
<style>

</style>
<script>
import Navbar from "./Components/Navbar/Navbar.svelte";
import CustomerSupport from "./Components/CustomerSupport/CustomerSupport.svelte";
import { toasts, ToastContainer, FlatToast } from "svelte-toasts"; 

</script>
	<Navbar />
	<CustomerSupport />
	<ToastContainer placement="top-right" let:data>
		<FlatToast {data}/>
	</ToastContainer>
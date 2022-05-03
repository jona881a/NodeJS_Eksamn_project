<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { session } from "../../stores/stores.js";

  const navigate = useNavigate();
  const location = useLocation();

  $: if (!$session) {
    navigate("/login", {
      state: { from: $location.pathname },
      replace: true,
    });
  }else{
    console.log("session success")
  }

 
</script>

{#if $session}
  <slot />
{/if}


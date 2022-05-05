<script>

    let from;
    let to;
    let subject;
    let text;

    async function handleSubmit(e){
    e.preventDefault();
  
    const response = await fetch("http://localhost:3000/sendmail", {
        method: 'POST',
        body: JSON.stringify({
            from,
            subject,
            text
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const json = await response.json();
    const contactForm = document.getElementById("mailForm");
    contactForm.reset();
}

</script>

<div class="headlineDiv">
    <h1 class="headline">Contact us</h1>
</div>

<div id="mailFormDiv">
    <form id="mailForm" on:submit={handleSubmit}>
        <input id="fromField" bind:value={from} placeholder="from" required><br>
        <input id="subjectField" bind:value={subject} placeholder="Subject" required><br>
        <textarea id="textField" bind:value={text} placeholder="Type here..." cols="40" rows="5" required></textarea><br>
        <button id="sendInfo" type="submit">Send</button>
    </form>

 
</div>

<style>

    .headlineDiv{
        width: 400px;
        margin: 20px auto;
        display: flex;
        justify-content: center;
    }
    .headline{
        font-size: 50px;
    }

    #fromField, #subjectField, #textField, #sendInfo{
        width: 400px;
        padding: 10px;
        border: 1px solid black;
    }
    #mailFormDiv{
        background-color: lightgray;
        width: 100%;
        margin: 20px auto;
        padding: 10px;
        display: flex;
        justify-content: center;
    }
   

</style>

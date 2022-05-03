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

<div id="mailFormDiv">
    <form id="mailForm" on:submit={handleSubmit}>
        <input id="fromField" bind:value={from} placeholder="from" required><br>
        <input id="subjectField" bind:value={subject} placeholder="Subject" required><br>
        <textarea id="textField" bind:value={text} placeholder="Type here..." cols="40" rows="5" required></textarea><br>
        <button id="sendInfo" type="submit">Send</button>
    </form>


</div>

<style>

    #fromField, #toField, #subjectField, #textField, #sendInfo{
        width: 400px;
        padding: 10px;
    }
    #mailFormDiv{
        background-color: lightgray;
        width: 100%;
        margin: 100px auto;
        padding: 10px;
        display: flex;
        justify-content: center;
    }
   

</style>

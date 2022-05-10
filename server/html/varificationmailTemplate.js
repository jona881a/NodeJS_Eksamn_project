
const mailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #mailContainer{
            background-color: #212529;
        }
        #headline{
            color: white;
        }
    </style>
</head>
<body>
    <div>
    <div id="mailContainer">
        <h1 id="headline">Digi-KeyStore</h1>
    </div>
    <h2>Welcome!</h2>
    <p>Welcome to Digi-KeyStore, we hope that you like games as much as we do! <br>
    We are a new small company, but we intend to have our company heard of world wide. <br>
    Please feel free to write us if any proplems occur.
    </p><br>
    <h4>Best regards</h4>
    <h5>Digi-KeyStore</h5>
    <p>aps.digikeystore@gmail.com</p>
</div>
</body>
</html>
` 

export default mailTemplate;
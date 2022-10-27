const express = require('express')
const app = express()
const port = 3000

const CS_URL = `https://api.nexmo.com`;
const WS_URL = `https://ws.nexmo.com`;

app.use(express.json());

app.use(express.static('public'))

app.post("/api/login", async (req, res) => {
    const { username } = req.body;

    res.json({
        username: username,
        token: "TOKEN",
        ws_url: WS_URL,
        cs_url: CS_URL,
    });

});

app.post("/api/subscribe", async (req, res) => {
    const { username } = req.body;
    
    res.json({
        username: username,
        token: "TOKEN",
        ws_url: WS_URL,
        cs_url: CS_URL,
    });

});


app.listen(port, () => {
    console.log(`server up on port ${port}`)    
})



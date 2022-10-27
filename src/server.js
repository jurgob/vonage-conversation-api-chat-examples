const fs = require('fs');
const axios = require('axios')
const { generateToken } = require('./token_utils')
const express = require('express');
const app = express()
const port = 3000



const CS_URL = `https://api.nexmo.com`;
const WS_URL = `https://ws.nexmo.com`;



/* 
 on backend sping up I read the application config
 this file is created when you run the following command: 
 npm run create_app APIKEY APISECRET
*/
const appString = fs.readFileSync('./config/application.json')
const appConfig = JSON.parse(appString)
const CONFIG = {
    application_id: appConfig.id,
    private_key: appConfig.keys.private_key
}

const now = (Date.now() / 1000) 
const ONE_YEAR_FROM_NOW = now + (((60 * 60)  * 60 ) * 24 * 365) //by default the token will expire in 1 year. hopefully your server will restart before that. 
const ACL_SUPER_PERMISSIVE = {
    "paths": {
        "/**": {}
      }
}

/*
 this is the token you are using for using the vonage api. 
 the sucurity is relaxed as this token is excanged only between your backend and the vonage api
*/
const SERVER_TOKEN = generateToken({
    private_key: CONFIG.private_key, 
    application_id:CONFIG.application_id, 
    acl: ACL_SUPER_PERMISSIVE, 
    expiration: ONE_YEAR_FROM_NOW
})

/* we are a little bit more strict with the token for the user
    this is gonna be used by the client sdk, so is easily incerceptable 
*/
function generateTokenForUser(username){
    const ONE_WEEK_FROM_NOW = now + (((60 * 60)  * 60 ) * 24 * 7) //hopefully your user will logout before one week
    const ACL_LESS_PERMISSIVE = {
        "paths":{
            "/*/users/**":{},
            "/*/conversations/**":{},
            "/*/sessions/**":{},
            "/*/devices/**":{},
            "/*/image/**":{},
            "/*/media/**":{},
            "/*/applications/**":{},
            "/*/push/**":{},
            "/*/knocking/**":{},
            "/*/legs/**":{}
        }
    } 
    
    
    return generateToken({
        private_key: CONFIG.private_key, 
        application_id:CONFIG.application_id, 
        acl: ACL_LESS_PERMISSIVE, 
        expiration: ONE_WEEK_FROM_NOW
    })
}



app.use(express.json());

app.use(express.static('public'))



/** 
 * login and subscripe are a very simple implementation where you just mint a token. 
 * In the subscribe endpoint you are also creating a conversation service user
 * 
 * In a real app those would be more complicated, probably you have some user and you just want to have a  Conversation serivce user as a compagnion object to your user
 * a typical pattern is createing a CS user with the "name" property as your user id (name is an external id). 
 * 
 */

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
    //create a conversation user. in a real scenario you would create a user in your system and bind it somehow with the CS user
     
    try{
        const newUserResponse = await axios({
            url: `${CS_URL}/v0.3/users`,
            method: "post",
            data: {
                name: username,
            },
            headers: {
                'Authorization': `Bearer ${SERVER_TOKEN}`,
                "Content-Type": "application/json"
            }

        })

        res.json({
            username: username,
            token: "TOKEN",
            ws_url: WS_URL,
            cs_url: CS_URL,
        });

    }catch(err){
        res.status(500)
        res.json({
            err: err
        })

    }

});

/* 
those two endpoint are ther more for helping the debug
*/

app.get("/api/users", async (req, res) => {
    //get the list of all the users created in your application
    try{
        const userListResponse = await axios({
            url: `${CS_URL}/v0.3/users`,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${SERVER_TOKEN}`,
                "Content-Type": "application/json"
            }
        })

        res.json(userListResponse.data);

    }catch(err){
        res.status(500)
        res.json({
            err: err
        })
    }
});

app.get("/api/users/:username", async (req, res) => {
    const {username}= req.params;
    //get the list of all the users created in your application
    try{
        const userListResponse = await axios({
            url: `${CS_URL}/v0.3/users?name=${username}`,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${SERVER_TOKEN}`,
                "Content-Type": "application/json"
            }
        })
        const userInfo = userListResponse.data._embedded.users[0]

        if(userInfo){
            res.json(userInfo);
        }else{
            res.status(400)
            res.json({
                err: "user not found"
            });
        }
        

    }catch(err){
        res.status(500)
        res.json({
            err: err
        })
    }
});



app.listen(port, () => {
    console.log(`server up on port ${port}`)    
})



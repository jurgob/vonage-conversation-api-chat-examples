# vonage-conversation-api-chat-examples

## install

checkout the repo

```bash
cd vonage-conversation-api-chat-examples
nvm use
npm i
```

Before you continye, create vonage dashbaord account here: https://dashboard.nexmo.com/. 
Once you log in you will see the APIKEY and the APISECRET in your home


```bash 
npm run create_app APIKEY APISECRET
```

this will save your application details in config/application.json

## important backend snippet


### create a user
```js
 // create a user
 const newUserResponse = await axios({
      url: `https://api.nexmo.com/v0.3/users`,
      method: "post",
      data: {
          name: username,
      },
      headers: {
          'Authorization': `Bearer ${SERVER_TOKEN}`,
          "Content-Type": "application/json"
      }

  })
```
[check in the example](https://github.com/jurgob/vonage-conversation-api-chat-examples/blob/main/src/server.js#L118)

## important vonage client JS snippet

### initialize the SDK

```js

// to instantite an sdk you need a TOKEN. typically your frontned query your backedn to fetch it. 

const sdkConfig = {
  url: "https://api.nexmo.com",
  nexmo_api_url: "https://ws.nexmo.com"
}
const nexmoClient = await new NexmoClient(sdkConfig).createSession(TOKEN)

```
[check in the example](https://github.com/jurgob/vonage-conversation-api-chat-examples/blob/main/public/chat.html#L38)



### create and join a conversation

```js

//TODO

```


### send a text message in a conversation

```js

//TODO

```

### receive a text message in a conversation

```js

//TODO

```


### accept a conversation invite

```js

//TODO

```


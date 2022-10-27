# vonage-conversation-api-chat-examples

## Getting started

### install

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


### run it

```bash 
npm run dev
```

this will enable the hotreloading

it is also possible to run it without hotreload: 

```bash 
npm start
```

## What is this

This is a simple chat application done using the [Vonage Conversation API](https://developer.vonage.com/conversation/overview) ( [docs](https://developer.vonage.com/api/conversation) ) and the [Vonage JS Client SDK](https://developer.vonage.com/client-sdk/in-app-voice/overview) ( [docs](https://developer.vonage.com/sdk/stitch/javascript/NexmoClient.html) )


## Important backend snippet


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


### get the list of my conversations

```js
//TODO
 const conversation = await nexmoClient.getConversation(CONVERSATION_ID);

```


### get a conversation

```js
//TODO
 const conversation = await nexmoClient.getConversation(CONVERSATION_ID);

```

### fetch all the conversation events (like the messages contained inside the conversation)

```js
//TODO
const conversationEventsList = await conversation.getEvents()
```

### receive a text message in a conversation

```js
conversation.on("message",(sender, event) => {
  //your code here
})
//TODO

```

### send a text message in a conversation

```js
const event = await conversation.sendMessage({ "message_type": "text", "text": messageTextarea.value })
//TODO

```


### create and join a conversation

```js

const conversation = nexmoClient.newConversationAndJoin({name:"conv1", display_name: "My Group Chat" })

```





### invite a user to a conversation

```js
const memberInvited = await conversation.invite({
 user_name: "userB"
})
//TODO

```

### manage invitations to a new conversation

```js
 conversation.on("member:invited", (member, event) => {
   console.log(member.userName + " invited to the conversation");
 });
 //TODO

```


### typing indication

```js

  conversation.startTyping();
  
  conversation.on("text:typing:on", (data, event) => {
   if (conversation.me.id !== data.memberId) {
     console.log(data.userName + " is typing...");
   }
 });

 conversation.on("text:typing:off", (data) => {
   ///your code
 });


```



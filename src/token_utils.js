const jwt = require('jsonwebtoken');



/** 
* a vonage JWT token is just a standart jsw token. 
* when you create the vonage application you get the necessary private_key to mint it. 
* then you can use any library.
* key jwt payload property: 
* - application_id: your application id
* - acl: access control list. 
* 
* key jwt property: 
* - exp: token expiration
* - sub: this must be a conversation service user name (which is an external id for that user)
* 
* more info here: https://developer.vonage.com/getting-started/concepts/authentication#json-web-tokens-jwt
* 
* notice that a user token differ from an admin token just becouse it contains the sub property in the jwt payload
*/

function generateToken({ private_key, application_id, acl, expiration,sub }) {
    
    //by default the token is super permissive
    if (!acl) {
      acl = {
        "paths": {
          "/**": {}
        }
      }
    }
  
    const now = (Date.now() / 1000) 
    const expirationDefault = now + (((60 * 60)  * 60 ) * 24 )//by default the token will expire in 1 hour

    if(!expiration)
        expiration = expirationDefault


    const props = {
      "iat": now,
      "nbf": now,
      "exp": expiration,
      "jti": now,
      application_id,
      acl,
      sub
    }
  
  
    return jwt.sign(
      props,
      {
        key: private_key,
      },
      {
        algorithm: 'RS256',
      }
    )
  }
  
  
  module.exports = {
	generateToken
  }
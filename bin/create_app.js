const axios = require('axios');
const fs = require('fs');
const { base64encode } = require('nodejs-base64');


function createApp({ api_key, api_secret, application_name }) {
    const dev_api_token = base64encode(`${api_key}:${api_secret}`)
    return axios({
      method: "POST",
      url: `https://api.nexmo.com/v2/applications`,
      data: {
        "name": application_name
        // "capabilities": {
        //   "voice": {
        //     "webhooks": {
        //       "answer_url": {
        //         "address": `https://foo.com/ncco`,
        //         "http_method": "GET"
        //       },
        //       "event_url": {
        //         "address": `https://foo.com/voiceEvent`,
        //         "http_method": "POST"
        //       }
        //     }
        //   }
        // }
      },
      headers: { 'Authorization': `basic ${dev_api_token}` }
    })
  }


async function main(){
    const api_key = process.argv[2]
    const api_secret = process.argv[3]
    const application_name = `testing_app_${Date.now()}`

    if(!api_key || !api_secret){
        console.log('api_key and api_secret mandatory')
        console.log('npm run cli_create_app APIKEY APISECRET')
        console.log(`if you don't have them, create an account here: https://dashboard.nexmo.com/`)
        process.exit(1)
    }

    console.log("creating app with api key / api secret: ", api_key, api_secret)

    const applicationResponse = await createApp({api_key, api_secret, application_name})
        .catch((err) => {
            console.log('Error Creating the Application!!')
            if(err.response){
                const {status, statusCode, data} = err.response
                console.log({status, statusCode, data})    
            }else{
                console.log(err)
            }
            
            process.exit(1)
        })

    const applicationData = applicationResponse.data

    

    fs.writeFileSync('./config/application.json', JSON.stringify(applicationData, null, '   '))

    console.log("app info stored on config/application.json")

    //const appString = fs.readFileSync('./config/application.json')
    // console.log(JSON.parse(appString))

}

main()
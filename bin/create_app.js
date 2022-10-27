const axios = require('axios');


async function main(){
    const api_key = process.argv[2]
    const api_secret = process.argv[2]
    const app_name = `testing_app_${Date.now()}`

    if(!api_key || !api_secret){
        console.log('api_key and api_secret mandatory')
        console.log('npm run cli_create_app APIKEY APISECRET')
        console.log(`if you don't have them, create an account here: https://dashboard.nexmo.com/`)
        process.exit(1)
    }
    
    console.log("api key / api secret: ", api_key)

    console.log("creating app")
}

main()